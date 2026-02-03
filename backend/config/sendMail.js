import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
});

const sendMail = async (to, otp) => {
  try {
    await transporter.sendMail({
      from: process.env.USER_EMAIL,
      to: to,
      subject: "Reset Your Password",
      html: `
        <p>Your OTP for password reset is: <b>${otp}</b></p>
        <p>This OTP will expire in <b>5 minutes</b>.</p>
      `,
    });

    console.log("OTP Email Sent Successfully");
  } catch (error) {
    console.log("Email Error:", error);
  }
};

export default sendMail;
