const multer = require('multer');
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const type = req.body.type;
        cb(null, `./storage/${type}`)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname.replace(/[\s%]/g, '_'));
    }
})

const fileFilter = (req, file, cb) => {
    const allowMimes = ['image/jpeg', 'image/jpg', 'image/png'];

    if (allowMimes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type'))
    }
}

module.exports = multer({
    storage,
    limits: {
        fileSize: 250000000
    },
    fileFilter
})
