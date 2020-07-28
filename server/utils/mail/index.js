const mailer = require("nodemailer");
require("dotenv").config();

const getMail = (to, name, token, template) => {
    let data = null;

    switch (template) {
        case "welcome":
            data = {
                from: "Waves <nghuuton@gmail.com>",
                to,
                subject: `Welcome to waves ${name}`,
                html: "<b>Welcome to waves shop !!!</b>",
            };
            break;

        default:
            data;
    }

    return data;
};

const sendEmail = (to, name, token, type) => {
    const smtpTranspot = mailer.createTransport({
        service: "Gmail",
        auth: {
            user: "nghuuton@gmail.com",
            pass: "Tontanha123456",
        },
    });

    const mail = getMail(to, name, token, type);
    smtpTranspot.sendMail(mail, function (error, response) {
        if (error) {
            console.log(error);
        } else {
            cb();
        }
        smtpTranspot.close();
    });
};

module.exports = { sendEmail };
