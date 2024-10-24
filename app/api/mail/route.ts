import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import hbs  from 'nodemailer-express-handlebars';
import path from 'path';

export async function POST(request:NextRequest) {
    const reqBody =await request.json()
    const { email, name } = reqBody;
console.log("reqBodyMail:", reqBody)
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json({ message: "Invalid email address" });
        }

        try {
            const transporter = nodemailer.createTransport({
                host: "ezracapitaltrades.com",
                port: 465,
                secure: true,
                auth: {
                    user: "admin@ezracapitaltrades.com",
                    pass: "o%ZoG-yD6buh"
                }
            });

            const hbsOptions = {
                viewEngine: {
                    partialsDir: path.resolve('./views'),
                    layoutsDir: path.resolve('./views'),
                    defaultLayout: ''
                },
                viewPath: path.resolve('./views')
            };

            transporter.use('compile', hbs(hbsOptions));

            const mailOptions = {
                from: {
                    name: "Ezcapasia",
                    address: "admin@ezracapitaltrades.com",
                },
                to: email,
                subject: "Your registration was successful",
                template: "signup",
                context: { name }
            };

            const info = await transporter.sendMail(mailOptions);
            console.log("Email sent: ", info.response);

            return NextResponse.json({ status: 'success' });
        } catch (error) {
            console.error("Error sending email: ", error);
            return NextResponse.json({ status: 'error', message: "Error sending response" });
        }
}
