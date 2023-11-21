const router = require('express').Router();
const { newOrder, getSingleOrder, myOrders, confirmOrder } = require('../controllers/order');
const { isAuthUser, authRoles } = require('../middleware/auth');
const { requestReturn, getAllReturns } = require('../controllers/return');
router.route('/order/new').post(isAuthUser, newOrder);
router
    .route('/order/:id')
    .get(isAuthUser, getSingleOrder)
    .post(isAuthUser, requestReturn)
    .put(isAuthUser, confirmOrder);
router.route('/orders/me').get(isAuthUser, myOrders);

module.exports = router;
