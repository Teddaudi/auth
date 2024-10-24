"use client"
import nodemailer from 'nodemailer';
import hbs  from 'nodemailer-express-handlebars';

const paymentResponse = async ({email, name }) => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error("Invalid email address");
    }

    try {
        const transporter = nodemailer.createTransport({
            host: "ezracapitaltrades.com",
            port: 465,
            secure: true,
            auth: {
                user: "hr@ezracapitaltrades.com",
                pass: "U4KybGTej369RB9"
            }
        });

        const hbsOptions = {
            viewEngine: {
                partialsDir: 'views',
                layoutsDir: 'views',
                defaultLayout: ''
            },
            viewPath: 'views'
        };

        transporter.use('compile', hbs(hbsOptions));

        const mailOptions = {
            from: {
                name: "Ezracapital Trades",
                address: "hr@ezracapitaltrades.com",
            },
            to: email,
            subject: "Deposit to account",
            template: "paymentInit",
            context: {  name}
        };

        // Use async/await instead of a callback
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: ", info.response);

        return { status: 'success' };
    } catch (error) {
        console.error("Error sending email: ", error);
        return { status: 'error', message: "Error sending response" };
    }
};

module.exports = paymentResponse;
