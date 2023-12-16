const router = require('express').Router();
const {
    registerUser,
    loginUser,
    logout,
    forgotPassword,
    resetPassword,
    getUserDetails,
    updatePassword,
    updateProfile,
} = require('../controllers/user');

const { isAuthUser } = require('../middleware/auth');
const { contactUs } = require('../controllers/contact');
const uploadFile = require('../utils/uploadFile');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/logout').get(logout);

router.route('/me').get(isAuthUser, getUserDetails);
router.route('/me/profile/add').post(isAuthUser, uploadFile.single('avatar'), updateProfile);
router.route('/password/update').put(isAuthUser, updatePassword);

router.route('/contactus').post(contactUs);
module.exports = router;
