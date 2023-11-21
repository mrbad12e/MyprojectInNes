const mongoose = require("mongoose")

const returnProductTable = new mongoose.Schema({
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

const ReturnTable = new mongoose.Schema({
    order: {
        type: mongoose.Schema.ObjectId,
        ref: 'Order',
        required: true
    },
    product: [returnProductTable],
    reason: { type: String, required: true },
    requestedAt: { type: Date, default: Date.now },
    status: { type: String, default: 'Pending' },
    resolvedAt: Date
})

module.exports = mongoose.model('Return', ReturnTable)