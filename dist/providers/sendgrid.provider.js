"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResetPasswordConfirmationEmail = exports.sendForgotPasswordEmail = void 0;
const mail_1 = __importDefault(require("@sendgrid/mail"));
const env_1 = require("../config/env");
const apikey = env_1.ENV.SENDGRID_API_KEY;
const supportEmail = env_1.ENV.SUPPORT_EMAIL;
mail_1.default.setApiKey(apikey);
const sendEmail = async (emailOptions) => {
    try {
        await mail_1.default.send(emailOptions);
        console.log(`Email sent to ${emailOptions.to}`);
    }
    catch (err) {
        console.error("Error sending email:", err);
    }
};
const sendForgotPasswordEmail = async (email, resetLink) => {
    const emailOptions = {
        to: email,
        from: supportEmail,
        subject: "Reset your password",
        html: `
      <p>Hello,</p>
      <p>You requested a password reset. Click the link below to reset your password:</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>If you didn’t request this, you can ignore this email.</p>
      <p>This link will expire in 1 hour.</p>
    `,
    };
    await sendEmail(emailOptions);
};
exports.sendForgotPasswordEmail = sendForgotPasswordEmail;
const sendResetPasswordConfirmationEmail = async (email) => {
    const emailOptions = {
        to: email,
        from: supportEmail,
        subject: "Your password has been reset",
        html: `
      <p>Hello,</p>
      <p>Your password has been successfully reset. If you didn’t request this, please contact support immediately.</p>
      <p>If you have any questions, feel free to reach out to our support team.</p>
    `,
    };
    await sendEmail(emailOptions);
};
exports.sendResetPasswordConfirmationEmail = sendResetPasswordConfirmationEmail;
exports.default = mail_1.default;
