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
        switch (datiPrenotazione.tipologiaMezzo) {
            case "auto":
                try {
                    db.collection("Deposito").aggregate([
                        { $unwind: "$parcheggi" },
                        { $match: { "parcheggi._id": ObjectId(datiPrenotazione.ritiro.localita) } },
                        { $unset: ["_id", "stalli", "parcheggi.moto"] },
                        { $unwind: "$parcheggi.auto" },
                        {
                            $lookup: {
                                from: "Veicolo",
                                let: {
                                    autoId: "$parcheggi.auto._id"
                                },
                                pipeline: [
                                    { $unset: ["_id", "moto", "bicicletta", "monopattino"] },
                                    { $unwind: "$auto" },
                                    { $match: { $expr: { $eq: ["$auto._id", "$$autoId"] } } },
                                ],
                                as: "parcheggi.auto.datiAuto"
                            }
                        },
                        {
                            $group: {
                                "_id": "$parcheggi._id",
                                autoArray: {
                                    $push: {
                                        auto: "$parcheggi.auto.datiAuto.auto"
                                    }
                                }
                            }
                        }
                    ]).toArray().then(res => {
                        const veicoli = res[0].autoArray.map(key => {
                            return key.auto[0]
                        });
                        return callback({
                            status: 200,
                            veicoli: veicoli
                        })
                    })
                } catch (error) {
                    console.log(error)
                    callback(500)
                }
            case "moto":
                try {
                    db.collection("Deposito").aggregate([
                        { $unwind: "$parcheggi" },
                        { $match: { "parcheggi._id": ObjectId(datiPrenotazione.ritiro.localita) } },
                        { $unset: ["_id", "stalli", "parcheggi.auto"] },
                        { $unwind: "$parcheggi.moto" },
                        {
                            $lookup: {
                                from: "Veicolo",
                                let: {
                                    motoId: "$parcheggi.moto._id"
                                },
                                pipeline: [
                                    { $unset: ["_id", "auto", "bicicletta", "monopattino"] },
                                    { $unwind: "$moto" },
                                    { $match: { $expr: { $eq: ["$moto._id", "$$motoId"] } } },
                                ],
                                as: "parcheggi.moto.datiMoto"
                            }
                        },
                        {
                            $group: {
                                "_id": "$parcheggi._id",
                                motoArray: {
                                    $push: {
                                        moto: "$parcheggi.moto.datiMoto.moto"
                                    }
                                }
                            }
                        }
                    ]).toArray().then(res => {
                        const veicoli = res[0].motoArray.map(key => {
                            return key.moto[0]
                        });
                        return callback({
                            status: 200,
                            veicoli: veicoli
                        })
                    })
                } catch (error) {
                    console.log(error)
                    callback(500)
                }
            case "bici":
                try {
                    db.collection("Deposito").aggregate([
                        { $unwind: "$stalli" },
                        { $match: { "stalli._id": ObjectId(datiPrenotazione.ritiro.localita) } },
                        { $unset: ["_id", "parcheggi", "stalli.monopattino"] },
                        { $unwind: "$stalli.bici" },
                        {
                            $lookup: {
                                from: "Veicolo",
                                let: {
                                    biciId: "$stalli.bici._id"
                                },
                                pipeline: [
                                    { $unset: ["_id", "auto", "moto", "monopattino"] },
                                    { $unwind: "$bicicletta" },
                                    { $match: { $expr: { $eq: ["$bicicletta._id", "$$biciId"] } } },
                                ],
                                as: "stalli.bici.datiBici"
                            }
                        },
                        {
                            $group: {
                                "_id": "$stalli._id",
                                biciArray: {
                                    $push: {
                                        bici: "$stalli.bici.datiBici.bicicletta"
                                    }
                                }
                            }
                        }
                    ]).toArray().then(res => {
                        const veicoli = res[0].biciArray.map(key => {
                            return key.bici[0]
                        });
                        return callback({
                            status: 200,
                            veicoli: veicoli
                        })
                    })
                } catch (error) {
                    console.log(error)
                    callback(500)
                }
            case "monopattino":
                try {
                    db.collection("Deposito").aggregate([
                        { $unwind: "$stalli" },
                        { $match: { "stalli._id": ObjectId(datiPrenotazione.ritiro.localita) } },
                        { $unset: ["_id", "parcheggi", "stalli.bici"] },
                        { $unwind: "$stalli.monopattino" },
                        {
                            $lookup: {
                                from: "Veicolo",
                                let: {
                                    monopattinoId: "$stalli.monopattino._id"
                                },
                                pipeline: [
                                    { $unset: ["_id", "auto", "moto", "bicicletta"] },
                                    { $unwind: "$monopattino" },
                                    { $match: { $expr: { $eq: ["$monopattino._id", "$$monopattinoId"] } } },
                                ],
                                as: "stalli.monopattino.datiMonopattino"
                            }
                        },
                        {
                            $group: {
                                "_id": "$stalli._id",
                                monopattinoArray: {
                                    $push: {
                                        monopattino: "$stalli.monopattino.datiMonopattino.monopattino"
                                    }
                                }
                            }
                        }
                    ]).toArray().then(res => {
                        const veicoli = res[0].monopattinoArray.map(key => {
                            return key.monopattino[0]
                        });
                        return callback({
                            status: 200,
                            veicoli: veicoli
                        })
                    })
                } catch (error) {
                    console.log(error)
                    callback(500)
                }
        }
    }
}