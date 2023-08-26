const router = require("express").Router();
const { processPayment, sendStripeApiKey } = require('../controllers/payment')
const { isAuthUser } = require('../middleware/auth')

router.route('/payment').post(isAuthUser, processPayment)
router.route('/stripeapikey').get(isAuthUser, sendStripeApiKey)
module.exports = router;