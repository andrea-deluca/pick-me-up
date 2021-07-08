const { config } = require("../db/config");
const { makeDb } = require("../db/dbmiddleware");
const createError = require("http-errors");
const { ObjectId, ObjectID } = require("mongodb");

module.exports = {
    fetchPrenotazioniAutista: async function (data, callback) {
        const db = await makeDb(config)
        try {
            db.collection("Prenotazione").aggregate([
                { $match: { autista: ObjectId(data.id) } },
                {
                    $match: {
                        $or: [
                            { stato: "ATTIVA" },
                            { stato: "IN PREPARAZIONE" },
                            { stato: "INIZIATA" }
                        ]
                    }
                }
            ]).toArray()
                .then(res => {
                    const prenotazioniAttive = res;
                    db.collection("Prenotazione").aggregate([
                        { $match: { autista: ObjectId(data.id) } },
                        { $match: { stato: "PROGRAMMATA" } }
                    ]).toArray()
                        .then(res => {
                            const prenotazioniProg = res;
                            db.collection("Prenotazione").aggregate([
                                { $match: { autista: ObjectId(data.id) } },
                                { $match: { stato: "TERMINATA" } }
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
    },

    accettaCorsa: async function (data, callback) {
        const db = await makeDb(config)
        try {
            db.collection("Prenotazione").findOneAndUpdate(
                { _id: ObjectId(data.id) },
                { $set: { stato: "PROGRAMMATA" } },
                (err, res) => {
                    if (err) return callback(500)
                    return callback(200)
                }
            )
        } catch (error) {
            console.log(error)
            return callback(500)
        }
    },

    rifiutaCorsa: async function (data, callback) {
        const db = await makeDb(config)
        try {
            db.collection("Prenotazione").findOne(
                { "_id": ObjectId(data.id) },
                (err, res) => {
                    if (err) return callback(500)
                    const prenotazione = res;
                    db.collection("Utente").find(
                        { "user": "AUTISTA" },
                        { projection: { "_id": 1 } }
                    ).toArray()
                        .then(res => {
                            const autisti = res.map(key => {
                                return key._id
                            })
                            db.collection("Prenotazione").aggregate([
                                {
                                    $match: {
                                        $and: [
                                            { "ritiro.data": { $lte: new Date(prenotazione.consegna.data) } },
                                            { "consegna.data": { $gte: new Date(prenotazione.ritiro.data) } }
                                        ]
                                    }
                                },
                                { $match: { "autista": { $in: autisti } } },
                                { $project: { "_id": 0, "autista": 1 } }
                            ]).toArray()
                                .then(res => {
                                    const autistiImpegnati = res.map(key => {
                                        return ObjectId(key.autista).toString()
                                    })
                                    const autistiDisponibili = autisti.filter(element => {
                                        return !autistiImpegnati.includes(ObjectId(element).toString())
                                    })
                                    if (autistiDisponibili.length === 0) {
                                        return callback(500)
                                        // INVIARE ANNULLA PRENOTAZIONE
                                    } else {
                                        db.collection("Prenotazione").findOneAndUpdate(
                                            { _id: ObjectId(prenotazione._id) },
                                            { $set: { "autista": autistiDisponibili[0] } },
                                            (err, res) => {
                                                if (err) return callback(500)
                                                return callback(200)
                                            }
                                        )
                                    }
                                })
                                .catch(err => {
                                    return callback(500)
                                })
                        })
                        .catch(err => {
                            return callback(500)
                        })
                })
        } catch (error) {
            console.log(error)
            return callback(500)
        }
    }
}