const { config } = require("../db/config");
const { makeDb } = require("../db/dbmiddleware");
const createError = require("http-errors");
const { ObjectId } = require("mongodb");

module.exports = {
    aggiungiCarta: async function (data, callback) {
        const db = await makeDb(config);
        try {
            db.collection("Utente").updateOne(
                { _id: ObjectId(data.id) },
                { $push: { "metodiPagamento": data.metodoPagamento } },
                 (err, res) => {
                    if(err) return callback(500);
                    if(res){
                        callback({
                            carta: data.metodoPagamento,
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
    }
}