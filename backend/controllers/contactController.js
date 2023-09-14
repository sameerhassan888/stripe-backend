const nodemailer = require("nodemailer");

exports.sendEmail = (req, res) => {
  const { name, email, message } = req.body;

  // Create a transporter object using Nodemailer
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "sameerhassan888@gmail.com", // Replace with your Gmail address
      pass: "qryirptxbfhkpwwu", // Replace with your Gmail password
    },
  });

  const fromAddress = `"${name}" <${email}>`; // Use the user's email as the from field

  const mailOptions = {
    from: fromAddress,
    to: "sameerhassan888@gmail.com",
    subject: "New Contact Form Submission",
    text: `
      Name: ${name}
      Email: ${email}
      Message: ${message}
    `,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: "Error sending the email." });
    } else {
      console.log("Email sent: " + info.response);
      res.json({ message: "Email sent successfully!" });
    }
  });
};
