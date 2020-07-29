const mailer = require("nodemailer");
require("dotenv").config();
const { purchase } = require("./purchase_template");

const getMail = (to, name, token, template, actionData) => {
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
        case "purchase":
            data = {
                from: "Waves <nghuuton@gmail.com>",
                to,
                subject: `Thanks for shopping with us ${name}`,
                html: purchase(actionData),
            };
            break;
        default:
            data;
    }

    return data;
};

const sendEmail = (to, name, token, type, actionData = null) => {
    const smtpTranspot = mailer.createTransport({
        service: "Gmail",
        auth: {
            user: "nghuuton@gmail.com",
            pass: "Tontanha123456",
        },
    });
    // console.log(actionData);
    const mail = getMail(to, name, token, type, actionData);
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
