const Order = require('../models/Order');
const Product = require('../models/Product');
const sendEmail = require('../utils/sendEmail');
const User = require('../models/User');
const ApiFeatures = require('../utils/apifeatures');

async function updateStock(id, quantity) {
    const product = await Product.findById(id);
    product.Stock -= quantity;
    await product.save({ validateBeforeSave: false });
}

exports.newOrder = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        const { shippingInfo, orderItems, itemsPrice, shippingPrice, totalPrice, paymentInfo } = req.body;

        const orderItemsWithImages = await Promise.all(
            orderItems.map(async (item) => {
                const product = await Product.findById(item.product);
                if (product) {
                    return {
                        title: item.title,
                        price: item.price,
                        quantity: item.quantity,
                        images: item.img, // Include the images from the product
                        product: item.product,
                    };
                }
            })
        );
        const order = await Order.create({
            shippingInfo,
            orderItems: orderItemsWithImages,
            paymentInfo,
            itemsPrice,
            shippingPrice,
            totalPrice,
            paidAt: Date.now(),
            user: req.user._id,
        });
        const randomDays = Math.floor(Math.random() * 8);
        const currentDate = new Date();
        const estimatedDeliveryDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() + randomDays
        );

        // await sendEmail({
        //     username: user.username,
        //     email: user.email,
        //     type: 'OrderConfirm',
        //     subject: 'Order has been placed successfully',
        //     items: order.orderItems,
        //     total: order.totalPrice,
        //     date: estimatedDeliveryDate.toDateString(),
        // });

        res.status(200).json({
            success: true,
            order,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getSingleOrder = async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'username email');
    if (!order) {
        return res.status(404).json({
            success: false,
            message: 'Order not found with this id',
        });
    }
    res.status(200).json({
        success: true,
        order,
    });
};
// get logged in user orders (for user)
exports.myOrders = async (req, res, next) => {
    let resultPerPage = Number(process.env.RESULT_PER_PAGE);
    const apiFeature = new ApiFeatures(Order.find({ user: req.user._id }), req.query).search().filter();
    let orders = await apiFeature.query;
    let filteredOrdersCount = orders.length;

    apiFeature.pagination(resultPerPage);
    orders = await apiFeature.query.clone();

    res.status(200).json({
        success: true,
        orders,
        filteredOrdersCount,
        resultPerPage,
    });
};

// confirm order after received (for user)
exports.confirmOrder = async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'username email');
    if (!order) {
        return res.status(404).json({
            success: false,
            message: 'Order not found with this id',
        });
    }
    if (order.orderStatus === 'Delivered') {
        order.orderStatus = 'Shipped';

        order.orderItems.forEach(async (o) => {
            await updateStock(o.product, o.quantity);
        });
    }
    await order.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        message: 'Order confirmed successfully',
        order,
    });
};

// admin
exports.getAllOrders = async (req, res, next) => {
    let resultPerPage = Number(process.env.ADMIN_RESULT_PER_PAGE);
    const ordersCount = await Order.countDocuments();
    const apiFeature = new ApiFeatures(Order.find().sort({ updatedAt: -1 }), req.query).search().filter();
    let orders = await apiFeature.query;
    let filteredOrdersCount = orders.length;

    apiFeature.pagination(resultPerPage);
    orders = await apiFeature.query.clone();
    let totalAmount = 0;
    orders.forEach((order) => (totalAmount += order.totalPrice));

    res.status(200).json({
        success: true,
        totalAmount,
        ordersCount,
        orders,
        filteredOrdersCount,
        resultPerPage,
    });
};

exports.getRecentOrders = async (req, res, next) => {
    let ordersCount = process.env.RESULT_PER_PAGE;
    const orders = await Order.find().limit(ordersCount).sort({ createdAt: -1 }).populate('user');
    ordersCount = orders.length;

    res.status(200).json({
        success: true,
        orders,
        ordersCount,
    });
};

exports.updateOrder = async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'username email');
    if (!order) {
        return res.status(404).json({
            success: false,
            message: 'Order not found with this id',
        });
    }

    if (order.orderStatus === 'Delivered') {
        return res.status(400).json({
            success: false,
            message: 'You have already delivered this order',
        });
    }

    order.orderStatus = req.body.status;

    if (req.body.status === 'Delivered') {
        order.DeliveredAt = Date.now();
        order.estimatedDeliveryDate = null;
    }

    await order.save({ validateBeforeSave: false });

    const randomDays = Math.floor(Math.random() * 8);
    const currentDate = new Date();
    const estimatedDeliveryDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + randomDays
    );

    // await sendEmail({
    //     username: order.user.username,
    //     email: order.user.email,
    //     type: 'OrderDelivered',
    //     subject: 'Order has been delivered',
    //     items: order.orderItems,
    //     total: order.totalPrice,
    //     date: estimatedDeliveryDate.toDateString(),
    // });

    res.status(200).json({
        success: true,
        message: 'Email sent successfully',
        order,
    });
};

exports.deleteOrder = async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        return res.status(404).json({
            success: false,
            message: 'Order not found with this id',
        });
    }

    await order.remove();
    res.status(200).json({
        success: true,
        message: 'Order deleted successfully',
    });
};
