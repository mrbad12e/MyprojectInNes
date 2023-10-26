const router = require('express').Router();
const {
    getAllProducts,
    getAdminProducts,
    getProductDetail,
    getProductReviews,
    deleteReview,
    createProductReview
} = require('../controllers/product')
const {isAuthUser, authRoles} = require('../middleware/auth')

router.route('/products').get(getAllProducts)
router.route('/product/:id').get(getProductDetail)
router.route('/review').put(isAuthUser, createProductReview)

router
    .route('/reviews')
    .get(getProductReviews)
    .delete(isAuthUser, deleteReview)

module.exports = router;
