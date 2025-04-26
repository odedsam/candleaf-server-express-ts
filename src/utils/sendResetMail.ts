import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER!,
    pass: process.env.MAIL_PASS!,
  },
});

export const sendResetEmail = async (email: string, resetLink: string) => {
  const html = `
<div style="font-family:sans-serif; padding:20px; background-color:#ecfdf5; color:#064e3b; border-radius:10px; max-width:600px; margin:auto">
    <h2 style="color:#10b981;">Password Reset</h2>
    <p>Hi there, someone (probably you) requested to reset your password.</p>
    <p>To reset your password, click the button below:</p>
    <a href="${resetLink}" style="display:inline-block; margin:20px 0; padding:10px 20px; background-color:#10b981; color:white; text-decoration:none; border-radius:8px">
      Reset Password
    </a>
    <p>If you didn't make this request, simply ignore this email.</p>
    <p style="font-size:12px; color:#6b7280">This link will be valid for one hour only.</p>
  </div>
  `;

  await transporter.sendMail({
    from: `"Support" <${process.env.MAIL_USER}>`,
    to: email,
    subject: "Reset Password",
    html,
  });
};
