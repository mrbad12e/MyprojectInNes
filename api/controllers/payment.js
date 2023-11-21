const axios = require('axios');
const Order = require('../models/Order');
const client_id = 'AVe5WW3PC0WPLFESn6iIvLouPleDZz6jWYk7YS7XQLFjsAZYqYXpMkwiV7cPYyqRPsVgds88aSZG5-oO';
const app_secret = 'EHV6ZGE17NDs2tnBHPSTtpSdk3DpOLFnJfr7w6HKAY-trDaCUB6y2T8GggDM-9DOGLf0kViu90sp6uRA';
const base = 'https://api-m.sandbox.paypal.com';

async function generateAccessToken() {
    try {
        const response = await axios({
            url: `${base}/v1/oauth2/token`,
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Accept-Language': 'en_US',
                'content-type': 'application/x-www-form-urlencoded',
            },
            auth: {
                username: client_id,
                password: app_secret,
            },
            params: {
                grant_type: 'client_credentials',
            },
        });
        const data = response.data;
        return data.access_token;
    } catch (error) {
        console.error('Error generating access token:', error);
    }
}

exports.refundOrder = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id).populate('returns');
        const access_token = await generateAccessToken();
        const response = await axios({
            url: `${base}/v2/payments/captures/${req.params.id}/refund`,
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${access_token}`,
            },
        });
        const data = response.data;
        req.body.refundInfo = {
            id: data.id,
            status: data.status,
        };
        req.body.order = order
        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}