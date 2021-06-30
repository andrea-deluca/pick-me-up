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
                <h1>Grazie per esserti registrato/a su PickMeUp!</h1>
                <h3>Conferma la tua registrazione prima di continuare</h3>
                <p>
                    Clicca sul link sotto per confermare la tua registrazione a PickMeUp! e verificare la tua email.
                </p>
                <a id="${userData.key}" href="http://localhost:9000/autenticazione/confermaRegistrazione/${userData.key}">Conferma registrazione</a>
            `
        };
        await transporter.sendMail(mailOptions);
    },

    inviaRecuperoPassword: async function (userData) {
        const mailOptions = {
            from: mailConfig.email,
            to: userData.email,
            subject: "Recupero password PickMeUp!",
            html: `
            <h1>Recupero password</h1>
            <h3>Abbiamo generato una password per te!</h3>
            <p>
                Abbiamo ricevuto una richiesta di recupero password da parte tua e ne è stata generata una dal sistema per te.
                Utilizza la password sotto per accedere e ricordati di cambiarla al primo accesso.
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
    },

    inviaConfermaPrenotazione: async function (data) {
        const mailOptions = {
            from: mailConfig.email,
            to: data.email,
            subject: `Conferma prenotazione #${data.prenotazione}`,
            html: `
            <h1>Grazie per la tua prenotazione</h1>
            <h3>Abbiamo ricevuto una prenotazione da parte tua!</h3>
            <p>
                Grazie per aver prenotato un noleggio. In allegato troverai la conferma e la fattura della tua prenotazione.
            </p>
            <p>
                Cordiali saluti dal team PickMeUp! | Gruppo Bytecoders.
            </p>
        `,
            attachments: [{
                filename: `${data.prenotazione}.pdf`,
                path: `public/pdf/${data.prenotazione}.pdf`,
                contentType: "application/pdf"
            }]
        };
        await transporter.sendMail(mailOptions);
    },

    inviaAnnullaPrenotazione: async function (data) {
        const mailOptions = {
            from: mailConfig.email,
            to: data.email,
            subject: `Annullamento prenotazione #${data.prenotazione}`,
            html: `
            <h1>Prenotazione annullata con successo</h1>
            <h3>Ci dispiace vederti disdire una prenotazione...</h3>
            <p>
                Come richiesto abbiamo annullato la prenotazione ed è stato effettuato il rimborso
                dell'intero importo precedentemente pagato sul metodo di pagamento associato alla prenotazione.
                In allegato troverai la conferma di annullamento e la fattura del rimborso della tua prenotazione.
            </p>
            <p>
                Cordiali saluti dal team PickMeUp! | Gruppo Bytecoders.
            </p>
        `,
            attachments: [{
                filename: `${data.prenotazione}.pdf`,
                path: `public/pdf/${data.prenotazione}.pdf`,
                contentType: "application/pdf"
            }]
        };
        await transporter.sendMail(mailOptions);
    },

    inviaModificaPrenotazione: async function (data) {
        const mailOptions = {
            from: mailConfig.email,
            to: data.email,
            subject: `Modifica prenotazione #${data.prenotazione}`,
            html: `
            <h1>Prenotazione modificata con successo</h1>
            <h3>Abbiamo ricevuta una richiesta di modifica</h3>
            <p>
                Come richiesto abbiamo modificato la prenotazione. In allegato troverai
                la conferma delle modifiche apportate, la fattura e i dettagli del pagamento effettuato.
            </p>
            <p>
                Cordiali saluti dal team PickMeUp! | Gruppo Bytecoders.
            </p>
        `,
            attachments: [{
                filename: `${data.prenotazione}.pdf`,
                path: `public/pdf/${data.prenotazione}.pdf`,
                contentType: "application/pdf"
            }]
        };
        await transporter.sendMail(mailOptions);
    }
}