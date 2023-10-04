const mongoose = require('mongoose');

const OrderTable = new mongoose.Schema(
    {
        shippingInfo: {
            address: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            country: { type: String, required: true },
            phoneNumber: { type: Number, required: true },
        },
        orderItems: [
            {
                product: {
                    type: mongoose.Schema.ObjectId,
                    ref: 'Product',
                    required: true,
                },
                title: { type: String, required: true },
                price: { type: Number, required: true },
                quantity: { type: Number, required: true },
                images: { type: String, required: true },
            },
        ],
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true,
        },
        paymentInfo: {
            id: { type: String, required: true },
            status: { type: String, required: true },
        },
        paidAt: { type: Date, required: true },
        itemsPrice: { type: Number, default: 0, required: true },
        shippingPrice: { type: Number, default: 0, required: true },
        totalPrice: { type: Number, default: 0, required: true },
        orderStatus: { type: String, required: true, default: 'Processing' },
        DeliveredAt: Date,
        returns: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Return',
            },
        ],
        // Return & Refund details
        isReturned: { type: Boolean, default: false },
        returnRequestedAt: Date,
        isRefunded: { type: Boolean, default: false },
        refundRequestedAt: Date,
        refundStatus: { type: String, default: 'Not Requested' },
        refundInfo: {
            id: String,
            amount: Number,
            status: String,
            createdAt: Date,
        },
        refundedAt: Date,
    },
    { timestamps: true }
);

module.exports = mongoose.model('Order', OrderTable);
