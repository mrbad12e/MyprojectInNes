const Contact = require('../models/Contact');
const sendEmail = require('../utils/sendEmail');

exports.contactUs = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        const contact = await Contact.create({
            name,
            email,
            subject,
            message
        });

        await contact.save();
        await sendEmail({
            email: 'saptheoanh123@gmail.com',
            subject: 'New Contact Form Submission',
            html: `
            <p>You have received a new contact form submission:</p>
            <ul>
              <li>Name: ${name}</li>
              <li>Email: ${email}</li>
              <li>Subject: ${subject}</li>
            </ul>
            <p>Message:</p>
            <p>${message}</p>`
        });
        res.status(200).json({
            success: true,
            message: 'Message sent and saved successfully',
            contact
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error Sending Message'
        });
    }
};
