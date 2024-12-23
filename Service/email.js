
const nodemailer = require('nodemailer');

async function sendEmail(email, comment, date, time) {
    console.log('email',email);
    
    let testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: '<dulce.hahn41@ethereal.email>',
        to:email,
        // to: empId, // Use the actual employee email here
        subject: 'Schedule Notification',
        text: `You have a new scheduled meeting on ${date} at ${time}. Comment: ${comment}`,
    };

    console.log('Preparing to send email...');
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        return true; // Indicate success
    } catch (error) {
        console.error('Error sending email:', error);
        throw error; // Rethrow the error for further handling if needed
    }
}

module.exports = sendEmail;