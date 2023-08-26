const mongoose = require('mongoose');
const validator = require('validator');
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken")
const Crypto = require("crypto")

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
            select: false
        },
        role: {
            type: String,
            default: 'user'
        },
        resetPasswordToken: String,
        resetPasswordExpire: Date
    },
    { timestamps: true }
);

UserTable.pre('save', async (next) => {
    if (!this.isModified('password')) next()
    this.password = await CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC)
})

UserTable.methods.getJWTToken = () => {
    return jwt.sign({
        id: this._id,
    }, process.env.JWT_SECRET_KEY, {expiresIn:"3d"})
}

UserTable.methods.comparePassword = async (enteredPassword) => {
    const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC)
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    return originalPassword == enteredPassword
}

UserTable.methods.GetResetPasswordToken = () => {
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
