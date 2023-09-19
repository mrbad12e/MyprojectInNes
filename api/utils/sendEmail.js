const nodemailer = require('nodemailer');

const sendEmail = async options => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD
        },
    });

    const mailOptions = {
        from: 'saptheoanh123@gmail.com',
        to: options.email,
        subject: options.subject,
        text: options.message,
        headers: {
            'Content-Type': 'text/html',
            charset: 'UTF-8'
        }
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;