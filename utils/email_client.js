
const nodeMailer = require('nodemailer')
const adminEmail = process.env.NOREPLY_EMAIL
const adminPassword = process.env.NOREPLY_EMAIL_PASSWORD
const mailHost = 'smtp.gmail.com'
const mailPort = 587


export function sendEmail(to, subject, htmlContent) {
    const transporter = nodeMailer.createTransport({
        host: mailHost,
        port: mailPort,
        secure: false,
        auth: {
            user: adminEmail,
            pass: adminPassword
        }
    })
    const options = {
        from: adminEmail,
        to: to,
        subject: subject,
        html: htmlContent
    }
    return transporter.sendMail(options)
}
