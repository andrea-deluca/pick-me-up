const { config } = require("../db/config");
const tokenKey = "pick-me-up";
const { makeDb } = require("../db/dbmiddleware");
const createError = require("http-errors");
const mailModel = require("./Mail");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const password = require("secure-random-password")
const gestionePrenotazioneModel = require("./GestionePrenotazione")

module.exports = {
    registraUtente: async function (datiUtente, callback) {
        const db = await makeDb(config);
        try {
            //Controllo se esiste un account associato all'email fornita
            db.collection("Utente").findOne({
                "credenziali.email": datiUtente.credenziali.email
            }, (err, result) => {
                if (err) return (callback(500));
                // Se non esiste un account, effettuo registrazione
                if (!result) {
                    // Calcolo un hash sull'email (univoca nel DB) per settare la chiave di attivazione dell'account
                    const activatorKey = CryptoJS.SHA256(datiUtente.credenziali.email).toString();
                    const utente = {
                        nome: datiUtente.nome,
                        cognome: datiUtente.cognome,
                        dataNascita: datiUtente.dataNascita,
                        sesso: datiUtente.sesso,
                        luogoNascita: datiUtente.luogoNascita,
                        codiceFiscale: datiUtente.codiceFiscale,
                        patente: datiUtente.patente,
                        credenziali: {
                            ...datiUtente.credenziali,
                        },
                        accountStatus: {
                            activatorKey: activatorKey,
                            active: false
                        },
                        metodiPagamento: [],
                        user: datiUtente.tipologiaUtente.toUpperCase()
                    }
                    // Inserisco l'utente nel DB
                    db.collection("Utente").insertOne(utente, (err, res) => {
                        if (err) return (callback(500));
                        // invio email di conferma all'utente passando la sua chiave di attivazione e la sua email
                        mailModel.inviaConfermaRegistrazione({ "key": activatorKey, "email": datiUtente.credenziali.email })
                            .catch(err => callback(500))
                        return (callback(201))
                    })
                } else {
                    return (callback(400))
                }
            })
        } catch (error) {
            console.log(error);
            return callback(500);
        }
    },

    confermaRegistrazione: async function (activatorKey, callback) {
        const db = await makeDb(config);
        try {
            // Cerco l'account associato alla chiave di attivazione e aggiorno lo stato dell'account in attivo
            db.collection("Utente").findOneAndUpdate(
                { "accountStatus.activatorKey": activatorKey },
                { $set: { "accountStatus.activatorKey": null, "accountStatus.active": true } },
                (err, res) => {
                    if (err) return (callback(500));
                    return (callback(200))
                })
        } catch (error) {
            console.log(error)
            return callback(500);
        }
    },

    accedi: async function (credenziali, callback) {
        const db = await makeDb(config);
        try {
            // Cerco l'utente associato alla email fornita
            db.collection("Utente").findOne(
                { "credenziali.email": credenziali.email },
                (err, res) => {
                    if (err) return (callback(500));
                    // Se ho trovato un utente
                    if (res) {
                        // Controllo lo stato dell'account
                        if (!res.accountStatus.active) return callback(403);
                        const decryptedPassword = CryptoJS.AES.decrypt(res.credenziali.password, "pick-me-up").toString();
                        // Controllo la corrispondenza della password fornita
                        if (decryptedPassword !== CryptoJS.AES.decrypt(credenziali.encryptedPassword, "pick-me-up").toString()) {
                            return callback(401);
                        }
                        // Genero un token di accesso
                        const payload = { email: res.credenziali.email };
                        const token = jwt.sign(payload, tokenKey, {
                            expiresIn: "1h",
                        });
                        let datiPatente;
                        if (res.patente) {
                            datiPatente = res.patente;
                        } else {
                            datiPatente = null;
                        }

                        const datiUtente = {
                            id: res._id,
                            nome: res.nome,
                            cognome: res.cognome,
                            dataNascita: res.dataNascita,
                            sesso: res.sesso,
                            luogoNascita: {
                                ...res.luogoNascita
                            },
                            patente: datiPatente,
                            cellulare: res.credenziali.cellulare,
                            email: res.credenziali.email,
                            codiceFiscale: res.codiceFiscale,
                            metodiPagamento: res.metodiPagamento,
                            user: res.user
                        }

                        gestionePrenotazioneModel.fetchPrenotazioniUtente({ _id: res._id }, res => {
                            if (res === 500) return callback(500)
                            // Ritorno il token di accesso e i dati associati all'utente
                            return (callback({
                                token: token,
                                status: 202,
                                user: datiUtente,
                                prenotazioni: res.prenotazioni
                            }))
                        })
                    } else {
                        return callback(404);
                    }
                }
            )
        } catch (error) {
            console.log(error);
            return callback(500);
        }
    },

    recuperaPassword: async function (user, callback) {
        const db = await makeDb(config);
        try {
            // Genero un password
            const randomPassword = password.randomPassword({
                length: 12,
                characters: [
                    password.lower,
                    password.upper,
                    password.digits,
                    password.symbols
                ],
                predicate: x => x.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
            })
            // Aggiorno nel db la password associata all'utente
            const encryptedRandomPassword = CryptoJS.AES.encrypt(randomPassword, "pick-me-up").toString();
            db.collection("Utente").findOneAndUpdate(
                { "credenziali.email": user.email },
                { $set: { "credenziali.password": encryptedRandomPassword } },
                { projection: {} }, (err, res) => {
                    if (err) return callback(500)
                    if (res.value) {
                        // Invio all'utente una email contenente la nuova password
                        mailModel.inviaRecuperoPassword({ email: user.email, password: randomPassword })
                            .catch(err => callback(500))
                        return (callback(200))
                    } else {
                        return (callback(404));
                    }
                })
        } catch (error) {
            console.log(error);
            return callback(500);
        }
    },

    registraImpiegato: async function (userData, callback) {
        const db = await makeDb(config);
        try {
            //Controllo se esiste un account associato all'email fornita
            db.collection("Utente").findOne({
                "credenziali.email": userData.credenziali.email
            }, (err, result) => {
                if (err) return (callback(500));
                // Se non esiste un account, effettuo registrazione
                if (!result) {
                    const randomPassword = password.randomPassword({
                        length: 12,
                        characters: [
                            password.lower,
                            password.upper,
                            password.digits,
                            password.symbols
                        ],
                        predicate: x => x.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
                    })

                    const encryptedRandomPassword = CryptoJS.AES.encrypt(randomPassword, "pick-me-up").toString();
                    const utente = {
                        nome: userData.nome,
                        cognome: userData.cognome,
                        dataNascita: userData.dataNascita,
                        sesso: userData.sesso,
                        luogoNascita: userData.luogoNascita,
                        codiceFiscale: userData.codiceFiscale,
                        patente: userData.patente,
                        credenziali: {
                            ...userData.credenziali,
                            password: encryptedRandomPassword
                        },
                        accountStatus: {
                            activatorKey: null,
                            active: true
                        },
                        user: userData.tipologiaUtente.toUpperCase()
                    }
                    db.collection("Utente").insertOne(utente, (err, res) => {
                        if (err) return (callback(500));
                        // invio email di conferma all'utente
                        mailModel.inviaConfermaRegistrazioneImpiegato({ utente: utente, password: randomPassword })
                            .catch(err => callback(500))
                        return (callback(201))
                    })
                } else {
                    return (callback(400))
                }
            })
        } catch (error) {
            console.log(error);
            return callback(500);
        }
    }
}