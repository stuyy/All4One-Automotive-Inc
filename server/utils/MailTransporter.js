require('dotenv').config();
const nodemailer = require('nodemailer');
/**
 * Wrapper class to send emails.
 */
class MailTransporter {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            tls: {
                rejectUnauthorized: false
            }
        });
    }
    async sendMail(opts = {}) {
        try {
            let mail = await this.transporter.sendMail({
                to: opts.receiver,
                from: opts.sender,
                subject: opts.subject,
                text: opts.message || '',
                html: opts.html || ''
            });
            return mail;
        }
        catch(err) {
            console.log(err);
        }
    }
}

module.exports = MailTransporter