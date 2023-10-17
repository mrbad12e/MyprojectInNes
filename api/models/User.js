const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require("jsonwebtoken")
const Crypto = require("crypto")
const Bcrypt = require('bcrypt')

const UserTable = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'Please Enter Your Name'],
            maxLength: [30, 'Name cannot exceed 30 characters'],
            minLength: [2, 'Name must be atleast of 2 characters long'],
            unique: true
        },
        email: {
            type: String,
            required: [true, 'Please Enter Your Email'],
            validate: [validator.isEmail, 'Please Enter a valid Email'],
            unique: true
        },
        password: {
            type: String,
            required: [true, 'Please Enter Your Password'],
            minLength: [8, 'Password must be longer'],
            select: false
        },
        role: {
            type: String,
            default: 'user'
        },
        resetPasswordToken: { type: String, default: null, select: false },
        resetPasswordExpire: { type: Date, default: null, select: false }, 
    },
    { timestamps: true }
);

UserTable.pre('save', async function (next) {
    if (!this.isModified('password')) next()
    this.password = await Bcrypt.hash(this.password, 12)
})

UserTable.methods.getJWTToken = function () {
    return jwt.sign({
        id: this._id,
    }, process.env.JWT_SECRET_KEY, {expiresIn:"3d"})
}

UserTable.methods.comparePassword = async function (enteredPassword) {
    return await Bcrypt.compare(enteredPassword, this.password)
}

UserTable.methods.GetResetPasswordToken = function () {
    // generating token
    const resetToken = Crypto.randomBytes(20).toString('hex');

    this.resetPasswordToken = Crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken
}

module.exports = mongoose.model('User', UserTable);
