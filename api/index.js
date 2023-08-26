const cookieParser = require('cookie-parser')
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require("cors")
const errorMiddleware = require('./middleware/error')

const userRoute = require('./routes/user');
const productRoute = require('./routes/product');
const orderRoute = require('./routes/order');
const stripeRoute = require('./routes/stripe');

dotenv.config();

mongoose.connect(process.env.MONGODB_URL)
    .then(()=> console.log('MongoDB connected'))
    .catch(err => console.log(err))

app.use(cors());
app.use(cookieParser())
app.use(express.json());

app.use('/api/users', userRoute);
app.use('/api/product', productRoute);
app.use('/api/orders', orderRoute);
app.use('/api/checkout', stripeRoute);

// CORS
app.use(async (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', '*');
    return next();
});

// Middleware for errors
app.use(errorMiddleware)

app.listen(process.env.PORT || 5000, () => {
    console.log("Server connected!")
});
