const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "senderEmail",
    pass: "google app password"
  }
});

module.exports = (email, activationCode) => {
  transporter.sendMail(
    {
      from: "senderEmail",
      to: email,
      subject: "Activation account",
      html: `<h1>Confirmation Email</h1>
              <a href=http://localhost:3000/confirm/${activationCode}>active email</a>`
    },
    err => {
      if (err) console.log(err);
    }
  );
};
