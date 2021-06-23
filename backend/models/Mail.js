const nodemailer = require("nodemailer");

const mailConfig = {
    email: "pickmeup.bytecoders@gmail.com",
    password: "bytecoders2021!",
    site: "http://localhost:3000"
}

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: mailConfig.email,
        pass: mailConfig.password
    }
});

module.exports = {
    inviaConfermaRegistrazione: async function (userData) {
        const mailOptions = {
            from: mailConfig.email,
            to: userData.email,
            subject: "Benvenuto/a su PickMeUp!",
            html: `
                <h1>Grazie per esserti registrato su PiackMeUp!</h1>
                <h3>Conferma la tua registrazione prima di continuare</h3>
                <p>
                    Clicca sul link sotto per confermare la tua registrazione a PickMeUp! e verificare la tua email.
                </p>
                <a id="${userData.key}" href="http://localhost:9000/autenticazione/confermaRegistrazione/${userData.key}">Conferma registarzione</a>
            `
        };
        await transporter.sendMail(mailOptions);
    },

    inviaRecuperoPassword: async function(userData){
        const mailOptions = {
            from: mailConfig.email,
            to: userData.email,
            subject: "Recupero password PickMeUp!",
            html: `
            <h1>Recupero password</h1>
            <h3>Abbiamo generato una password per te!</h3>
            <p>
                Abbiamo ricevuto una richiesta di recupero password da parte tua e ne è stata una generata una dal sistema per te.
                Utilizza la passoword sotto per accedere e ricordati di cambiarla al primo accesso.
            </p>
            <p>
                La tua nuova passoword: ${userData.password}
            </p>
            <p>
                Cordiali saluti dal team PickMeUp! | Gruppo Bytecoders.
            </p>
        `
        };
        await transporter.sendMail(mailOptions);
    }
}