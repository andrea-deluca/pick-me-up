const { config } = require("../db/config");
const { makeDb } = require("../db/dbmiddleware");
const createError = require("http-errors");
const { ObjectId } = require("mongodb");

module.exports = {
    inviaNotificaPrenotazioneAutista: async function (data) {
        const db = await makeDb(config)

        const notifica = {
            title: `C'è bisogno di un autista!`,
            message: `Una nuova prenotazione è stata associata al tuo account. Accedi alle tue corse per accettare o rifiutare la corsa.`,
            user: data.id,
            data: new Date()
        }

        try {
            db.collection("Notifiche").insertOne(notifica)
        } catch (error) {
            console.log(error)
        }
    },

    fetchNotificheUtente: async function (data, callback) {
        const db = await makeDb(config)
        try {
            db.collection("Notifiche").find(
                { user: ObjectId(data.id) }
            ).toArray().then(res => {
                if(res.length === 0) return callback(404)
                return callback({
                    status: 200,
                    notifiche: res
                })
            }).catch(err => {
                return callback(500)
            })
        } catch (error) {
            console.log(error)
            return callback(500)
        }
    }
}

