const router = require('express').Router()
const {
    newOrder,
    getSingleOrder,
    getAllOrders,
    myOrders,
    updateOrder,deleteOrder
} = require('../controllers/order')
const {isAuthUser, authRoles} = require('../middleware/auth')
const {requestReturn, getAllReturns} = require('../controllers/return')
const {initiateRefund, updateRefundStatus, getAllRefunds} = require('../controllers/refund')

router.route('/order/new').post(isAuthUser, newOrder)
router.route('/order/:id').get(isAuthUser, getSingleOrder)
router.route('/orders/me').get(isAuthUser, myOrders)
router.route('/order/:id/return').post(isAuthUser, requestReturn)


router
    .route('/admin/order/:id/refund')
    .post(isAuthUser, authRoles('admin'), initiateRefund)

router.route('/admin/order/:orderId/refund/:refundId/status').patch(isAuthUser, authRoles('admin'), updateRefundStatus)

router.route('/admin/returns').get(isAuthUser, authRoles('admin'), getAllReturns)

router.route('/admin/refunds').get(isAuthUser, authRoles('admin'), getAllRefunds)

module.exports = router