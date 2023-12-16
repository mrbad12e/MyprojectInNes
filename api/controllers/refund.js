const Refund = require('../models/Refund')

exports.createRefund = async (req, res, next) => {
    try {
        const order = req.body.order
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

        const refund = new Refund({
            order: order._id,
            id: req.body.refundInfo.id,
            amount: req.body.refundInfo.amount,
            status: req.body.refundInfo.status,
            initiatedAt: req.body.refundInfo.initiatedAt,
        })
        await refund.save()
        await order.save({ validateBeforeSave: false })

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
