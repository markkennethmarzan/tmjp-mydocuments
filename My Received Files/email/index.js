const mailer = require("nodemailer")

/**
 * GMAIL
 */
const transporter = mailer.createTransport({
  service: "gmail",
  auth: {
    user: "testmerightnow1022@gmail.com",
    pass: "createpassword"
  }
})

const mailOptions = {
  from: "testmerightnow1022@gmail.com",
  to: "markkennethmarzan@gmail.com",
  subject: "Test Mail",
  text: "Test me now",
  html: "<b>Test Test</b>"
}

transporter.sendMail(mailOptions, (err, info) => {
  err ? console.log(err) : console.log(info)
})


