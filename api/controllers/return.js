const Return = require('../models/Return');
const Order = require('../models/Order');
const ApiFeatures = require('../utils/apifeatures');

exports.requestReturn = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found',
            });
        }

        const productsInOrder = order.orderItems.map((item) => ({
            product: item.product._id,
            quantity: item.quantity,
        }));
        // create return doc for all product
        const newReturn = new Return({
            order: order._id,
            product: productsInOrder,
            reason: req.body.returnReason,
            requestedAt: new Date(),
            status: 'Pending',
        });
        await newReturn.save();

        order.returns.push(newReturn._id);
        order.isReturned = true;
        order.returnRequestedAt = new Date();
        order.refundStatus = 'Initiated';
        await order.save();

        res.status(200).json({
            success: true,
            message: 'Return requested',
            order,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};

// admin
exports.getAllReturns = async (req, res) => {
    try {
        const resultPerPage = Number(process.env.ADMIN_RESULT_PER_PAGE);
        const returnsCount = await Return.countDocuments();
        const apiFeature = new ApiFeatures(
            Return.find().sort({ createdAt: -1 }).populate({ path: 'order', model: 'Order', select: 'paymentInfo.id' }),
            req.query
        )
            .search()
            .filter();
        let returns = await apiFeature.query;
        let filteredReturnsCount = returns.length;

        apiFeature.pagination(resultPerPage);
        returns = await apiFeature.query.clone();

        res.status(200).json({
            success: true,
            returns,
            returnsCount,
            filteredReturnsCount,
            resultPerPage,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};
