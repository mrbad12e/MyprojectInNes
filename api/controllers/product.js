const Product = require("../models/Product")
const ApiFeatures = require("../utils/apifeatures")

exports.getAllProducts = async (req, res, next) => {
    const resultPerPage = process.env.RESULT_PER_PAGE
    const productsCount = await Product.countDocuments()

    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
    let products = await apiFeature.query

    let filteredProductsCount = products.length

    apiFeature.pagination(resultPerPage)
    products = await apiFeature.query.clone()

    res.status(200).json({
        success: true,
        products, productsCount, resultPerPage, filteredProductsCount
    })
}

exports.getProductDetail = async (req, res, next) => {
    const product = await Product.findById(req.params.id)

    if (!product) {
        res.status(404).json({
            success: false,
            message: 'Product not found'
        })
    }

    res.status(200).json({
        success: true,
        product
    })
}

exports.createProductReview = async (req, res, next) => {
    const { rate, comment, productId } = req.body
    const review = {
        user: req.user._id,
        username: req.user.username,
        rate: Number(rate),
        comment
    }

    const product = await Product.findById(productId)
    const isReviewed = product.reviews.find(rev => 
        rev.user.toString() === req.user._id.toString())
    if (isReviewed) {
        product.reviews.forEach(rev => {
            if (rev.user.toString() === req.user._id.toString()){
                rev.rate = rate,
                rev.comment = comment
            } else {
                product.reviews.push(review)
                product.numOfReviews = product.reviews.length
            }
        })
    }

    let avg = 0
    product.reviews.forEach(rev => avg += rev.rate)
    product.ratings = avg / product.reviews.length

    await product.save({ validateBeforeSave: false })
    res.status(200).json({ success: true })
}

exports.getProductReviews = async (req, res, next) => {
    const product = await Product.findById(req.query.id)
    if (!product) {
        res.status(404).json({
            success: false,
            message: 'Product not found'
        })
    }
    
    res.status(200).json({
        success: true,
        reviews: product.reviews
    });
}

exports.deleteReview = async (req, res, next) => {
    const product =await Product.findById(req.query.productId)
    if (!product) {
        res.status(404).json({
            success: false,
            message: 'Product not found'
        })
    }

    const reviews = product.reviews.filter(
        rev => rev._id.toString() !== req.query.id.toString()
    )
    
    let avg = 0;

    reviews.forEach(rev => {
        avg += rev.rating;
    });

    let rate = 0 
    if (reviews.length) rate = avg / reviews.length

    const numOfReviews = reviews.length

    await Product.findByIdAndUpdate(
        req.query.productId,
        { reviews, rate, numOfReviews },
        { new: true, runValidators: true, useFindAndModify: false }
    )

    res.status(200).json({ success: true })
}

// admin
exports.getAdminProducts = async (req, res, next) => {
    const products = await Product.find()
    res.status(200).json({
        success: true,
        products
    })
}