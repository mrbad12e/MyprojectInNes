const jwt = require("jsonwebtoken")
const User = require("../models/User")

exports.isAuthUser = async ( req, res, next) => {
    const { token } = req.cookies

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Please login to access resource'
        })
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)

    req.user = await User.findById(decodedToken.id)

    next()
}

exports.authRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.roles)) {
            return res.status(403).json({
                success: false,
                message: `Role: ${req.user.role} is not allowed to access the resource`
            })
        }
        next()
    }
}