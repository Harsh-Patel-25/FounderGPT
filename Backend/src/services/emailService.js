import nodemailer from "nodemailer";
import logger from "../utils/logger.js";

/**
 * Send a password reset email to a user
 * @param {string} email - Recipient email address
 * @param {string} resetToken - Unique reset token
 * @param {string} fullName - User's full name
 */
export const sendPasswordResetEmail = async (email, resetToken, fullName) => {
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  // Debug: log that we're attempting to send
  logger.info(`Attempting to send reset email to: ${email}`);
  logger.info(`Email sender configured: ${emailUser ? "YES" : "NO"}`);
  logger.info(`Email password configured: ${emailPass ? "YES (length: " + emailPass.length + ")" : "NO"}`);

  if (!emailUser || !emailPass) {
    logger.error("EMAIL_USER or EMAIL_PASS is not set in .env file!");
    throw new Error("Email service is not configured. Set EMAIL_USER and EMAIL_PASS in Backend/.env");
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // use STARTTLS
      auth: {
        user: emailUser,
        pass: emailPass, // Gmail App Passwords work WITH spaces
      },
    });

    // Verify SMTP connection first
    await transporter.verify();
    logger.info("SMTP connection verified successfully");

    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:8080";
    const resetUrl = `${frontendUrl}/reset-password/${resetToken}`;

    const mailOptions = {
      from: `"FounderGPT" <${emailUser}>`,
      to: email,
      subject: "Password Reset Request - FounderGPT",
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
          <div style="background: linear-gradient(135deg, #6366f1, #8b5cf6); padding: 40px 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">🚀 FounderGPT</h1>
            <p style="color: rgba(255,255,255,0.85); margin-top: 8px; font-size: 14px;">AI-Powered Startup Validation</p>
          </div>
          <div style="padding: 40px 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
            <h2 style="color: #1f2937; margin-top: 0;">Password Reset Request</h2>
            <p style="color: #4b5563; line-height: 1.6;">Hello <strong>${fullName}</strong>,</p>
            <p style="color: #4b5563; line-height: 1.6;">We received a request to reset the password for your FounderGPT account. Click the button below to set a new password:</p>
            <div style="text-align: center; margin: 35px 0;">
              <a href="${resetUrl}" style="background: linear-gradient(135deg, #6366f1, #8b5cf6); color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; display: inline-block;">Reset Password</a>
            </div>
            <p style="color: #6b7280; font-size: 13px; line-height: 1.5;">This link will expire in <strong>1 hour</strong>. If you didn't request a password reset, you can safely ignore this email.</p>
            <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 25px 0;">
            <p style="font-size: 12px; color: #9ca3af; text-align: center; margin: 0;">
              This is an automated email from FounderGPT. Please do not reply.
            </p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    logger.info(`Password reset email sent successfully to: ${email} (messageId: ${info.messageId})`);
    return true;
  } catch (error) {
    logger.error(`Error sending reset email to ${email}:`, error.message);
    logger.error(`Full error:`, JSON.stringify(error, Object.getOwnPropertyNames(error)));
    throw new Error("Failed to send password reset email: " + error.message);
  }
};
