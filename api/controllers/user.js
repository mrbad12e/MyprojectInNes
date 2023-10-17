const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');
const Crypto = require('crypto');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({
            username: username,
            email: email,
            password: password
        })
        user.save()
        let token = jwt.sign(
            {
                id: user._id,
                username: user.username,
                email: user.email,
            },
            process.env.JWT_SECRET_KEY
        );
        const options = {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };
        await sendEmail({
            email: user.email, 
            subject: 'Create account successful',
            username: user.username,
            type: 'Welcome'
        })

        res.status(201).cookie('token', token, options).json({
            success: true,
            user,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

exports.loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please enter email and password',
            });
        }
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or Password',
            });
        }
        const isPasswordMatched = await user.comparePassword(password);
        if (!isPasswordMatched) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or Password',
            });
        }

        let token = jwt.sign(
            {
                id: user._id,
                username: user.username,
                email: user.email,
            },
            process.env.JWT_SECRET_KEY
        );

        const options = {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };

        res.status(201).cookie('token', token, options).json({
            success: true,
            user,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

exports.logout = async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });
    res.status(200).json({
        success: true,
        message: 'User logged out',
    });
};

exports.forgotPassword = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found',
        });
    }

    const resetToken = user.GetResetPasswordToken();
    
    await user.save({ validateBeforeSave: false });

    const resetPasswordURL = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
    try {
        await sendEmail({
            email: user.email,
            subject: 'Password Recovery - Ecommerce',
            type: 'ResetPassword',
            link: resetPasswordURL,
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
        });
    } catch (err) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

exports.resetPassword = async (req, res, next) => {
    const resetPasswordToken = Crypto.createHash('sha256').update(req.params.token).digest('hex');
    console.log(resetPasswordToken);
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });
    
    if (!user) {
        return res.status(400).json({
            success: false,
            message: 'Reset Password Token in invalid or has been expired!',
        });
    }

    if (req.body.password !== req.body.confirmPassword) {
        return res.status(400).json({
            success: false,
            message: 'Password does not match!',
        });
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    let token = jwt.sign(
        {
            id: user._id,
            name: user.username,
            email: user.email,
        },
        process.env.JWT_SECRET_KEY
    );

    const options = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true,
    };

    res.status(200).cookie('token', token, options).json({
        success: true,
        user,
    });
};

exports.getUserDetails = async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user,
    });
};

exports.updatePassword = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select('+password');

        const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

        if (!isPasswordMatched) {
            return res.status(400).json({
                success: false,
                message: 'Old Password is incorrect',
            });
        }

        if (req.body.newPassword !== req.body.confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'Password does not match',
            });
        }

        user.password = req.body.newPassword;

        await user.save();

        let token = jwt.sign(
            {
                id: user._id,
                name: user.name,
                email: user.email,
            },
            process.env.JWT_SECRET_KEY
        );

        const options = {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };

        res.status(200).cookie('token', token, options).json({
            success: true,
            user,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

// admin
exports.loginAdmin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        console.log(email);
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please enter email and password',
            });
        }
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or Password',
            });
        }
        const isPasswordMatched = await user.comparePassword(password);
        if (!isPasswordMatched) {
            return res.status(401).json({
                success: false,
                message: 'Invalid Password',
            });
        }
        if (user.role === 'user') {
            return res.status(401).json({
                success: false,
                message: 'User role is not allowed to access'
            })
        }

        let token = jwt.sign(
            {
                id: user._id,
                username: user.username,
                email: user.email,
            },
            process.env.JWT_SECRET_KEY
        );

        const options = {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };

        res.status(201).cookie('token', token, options).json({
            success: true,
            user,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}
exports.getSingleUser = async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(400).json({
            success: false,
            message: `User does not exist with Id: ${req.params.id}`,
        });
    }

    res.status(200).json({
        success: true,
        user,
    });
};

exports.getAllUsers = async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        success: true,
        users,
    });
};

exports.updateUserRole = async (req, res, next) => {
    const newUserData = {
        username: req.body.username,
        email: req.body.email,
        role: req.body.role,
    };

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        user,
    });
};
