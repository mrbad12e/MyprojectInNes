const Order = require('../models/Order');
const Product = require('../models/Product');
const sendEmail = require('../utils/sendEmail');
const User = require('../models/User');

exports.newOrder = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id)
        const { shippingInfo, orderItems, itemsPrice, shippingPrice, totalPrice,paymentInfo } = req.body

        const orderItemsWithImages = await Promise.all(
            orderItems.map(async item => {
                const product = await Product.findById(item.product);
                if (product) {
                    return {
                        title: item.title,
                        price: item.price,
                        quantity: item.quantity,
                        images: item.img, // Include the images from the product
                        product: item.product
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
            user: req.user._id
        })
        const randomDays = Math.floor(Math.random() * 8)
        const currentDate = new Date()
        const estimatedDeliveryDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() + randomDays
        )
        
        await sendEmail({
            username: user.username,
            email: user.email,
            type: 'OrderConfirm',
            subject: 'Order has been placed successfully',
            items: order.orderItems,
            total: order.totalPrice,
            date: estimatedDeliveryDate.toDateString()
        })

        res.status(200).json({
            success: true, order
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.getSingleOrder = async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate(
        'user', 'username email'
    )
    if (!order) {
        return res.status(404).json({
            success: false,
            message: 'Order not found with this id'
        })
    }
    res.status(200).json({
        success: true, order
    })
}
// get logged in user orders (for user)
exports.myOrders = async(req, res, next) => {
    const orders = await Order.find({
        user: req.user._id
    })
    res.status(200).json({
        success: true, order
    })
}

// admin
exports.getAllOrders = async(req, res, next) => {
    const orders = await Order.find()

    let totalAmount = 0
    orders.forEach(order => totalAmount += order.totalPrice)

    res.status(200).json({
        success: true, totalAmount, orders
    })
}

exports.updateOrder = async (req, res, next) => {
    const order = await Order.findById(req.params.id)
    const user = await User.findById(req.user._id)
    if (!order) {
        return res.status(404).json({
            success: false,
            message: 'Order not found with this id'
        })
    }

    if (order.orderStatus === 'Delivered') {
        return res.status(400).json({
            success: false,
            message: 'You have already delivered this order'
        });
    }
    if (req.body.status === 'Shipped') {
        order.orderItems.forEach(async o => {
            await updateStock(o.product, o.quantity)
        })
    }

    order.orderStatus = req.body.status

    if (req.body.status === 'Delivered'){
        order.DeliveredAt = Date.now()
        order.estimatedDeliveryDate = null
    }

    await order.save({ validateBeforeSave: false })

    const randomDays = Math.floor(Math.random() * 8)
    const currentDate = new Date()
    const estimatedDeliveryDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + randomDays
    )
    const emailMessage = `<html>
    <body>
    <p>Hello ${user.username}!</p>
    <p>Your order ${order._id } has been ${order.orderStatus}. Your estimated Date of delivery is ${estimatedDeliveryDate.toDateString()}.</p>
    <p>Thank you for ordering. For more please visit our website.</p>
    <p>Here's the image of your ordered items:</p>
    ${order.orderItems
        .map(item => `${item.name} - Quantity: ${item.quantity} - Price: $ ${item.price}`)
        .join('\n')}
    <p>Total Price: $ ${order.totalPrice}</p>
    <p>Thank you for ordering.</p>
    </body>
    </html>`;
    await sendEmail({
        email: user.email,
        subject: `Your Order Status Update: ${order.orderStatus}`,
        html: emailMessage
    })

    res.status(200).json({
        success: true,
        message: 'Email sent successfully',
        order
    })
}

async function updateStock(id, quantity) {
    const product = await Product.findById(id);
    product.Stock -= quantity;
    await product.save({ validateBeforeSave: false });
}

exports.deleteOrder = async (req, res, next) => {
    const order = await Order.findById(req.params.id)
    if (!order) {
        return res.status(404).json({
            success: false,
            message: 'Order not found with this id'
        })
    }

    await order.remove()
    res.status(200).json({
        success: true, 
        message: 'Order deleted successfully'
    })
}