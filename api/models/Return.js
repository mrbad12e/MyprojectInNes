const mongoose = require("mongoose")

const ReturnTable = new mongoose.Schema({
    order: {
        type: mongoose.Schema.ObjectId,
        ref: 'Order',
        required: true
    },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: true
    },
    reason: { type: String, required: true },
    requestedAt: { type: Date, default: Date.now },
    status: { type: String, default: 'Pending' },
    resolvedAt: Date
})

module.exports = mongoose.model('Return', ReturnTable)