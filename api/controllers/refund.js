const Return = require('../models/Return')
const Refund = require('../models/Refund')
const Order = require('../models/Order')

exports.initiateRefund = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id).populate('returns')
        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        if (order.returns.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No returns found for this order'
            })
        }

        if (order.isRefunded) {
            return res.status(400).json({
                success: false,
                message: 'Order has already been refunded'
            })
        }

        const refunds = []
        const updatedReturns = []

        for (const returnDoc of order.returns) {
            if (returnDoc.status === 'Pending') {
                const refundAmount = order.totalPrice
                const newRefund = new Refund({
                    order: order._id,
                    amount: refundAmount
                })
                refunds.push(newRefund)
                returnDoc.status = 'Initiated'
                returnDoc.resolvedAt = new Date()
                updatedReturns.push(returnDoc)
            }
        }

        await Refund.insertMany(refunds)
        await Return.bulkWrite(
            updatedReturns.map(returnDoc=> ({
                updateOne: {
                    filter: { _id: returnDoc._id },
                    update: {
                        $set: {
                            status: returnDoc.status,
                            resolvedAt: returnDoc.resolvedAt
                        }
                    }
                }
            }))
        )
        let requestPaypalURL = `${process.env.PAYPAL_BASE_URL}/v2/payment/captures/${order.paymentInfo.id}/refund`
        order.isRefunded = true
        order.refundStatus = 'Initiated'
        order.refundRequestedAt = new Date()
        
        await order.save()

        res.status(200).json({
            success: true,
            message: 'Refund initiation request sent',
            order
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: 'Server error'
        })
    }
}

exports.updateRefundStatus = async (req, res, next) => { 
    try {
        const { refundStatus } = req.body
        const refundId = req.params.refundId
        const orderId = req.params.orderId
        const refund = await Refund.findById(refundId)
        const order = await Order.findById(orderId)

        if (!refund) {
            return res.status(404).json({
                success: false,
                message: 'Refund not found'
            });
        }

        if (!refundStatus) {
            return res.status(400).json({
                success: false,
                message: 'Refund status is required'
            });
        }

        if (
            refundStatus !== 'Pending' &&
            refundStatus !== 'Approved' &&
            refundStatus !== 'Rejected'
        ) {
            return res.status(400).json({
                success: false,
                message: 'Invalid refund status'
            })
        }

        if (refundStatus === 'Approved') {
            if (!order || !order.paymentInfo || !order.paymentInfo.id) {
                return res.status(400).json({
                    success: false,
                    message: 'Order payment infomation is not available'
                })
            }
            const createRefund = await stripe.refunds.create({
                payment_intent: order.paymentInfo.id,
                amount: Math.round(order.totalPrice)
            })

            createRefund.refundInfo = {
                id: createRefund.id,
                amount: createRefund.amount,
                status: createRefund.status,
                createdAt: createRefund.created
                    ? new Date(createRefund.created * 1000)
                    : null
            }

            order.isRefunded = true
            order.refundStatus = 'Refunded'
            order.refundedAt = new Date(
                Date.now() + 7 * 24 * 60 * 60 * 1000
            )
            await order.save()
        }

        refund.status = refundStatus
        await refund.save()
        res.status(200).json({
            success: true,
            message: 'Refund status updated successfully',
            refund
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: 'Server error'
        })
    }
}

exports.getAllRefunds = async (req, res) => {
    try {
        const refunds = await Refund.find()
            .populate({
                path: 'order',
                select: 'user refundRequestedAt',
                populate: {
                    path: 'user',
                    select: 'username email'
                }
            })
            .sort('-requestedAt')
        res.status(200).json({
            success: true, refunds
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error'
        })
    }
}
