import nodemailer from 'nodemailer';

function sendMail(email, otp, subject = "Verification Email For SwiftMove") {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sumitsahi585@gmail.com',
      pass: 'dvei ulpt azbw myqt' // <-- Yahan apna 16-letter App Password daalo
    }
  });

  let mailOptions = {
    from: 'sumitsahi585@gmail.com',
    to: email,
    subject: subject,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Welcome to SwiftMove!</h2>
        <p>Your verification OTP is:</p>
        <h1 style="color: #FF6B35; letter-spacing: 4px;">${otp}</h1>
        <p>This OTP is valid for 10 minutes.</p>
      </div>
    `
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Email Error: ", error);
    } else {
      console.log('Email sent successfully: ' + info.response);
    }
  });
}

export default sendMail;