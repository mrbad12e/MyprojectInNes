const nodemailer = require('nodemailer');
const ejs = require('ejs');

const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD,
        },
    });
    switch (options.type) {
        case 'Welcome':
            options.link = process.env.FRONTEND_URL
            break;
        default:
            break;
    }
    ejs.renderFile(`./email_templates/${options.type}.ejs`, { options }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            var mailOptions = {
                from: 'saptheoanh123@gmail.com',
                to: options.email,
                subject: options.subject,
                html: data,
            };

            transporter.sendMail(mailOptions);
        }
    });
    
};

module.exports = sendEmail;
