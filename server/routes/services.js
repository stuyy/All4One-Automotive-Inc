
const router = module.exports = require('express').Router();
const ServiceRequest = require('../models/ServiceRequest');
const MailTransporter = require('../utils/MailTransporter');
const { check, validationResult } = require('express-validator');

router.get('/', (req, res) => {
    res.send(200);
}); 

router.post('/', [
    check('phoneNumber').custom((value, { req }) => {
        let phoneRegExp = new RegExp(/^([0-9]{3}-){2}[0-9]{4}$/);
        if(!phoneRegExp.test(value))
            throw new Error("Invalid Phone Number.")
        else return true;
    }),
    check('email').isEmail()
],
async (req, res) => {
    if(req.session.requested) {
        res.status(429).json({
            error: 429,
            message: "You're sending too many requests. Try again in 10 minutes."
        });
        return;
    }
    let errors = validationResult(req);
    if(!errors.isEmpty()) {
        console.log(errors)
        res.status(422).json({
            error: 422,
            msg: "The server cannot process the sent entity."
        });
        return;
    }
    else {
        let { name, phoneNumber, email, type } = req.body;
        let transport = new MailTransporter();
        let htmlTemplate = getEmailTemplate(name, phoneNumber, email, type);
        try {
            let mail = await transport.sendMail({
                receiver: process.env.GMAIL_USER,
                sender: process.env.EMAIL_USER,
                subject: `Service Request from ${name}`,
                html: htmlTemplate
            });
            let service = new ServiceRequest({
                serviceType: type,
                name,
                email,
                phoneNumber
            });
            await service.save();
            req.session.requested = true;
            console.log("Success. Request saved.")
            res.status(201).json({success: true, msg: "Success", data: service });
            setTimeout(() => {
                req.session.destroy();
                console.log("Session destroyed.");
            }, 10000)
        }
        catch(err) {
            res.status(500).json({ error: 500, msg: "Something went wrong, please try again."})
        }
    }
});

router.post('/a', (req, res) => {
    
})
function getEmailTemplate(name, phoneNumber, email, type) {
    return `
    <html>
        <head>
            <style>
                * {
                    padding: 0;
                    margin: 0;
                }
                header {
                    width: 100%;
                    height: 150px;
                    background-color: #212121;
                    display: flex;
                    justify-content: space-between !important;
                    color: #DB162F;
                }
                .logo {
                    width: 350px;
                }
                .email-message-body {
                    background-color: #DB162F;
                    color: white;
                    padding: 50px;
                    font-size: 1.5em;
                }
                footer {
                    text-align: center;
                    background-color: #212121;
                    height: 70px;
                    width: 100%;
                    padding: 10px;
                    color: #DB162F;
                    font-size: 1.5em;
                }
            </style>
        </head>
        <body>
            <header>
                <div>
                    <img class="logo" src="https://www.all4oneautomotiveinc.com/assets/logo.png">
                </div>
                <div>
                    <h1>Service Request - ${type}</h1>
                </div>
            </header>
            <section class="email-message-body">
                <h2>You recevied a service request</h2>
                <p>Hey Danish! You received a new service request</p>
                <h3>Details</h3>
                <h4>Service Requested: ${type}</h4>
                <h4>Name: ${name}</h4>
                <h4>Email: ${email}</h4>
                <h4>Phone Number: <a href="tel:${phoneNumber}">${phoneNumber}</a></h4>
            </section>
            <footer>
                <h1>All 4 One Automotive Inc. 2019</h1>
            </footer>
        </body>
    </html>

    `
}