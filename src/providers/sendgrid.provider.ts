import mail from "@sendgrid/mail";
import { ENV } from "../config/env";

const apikey = ENV.SENDGRID_API_KEY;
const supportEmail = ENV.SUPPORT_EMAIL;
mail.setApiKey(apikey);

interface EmailOptions {
  to: string;
  from: string;
  subject: string;
  html: string;
}

const sendEmail = async (emailOptions: EmailOptions): Promise<void> => {
  try {
    await mail.send(emailOptions);
    console.log(`Email sent to ${emailOptions.to}`);
  } catch (err) {
    console.error("Error sending email:", err);
  }
};

export const sendForgotPasswordEmail = async (email: string, resetLink: string): Promise<void> => {
  const emailOptions: EmailOptions = {
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

export const sendResetPasswordConfirmationEmail = async (email: string): Promise<void> => {
  const emailOptions: EmailOptions = {
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

export const sendContactMessageConfirmation = async (
  userEmail: string,
  userName: string
): Promise<void> => {
  const emailOptions: EmailOptions = {
    to: userEmail,
    from: supportEmail,
    subject: 'We received your message',
    html: `
      <p>Hi ${userName},</p>
      <p>Thank you for reaching out. We've received your message and will get back to you soon.</p>
      <p>If you have any urgent concerns, feel free to reply to this email.</p>
      <p>– The Support Team</p>
    `,
  };

  await sendEmail(emailOptions);
};

export default mail;
