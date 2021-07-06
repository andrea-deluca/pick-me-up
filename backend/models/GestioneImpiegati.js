const { config } = require("../db/config");
const { makeDb } = require("../db/dbmiddleware");
const createError = require("http-errors");
const { ObjectId } = require("mongodb");

module.exports = {
    fetchImpiegati: async function (callback) {
        const db = await makeDb(config)
        try {
            db.collection("Utente").find(
                { "user": { $ne: "CLIENTE" } },
                {
                    projection: {
                        "nome": 1,
                        "cognome": 1,
                        "credenziali.email": 1,
                        "codiceFiscale": 1,
                        "user": 1
                    }
                }
            ).toArray()
                .then(res => {
                    const impiegati = res.map(key => {
                        return {
                            _id: key._id,
                            nome: key.nome,
                            cognome: key.cognome,
                            email: key.credenziali.email,
                            codiceFiscale: key.codiceFiscale,
                            user: key.user
                        }
                    })
                    return callback({
                        status: 200,
                        impiegati: [
                            ...impiegati
                        ]
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

    cambiaRuolo: async function (data, callback) {
        const db = await makeDb(config)
        try {
            db.collection("Utente").findOneAndUpdate(
                { _id: ObjectId(data._id) },
                { $set: { "user": data.ruolo } },
                (err, res) => {
                    if(err) return callback(500)
                    return callback(200)
                }
            )
        } catch (error) {
            console.log(error)
            return callback(500)
        }
    }
}