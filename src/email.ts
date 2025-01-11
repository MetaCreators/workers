import nodemailer from "nodemailer";
require('dotenv').config()

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_ENDPOINT,
  port: 587,
  secure: false, 
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
  debug: true, 
});

export async function sendEmail(to:string,body:string) {
 try {
    await transporter.verify();
    console.log('SMTP connection verified');

    const result = await transporter.sendMail({
      from: "contact@lithouse.in",
      sender: "contact@lithouse.in",
      to,
      subject: "Your Thumbnail Training Status Update",
      text: body,
    });
    console.log('Email sent successfully:', result.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}
