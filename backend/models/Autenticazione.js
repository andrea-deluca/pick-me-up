const { config } = require("../db/config");
const tokenKey = "pick-me-up";
const { makeDb } = require("../db/dbmiddleware");
const createError = require("http-errors");
let mailModel = require("../models/Mail");
const { ObjectId, ObjectID } = require("mongodb");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

module.exports = {
    registraUtente: async function (datiUtente, callback) {
        const db = await makeDb(config);
        try {
            //Controllo se esiste un account associato all'email fornita
            db.collection("Utente").findOne({
                "credenziali.email": datiUtente.credenziali.email
            }, (err, result) => {
                if (err) throw createError(500);
                // Se non esiste un account, effettuo registrazione
                if (!result) {
                    // Calcolo un hash sull'email (univoca nel DB) per settare la chiave di attivazione dell'account
                    const activatorKey = CryptoJS.SHA256(datiUtente.credenziali.email).toString();
                    // Inserisco l'utente nel DB
                    db.collection("Utente").insertOne({
                        ...datiUtente, accountStatus: { activatorKey: activatorKey, active: false }
                    }, (err, res) => {
                        if (err) throw createError(500);
                        // invio email di conferma all'utente passando la sua chiave di attivazione e la sua email
                        mailModel.inviaConfermaRegistrazione({ "key": activatorKey, "email": datiUtente.credenziali.email })
                            .catch(err => { throw createError(500) })
                        return (callback(201))
                    })
                } else {
                    return (callback(400))
                }
            })
        } catch (error) {
            console.log(error);
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
                    if (err) throw createError(500);
                    return (callback(202))
                })
        } catch (error) {
            console.log(error)
        }
    },

    accedi: async function (credenziali, callback) {
        const db = await makeDb(config);
        try {
            // Cerco l'utente associato alla email fornita
            db.collection("Utente").findOne(
                { "credenziali.email": credenziali.email },
                (err, res) => {
                    if (err) throw createError(500);
                    // Se ho trovato un utente 
                    if (res) {
                        // Controllo lo stato dell'account
                        if (!res.accountStatus.active) throw createError(400);
                        const decryptedPassword = CryptoJS.AES.decrypt(res.credenziali.password, "pick-me-up").toString();
                        // Controllo la corrispondenza della password fornita
                        if (decryptedPassword !== CryptoJS.AES.decrypt(credenziali.encryptedPassword, "pick-me-up").toString()) {
                            throw createError(400);
                        }
                        const payload = {email: res.credenziali.email};
                        const token = jwt.sign(payload, tokenKey, {
                            expiresIn: "1h",
                        });
                        return (callback({
                            utente: {
                                token: token,
                                nome: res.nome,
                                cognome: res.cognome,
                                dataNascita: res.dataNascita,
                                sesso: res.sesso,
                                luogoNascita: {
                                    ...res.luogoNascita
                                },
                                patente: {
                                    ...res.patente
                                },
                                cellulare: res.credenziali.cellulare,
                                email: res.credenziali.email,
                            },
                            code: 202,
                        }))
                    } else {
                        throw createError(404);
                    }
                }
            )
        } catch (error) {
            console.log(error)
        }
    }
}