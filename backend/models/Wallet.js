const { config } = require("../db/config");
const { makeDb } = require("../db/dbmiddleware");
const createError = require("http-errors");
const { ObjectId } = require("mongodb");

module.exports = {
    aggiungiCarta: async function (data, callback) {
        const db = await makeDb(config);
        // Genero un id da associare al metodo di pagamento da inserire
        const metodoPagamento = {
            ...data.metodoPagamento,
            id: new ObjectId()
        }
        try {
            // Aggiorno nel db l'array dei metodi di pagamento associato all'utente, inserendo un nuovo oggetto
            db.collection("Utente").updateOne(
                { _id: ObjectId(data.id) },
                { $push: { "metodiPagamento": metodoPagamento } },
                (err, res) => {
                    if (err) return callback(500);
                    if (res) {
                        // Ritorno il metodo di pagamento appena inserito (incluso l'id)
                        callback({
                            carta: metodoPagamento,
                            code: 201
                        })
                    } else {
                        return callback(400)
                    }
                }
            )
        } catch (error) {
            console.log(error)
        }
    },

    eliminaCarta: async function (data, callback) {
        const db = await makeDb(config);
        try {
            // Aggiorno nel db l; array dei metodi di pagamento associato all'utente,
            //rimuovendo l'oggetto che ha l'id passato
            db.collection("Utente").updateOne(
                { "_id": ObjectId(data.id) },
                { $pull: { "metodiPagamento": { id: ObjectId(data.idCarta) } } },
                (err, res) => {
                    if (err) return callback(500)
                    if (res) {
                        // Cerco nel db l'array dei metodi di pagamento associato all'utente
                        db.collection("Utente").findOne(
                            { "_id": ObjectId(data.id) },
                            { projecton: { "metodiPagamento": 1 } },
                            (err, res) => {
                                // Ritorno l'array dei metodi di pagamento aggiornato
                                callback({
                                    code: 200,
                                    metodiPagamento: res.metodiPagamento
                                })
                            }
                        )
                    }
                }
            )
        } catch (error) {
            console.log(error)
        }
    }
}