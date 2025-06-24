const nm = require('nodemailer')

const tp = nm.createTransport({
  service: 'gmail',
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
})

module.exports = (to, sub, html) =>
  tp.sendMail({ from: process.env.EMAIL_USER, to, subject: sub, html })
