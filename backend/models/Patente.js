const { config } = require("../db/config");
const { makeDb } = require("../db/dbmiddleware");
const createError = require("http-errors");
const { ObjectId } = require("mongodb");

module.exports = {
    aggiungiPatente: async function (data, callback) {
        const db = await makeDb(config);
        try {
            // Aggiorno nel db l'oggetto patente associato all'utente
            db.collection("Utente").updateOne(
                { _id: ObjectId(data.id) },
                { $set: { "patente": data.patente } },
                (err, res) => {
                    if (err) return callback(500);
                    if (res) {
                        // Ritorno la patente appena inserito
                        callback({
                            patente: data.patente,
                            status: 201
                        })
                    } else {
                        return callback(400)
                    }
                }
            )
        } catch (error) {
            console.log(error);
            return callback(500)
        }
    },

    modificaPatente: async function (data, callback) {
        const db = await makeDb(config);
        try {
            db.collection("Utente").updateOne(
                { "_id": ObjectId(data.id) },
                { $set: { "patente": data.patente } },
                (err, res) => {
                    if (err) return callback(500);
                    if (res) {
                        return callback({
                            status: 200,
                            patente: data.patente
                        })
                    } else {
                        return callback(400)
                    }
                }
            )
        } catch (error) {
            console.log(error);
            return callback(500);
        }
    },

    eliminaPatente: async function (data, callback) {
        const db = await makeDb(config);
        try {
            db.collection("Utente").updateOne(
                { "_id": ObjectId(data.id) },
                { $set: { "patente": null  } },
                (err, res) => {
                    if (err) return callback(500)
                    if (res) {
                        return callback(200);
                    } else {
                        return callback(400);
                    }
                }
            )
        } catch (error) {
            console.log(error)
            return callback(500);
        }
    }
}