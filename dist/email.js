"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = sendEmail;
const nodemailer_1 = __importDefault(require("nodemailer"));
require('dotenv').config();
const transporter = nodemailer_1.default.createTransport({
    host: process.env.SMTP_ENDPOINT,
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
    },
    debug: true,
});
function sendEmail(to, body) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield transporter.verify();
            console.log('SMTP connection verified');
            const result = yield transporter.sendMail({
                from: "contact@lithouse.in",
                sender: "contact@lithouse.in",
                to,
                subject: "Your Thumbnail Training Status Update",
                text: body,
            });
            console.log('Email sent successfully:', result.messageId);
        }
        catch (error) {
            console.error('Error sending email:', error);
            throw error;
        }
    });
}
