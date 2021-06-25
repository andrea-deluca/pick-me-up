const { config } = require("../db/config");
const { makeDb } = require("../db/dbmiddleware");
const createError = require("http-errors");
const { ObjectId } = require("mongodb");
const CryptoJS = require("crypto-js");

module.exports = {
    modificaCellulare: async function (user, callback) {
        const db = await makeDb(config);
        try {
            // Aggiorno nel db il numero di cellulare associato all'utente
            db.collection("Utente").findOneAndUpdate(
                { _id: ObjectId(user.id) },
                { $set: { "credenziali.cellulare": user.cellulare } },
                { returnOriginal: false, projection: { "credenziali.cellulare": 1 }, }, (err, res) => {
                    if (err) return (callback(500));
                    if (res.value) {
                        // Ritorno il nuovo numero di cellulare
                        return (callback({
                            status: 200,
                            cellulare: res.value.credenziali.cellulare
                        }));
                    } else {
                        return (callback(404))
                    }
                });
        } catch (error) {
            console.log(error);
            return callback(500);
        }
    },

    modificaEmail: async function (user, callback) {
        const db = await makeDb(config);
        try {
            // Aggiorno nel db l'email associata all'utente
            db.collection("Utente").findOneAndUpdate(
                { _id: ObjectId(user.id) },
                { $set: { "credenziali.email": user.email } },
                { returnOriginal: false, projection: { "credenziali.email": 1 }, }, (err, res) => {
                    if (err) return (callback(500));
                    if (res.value) {
                        // Ritorno la nuova email
                        return (callback({
                            status: 200,
                            email: res.value.credenziali.email
                        }));
                    } else {
                        return (callback(404))
                    }
                });
        } catch (error) {
            console.log(error);
            return callback(500);
        }
    },

    modificaPassword: async function (user, callback) {
        const db = await makeDb(config);
        try {
            // Cerco nel db la passoword associata all'utente
            db.collection("Utente").findOne(
                { _id: ObjectId(user.id) },
                { projection: { "credenziali.password": 1 } }, (err, res) => {
                    if (err) return callback(500);
                    // Confronto la password passata dall'utente con quella memorizzata nel db
                    const encryptedPasswordDb = res.credenziali.password;
                    const decryptedPasswordDb = CryptoJS.AES.decrypt(encryptedPasswordDb, "pick-me-up").toString();
                    const decryptedPassword = CryptoJS.AES.decrypt(user.vecchiaPassword, "pick-me-up").toString()
                    if (decryptedPassword === decryptedPasswordDb) {
                        // Se la password passata coincide, aggiorno nel db la password
                        db.collection("Utente").findOneAndUpdate(
                            { "_id": ObjectId(user.id) },
                            { $set: { "credenziali.password": user.nuovaPassword } }, (err, res) => {
                                if (err) return (callback(500));
                                if (res.value) {
                                    return (callback(200));
                                } else {
                                    return (callback(400));
                                }
                            });
                    } else return callback(403)
                })
        } catch (error) {
            console.log(error)
            return callback(500)
        }
    },

    eliminaAccount: async function (user, callback) {
        const db = await makeDb(config);
        try {
            db.collection("Utente").deleteOne(
                { _id: ObjectId(user.id) }, (err, res) => {
                    if (err) return callback(500)
                    return callback(200)
                })
        } catch (error) {
            console.log(error)
            return callback(500)
        }
    }
}