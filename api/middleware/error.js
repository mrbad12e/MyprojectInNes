module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.message = err.message || "Server Error"

    if (err.name === "CaseError") {
        res.status(400).json({
            message: `Resource not found. Invalid: ${err.path}`
        })
    }

    if (err.code === 11000) {
        res.status(400).json({
            message: `Duplicate ${object.keys(err.keyValue)} entered`
        })
    }

    if (err.name === "JsonWebTokenError") {
        res.status(400).json({
            message: 'Json Web Token is invalid'
        })
    }

    if (err.name === "TokenExpiredError") {
        res.status(400).json({
            message: 'Json Web Token is invalid'
        })
    }
}