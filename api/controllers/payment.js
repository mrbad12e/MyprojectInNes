const axios = require('axios');
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

exports.captureOrder = async (req, res, next) =>{
    try {
        const accessToken = await generateAccessToken();
        console.log(req.body.token);
        const response = await axios.post(
            `${base}/v2/checkout/orders/${req.body.token}/capture`,
            {},
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        res.status(200).json({ success: true, order: response.data });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

exports.createOrder = async (req, res, next) => {
    try {
        const accessToken = await generateAccessToken();
        const url = `${base}/v2/checkout/orders`;
        const orderBody = {
            intent: 'CAPTURE',
            purchase_units: [
                {
                    amount: {
                        currency_code: 'USD',
                        value: req.body.totalPrice,
                    },
                },
            ],
            application_context: {
                return_url: `${process.env.FRONTEND_URL}/success`,
                cancel_url: `${process.env.FRONTEND_URL}/not-found`,
            },
        };
        const response = await axios.post(url, orderBody, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const order = response.data;
        const orderId = order.id;
        const approveUrl = order.links.find((link) => link.rel === 'approve');
        if (approveUrl) {
            res.status(200).json({ orderId, approveUrl: approveUrl.href });
        } else {
            res.status(400).json({ error: 'Approval URL not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
