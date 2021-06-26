const { config } = require("../db/config");
const { makeDb } = require("../db/dbmiddleware");
const createError = require("http-errors");
const mailModel = require("./Mail")
const { ObjectId } = require("mongodb");

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
    },

    fetchVeicoliDisponibili: async function (datiPrenotazione, callback) {
        const db = await makeDb(config);
        if (datiPrenotazione.tipologiaMezzo === "auto" || datiPrenotazione.tipologiaMezzo === "moto") {
            try {
                const res = db.collection("Deposito").findOne(
                    { "parcheggi.id": ObjectId(datiPrenotazione.ritiro.localita) },
                    { projection: { "parcheggi.$": 1 } },
                    (err, res) => {
                        if (err) return (500)
                        if (datiPrenotazione.tipologiaMezzo === "auto") {
                            return callback({
                                status: 200,
                                veicoli: res.parcheggi[0].auto
                            })
                        } else {
                            return callback({
                                status: 200,
                                veicoli: res.parcheggi[0].moto
                            })
                        }
                    }
                )

            } catch (error) {
                console.log(error)
                callback(500)
            }
        } else {

        }
    }
}