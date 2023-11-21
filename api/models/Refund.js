const mongoose = require("mongoose")

const RefundTable = new mongoose.Schema({
    order: {
        type: mongoose.Schema.ObjectId,
        ref: 'Order',
        required: true
    },
    id: { type: String, required: true },
    amount: { type: Number, required: true },
    initiatedAt: { type: Date, default: Date.now },
    status: { type: String, default: 'Initiated' },
    completedAt: Date
})

module.exports = mongoose.model('Refund', RefundTable)