const { config } = require("../db/config");
const { makeDb } = require("../db/dbmiddleware");
const createError = require("http-errors");
const { ObjectId } = require("mongodb");

module.exports = {
    fetchMezzi: async function (callback) {
        const db = await makeDb(config)
        try {
            db.collection("Deposito").aggregate([
                { $unwind: "$auto" },
                {
                    $lookup: {
                        from: "Veicolo",
                        localField: "auto._id",
                        foreignField: "_id",
                        as: "datiAuto"
                    }
                },
                { $unwind: "$auto.targhe" },
                {
                    $project: {
                        "nome": 1,
                        "auto.posizione": 1,
                        "auto.targhe": 1,
                        "datiAuto._id": 1,
                        "datiAuto.tipologia": 1,
                        "datiAuto.marca": 1,
                        "datiAuto.modello": 1,
                    }
                }
            ]).toArray()
                .then(res => {
                    const auto = res.map(key => {
                        return {
                            idDeposito: key._id,
                            deposito: key.nome,
                            posizione: key.auto.posizione,
                            targa: key.auto.targhe,
                            idMezzo: key.datiAuto[0]._id,
                            tipologia: key.datiAuto[0].tipologia,
                            marca: key.datiAuto[0].marca,
                            modello: key.datiAuto[0].modello
                        }
                    })
                    db.collection("Deposito").aggregate([
                        { $unwind: "$moto" },
                        {
                            $lookup: {
                                from: "Veicolo",
                                localField: "moto._id",
                                foreignField: "_id",
                                as: "datiMoto"
                            }
                        },
                        { $unwind: "$moto.targhe" },
                        {
                            $project: {
                                "nome": 1,
                                "moto.posizione": 1,
                                "moto.targhe": 1,
                                "datiMoto._id": 1,
                                "datiMoto.tipologia": 1,
                                "datiMoto.marca": 1,
                                "datiMoto.modello": 1,
                            }
                        }
                    ]).toArray()
                        .then(res => {
                            const moto = res.map(key => {
                                return {
                                    idDeposito: key._id,
                                    deposito: key.nome,
                                    posizione: key.moto.posizione,
                                    targa: key.moto.targhe,
                                    idMezzo: key.datiMoto[0]._id,
                                    tipologia: key.datiMoto[0].tipologia,
                                    marca: key.datiMoto[0].marca,
                                    modello: key.datiMoto[0].modello
                                }
                            })
                            db.collection("Deposito").aggregate([
                                { $unwind: "$bici" },
                                {
                                    $lookup: {
                                        from: "Veicolo",
                                        localField: "bici._id",
                                        foreignField: "_id",
                                        as: "datiBici"
                                    }
                                },
                                { $unwind: "$bici.targhe" },
                                {
                                    $project: {
                                        "nome": 1,
                                        "bici.posizione": 1,
                                        "bici.targhe": 1,
                                        "datiBici._id": 1,
                                        "datiBici.tipologia": 1,
                                        "datiBici.marca": 1,
                                        "datiBici.modello": 1,
                                    }
                                }
                            ]).toArray()
                                .then(res => {
                                    const bici = res.map(key => {
                                        return {
                                            idDeposito: key._id,
                                            deposito: key.nome,
                                            posizione: key.bici.posizione,
                                            targa: key.bici.targhe,
                                            idMezzo: key.datiBici[0]._id,
                                            tipologia: key.datiBici[0].tipologia,
                                            marca: key.datiBici[0].marca,
                                            modello: key.datiBici[0].modello
                                        }
                                    })
                                    db.collection("Deposito").aggregate([
                                        { $unwind: "$monopattino" },
                                        {
                                            $lookup: {
                                                from: "Veicolo",
                                                localField: "monopattino._id",
                                                foreignField: "_id",
                                                as: "datiMonopattino"
                                            }
                                        },
                                        { $unwind: "$monopattino.targhe" },
                                        {
                                            $project: {
                                                "nome": 1,
                                                "monopattino.posizione": 1,
                                                "monopattino.targhe": 1,
                                                "datiMonopattino._id": 1,
                                                "datiMonopattino.tipologia": 1,
                                                "datiMonopattino.marca": 1,
                                                "datiMonopattino.modello": 1,
                                            }
                                        }
                                    ]).toArray()
                                        .then(res => {
                                            const monopattino = res.map(key => {
                                                return {
                                                    idDeposito: key._id,
                                                    deposito: key.nome,
                                                    posizione: key.monopattino.posizione,
                                                    targa: key.monopattino.targhe,
                                                    idMezzo: key.datiMonopattino[0]._id,
                                                    tipologia: key.datiMonopattino[0].tipologia,
                                                    marca: key.datiMonopattino[0].marca,
                                                    modello: key.datiMonopattino[0].modello
                                                }
                                            })
                                            return callback({
                                                status: 200,
                                                mezzi: [
                                                    ...auto,
                                                    ...moto,
                                                    ...bici,
                                                    ...monopattino
                                                ]
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
                })
                .catch(err => {
                    return callback(500)
                })
        } catch (error) {
            console.log(error)
            return callback(500)
        }
    },

    spostaMezzo: async function (data, callback) {
        const db = await makeDb(config)
        if (data.mezzo.tipologia === "auto") {
            try {
                db.collection("Deposito").findOneAndUpdate(
                    { "_id": ObjectId(data.deposito) },
                    { $pull: { "auto.$[idMezzo].targhe": data.mezzo.targa } },
                    { arrayFilters: [{ "idMezzo._id": ObjectId(data.mezzo._id) }] },
                    (err, res) => {
                        if (err) return callback(500)
                        db.collection("Deposito").findOneAndUpdate(
                            { "_id": ObjectId(data.nuovoDeposito) },
                            { $push: { "auto.$[idMezzo].targhe": data.mezzo.targa } },
                            { arrayFilters: [{ "idMezzo._id": ObjectId(data.mezzo._id) }] },
                            (err, res) => {
                                return callback(200)
                            }
                        )
                    })
            } catch (error) {
                console.log(error)
                return callback(500)
            }
        }else if (data.mezzo.tipologia === "moto") {
            try {
                db.collection("Deposito").findOneAndUpdate(
                    { "_id": ObjectId(data.deposito) },
                    { $pull: { "moto.$[idMezzo].targhe": data.mezzo.targa } },
                    { arrayFilters: [{ "idMezzo._id": ObjectId(data.mezzo._id) }] },
                    (err, res) => {
                        if (err) return callback(500)
                        db.collection("Deposito").findOneAndUpdate(
                            { "_id": ObjectId(data.nuovoDeposito) },
                            { $push: { "moto.$[idMezzo].targhe": data.mezzo.targa } },
                            { arrayFilters: [{ "idMezzo._id": ObjectId(data.mezzo._id) }] },
                            (err, res) => {
                                return callback(200)
                            }
                        )
                    })
            } catch (error) {
                console.log(error)
                return callback(500)
            }
        }else if (data.mezzo.tipologia === "bici") {
            try {
                db.collection("Deposito").findOneAndUpdate(
                    { "_id": ObjectId(data.deposito) },
                    { $pull: { "bici.$[idMezzo].targhe": data.mezzo.targa } },
                    { arrayFilters: [{ "idMezzo._id": ObjectId(data.mezzo._id) }] },
                    (err, res) => {
                        if (err) return callback(500)
                        db.collection("Deposito").findOneAndUpdate(
                            { "_id": ObjectId(data.nuovoDeposito) },
                            { $push: { "bici.$[idMezzo].targhe": data.mezzo.targa } },
                            { arrayFilters: [{ "idMezzo._id": ObjectId(data.mezzo._id) }] },
                            (err, res) => {
                                return callback(200)
                            }
                        )
                    })
            } catch (error) {
                console.log(error)
                return callback(500)
            }
        }else if (data.mezzo.tipologia === "monopattino") {
            try {
                db.collection("Deposito").findOneAndUpdate(
                    { "_id": ObjectId(data.deposito) },
                    { $pull: { "monopattino.$[idMezzo].targhe": data.mezzo.targa } },
                    { arrayFilters: [{ "idMezzo._id": ObjectId(data.mezzo._id) }] },
                    (err, res) => {
                        if (err) return callback(500)
                        db.collection("Deposito").findOneAndUpdate(
                            { "_id": ObjectId(data.nuovoDeposito) },
                            { $push: { "monopattino.$[idMezzo].targhe": data.mezzo.targa } },
                            { arrayFilters: [{ "idMezzo._id": ObjectId(data.mezzo._id) }] },
                            (err, res) => {
                                return callback(200)
                            }
                        )
                    })
            } catch (error) {
                console.log(error)
                return callback(500)
            }
        }
        
    }
}
