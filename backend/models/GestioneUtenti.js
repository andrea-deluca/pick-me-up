const { config } = require("../db/config");
const { makeDb } = require("../db/dbmiddleware");
const createError = require("http-errors");
const { ObjectId } = require("mongodb");

module.exports = {
    fetchUtenti: async function (callback) {
        const db = await makeDb(config)
        try {
            db.collection("Utente").find(
                {},
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
                    const utenti = res.map(key => {
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
                        utenti: [
                            ...utenti
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
}