const router = require('express').Router()
const {loginAdmin, logout, forgotPassword, resetPassword, updateUser, getAllUsers, getSingleUser, deleteUser} =require('../controllers/user')
const { getRecentOrders, getAllOrders, updateOrder, deleteOrder } = require('../controllers/order')

const {isAuthUser, authRoles} = require('../middleware/auth')
const uploadFile = require('../utils/uploadFile')
const { getAllProducts, getProductDetail, updateProduct, createProduct, deleteProduct } = require('../controllers/product')


router.route('/login').post(loginAdmin)
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)
router.route('/logout').get(logout)

router.route('/users').get(isAuthUser, authRoles('admin'), getAllUsers)
router
    .route('/user/:id')
    .get(isAuthUser, authRoles('admin'), getSingleUser)
    .put(isAuthUser, uploadFile.single('avatar'), authRoles('admin'), updateUser)
    .delete(isAuthUser, authRoles('admin'), deleteUser)

router.route('/products').get(getAllProducts)
router.route('/product/:id')
    .get(getProductDetail)
    .put(isAuthUser, uploadFile.any('images') ,authRoles('admin'), updateProduct)
    .delete(isAuthUser, authRoles('admin'), deleteProduct)
router.route('/product/create')
    .post(isAuthUser, uploadFile.any('images'), authRoles('admin'), createProduct)

router.route('/order/recent').get(isAuthUser, authRoles("admin"), getRecentOrders)
router.route('/order/all').get(isAuthUser, authRoles('admin'), getAllOrders)
router.route('/order/:id')
    .put(isAuthUser, authRoles("admin"), updateOrder)
    .delete(isAuthUser, authRoles("admin"), deleteOrder)

module.exports = router