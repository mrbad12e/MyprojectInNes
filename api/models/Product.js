const mongoose = require("mongoose")

const ProductTable = new mongoose.Schema(
    {
        title: { type: String, required: true, unique: true },
        descrip: { type: String, required: true },
        img: [{ 
            url: {
                type: String, 
                required: true
            }
        }],
        categories: { type: Array },
        size: { type: Array },
        color: { type: Array },
        price: { type: Number, required: true },
        inStock: { type: Boolean, default: true },
        Stock: {
            type: Number, default: 0
        },
        ratings: { type: Number, default: 0 },
        numOfReviews: { type: Number, default: 0},
        reviews: [
            {
                user: {
                    type: mongoose.Schema.ObjectId,
                    ref: 'User',
                    required: true
                },
                username: {
                    type: String, required: true
                },
                rate: {
                    type: Number, required: true
                },
                comment: {
                    type: String, required: true
                }
            }
        ]
    },
    { timestamps: true }
)

module.exports = mongoose.model("Product", ProductTable)