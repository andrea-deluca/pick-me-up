const { config } = require("../db/config");
const { makeDb } = require("../db/dbmiddleware");
const createError = require("http-errors");
const mailModel = require("./Mail")
const pagamentoModel = require("./Pagamento")
const { ObjectId } = require("mongodb");

module.exports = {
    fetchPrenotazioniUtente: async function (utente, callback) {
        const db = await makeDb(config)
        try {
            db.collection("Prenotazione").aggregate([
                { $match: { idUtente: ObjectId(utente._id) } },
                { $match: { stato: "ATTIVA" } }
            ]).toArray()
                .then(res => {
                    const prenotazioniAttive = res;
                    db.collection("Prenotazione").aggregate([
                        { $match: { idUtente: ObjectId(utente._id) } },
                        { $match: { stato: "PROGRAMMATA" } }
                    ]).toArray()
                        .then(res => {
                            const prenotazioniProg = res;
                            db.collection("Prenotazione").aggregate([
                                { $match: { idUtente: ObjectId(utente._id) } },
                                { $match: { stato: "PASSATA" } }
                            ]).toArray()
                                .then(res => {
                                    const prenotazioniPassate = res
                                    return callback({
                                        status: 200,
                                        prenotazioni: {
                                            attive: prenotazioniAttive,
                                            programmate: prenotazioniProg,
                                            passate: prenotazioniPassate
                                        }
                                    })
                                })
                                .catch(err => {
                                    return callback(500)
                                })
                        })
                        .catch(err => {
                            return callback(500)
                        })
                })
                .catch(err => {
                    return callback(500)
                })
        } catch (error) {
            console.log(error)
            return callback(500)
        }
    }
}