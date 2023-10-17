const router = require('express').Router()
const {loginAdmin, logout, forgotPassword, resetPassword, updateUserRole, getAllUsers, getSingleUser} =require('../controllers/user')
const { getRecentOrders } = require('../controllers/order')

const {isAuthUser, authRoles} = require('../middleware/auth')


router.route('/login').post(loginAdmin)
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)
router.route('/logout').get(logout)

router.route('/users').get(isAuthUser, authRoles('admin'), getAllUsers)
router
    .route('/user/:id')
    .get(isAuthUser, authRoles('admin'), getSingleUser)
    .put(isAuthUser, authRoles('admin'), updateUserRole)

router.route('/order/recent').get(isAuthUser, authRoles("admin"), getRecentOrders)

module.exports = router