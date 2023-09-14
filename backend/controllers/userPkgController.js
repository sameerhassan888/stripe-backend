const nodemailer = require("nodemailer");

exports.sendEmail = async (req, res) => {
  const { name, email, destination, paxNumber, checkinDate, checkoutDate, message } = req.body;

  try {
    // Create a transporter object using Nodemailer
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "sameerhassan888@gmail.com", // Replace with your email address
        pass: "qryirptxbfhkpwwu", // Replace with your email password
      },
    });

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: "sameerhassan888@gmail.com", // Destination email address
      subject: "User's Custom Package Inquiry",
      text: `
        Name: ${name}
        Email: ${email}
        Destination: ${destination}
        Pax Number: ${paxNumber}
        Check-in Date: ${checkinDate}
        Checkout Date: ${checkoutDate}
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred." });
  }
};
