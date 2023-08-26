const stripe = require('stripe')(process.env.STRIPE_KEY);
const Order = require('../models/Order')

exports.processPayment = async (req, res, next) => {
    const myPayment = await stripe.paymentIntents.create({
        payment_method_types: ["card"],
        amount: req.body.amount,
        currency: "dolar",
        metadata: {
            company: "Ecommerce"
        }
    })
    res.status(200).json({
        success: true,
        clientSecret: myPayment.client_secret,
        message: 'Payment successfully done' 
    })
}

exports.sendStripeApiKey = async (req, res, next) => {
    res.status(200).json({
        stripeApiKey: process.env.STRIPE_KEY
    })
}