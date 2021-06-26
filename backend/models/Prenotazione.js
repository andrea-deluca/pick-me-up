const { config } = require("../db/config");
const { makeDb } = require("../db/dbmiddleware");
const createError = require("http-errors");
const mailModel = require("./Mail")

module.exports = {
    fetchDepositi: async function (datiPrenotazione, callback) {
        const db = await makeDb(config);
        if (datiPrenotazione.tipologiaMezzo === "auto" || datiPrenotazione.tipologiaMezzo === "moto") {
            try {
                db.collection("Deposito").findOne({}, (err, res) => {
                    if (err) return callback(500)
                    return callback({
                        status: 200,
                        depositi: res.parcheggi
                    })
                })
            } catch (error) {
                console.log(error)
                return callback(500);
            }
        } else {
            try {
                db.collection("Deposito").findOne({}, (err, res) => {
                    if (err) return callback(500)
                    return callback({
                        status: 200,
                        depositi: res.stalli
                    })
                })
            } catch (error) {
                console.log(error)
                return callback(500);
            }
        }
    }
}