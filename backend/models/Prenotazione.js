const { config } = require("../db/config");
const { makeDb } = require("../db/dbmiddleware");
const createError = require("http-errors");
const mailModel = require("./Mail")
const pagamentoModel = require("./Pagamento")
const { ObjectId } = require("mongodb");
const gestionePrenotazioneModel = require("./GestionePrenotazione")
const timerModel = require("./Timer")

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

        if (datiPrenotazione.tipologiaMezzo === "auto") {
            try {
                db.collection("Deposito").aggregate([
                    { $unwind: "$parcheggi" },
                    { $match: { "parcheggi._id": ObjectId(datiPrenotazione.ritiro.localita) } },
                    { $unset: ["_id", "stalli", "parcheggi.moto"] },
                    { $unwind: "$parcheggi.auto" },
                    {
                        $lookup: {
                            from: "Veicolo",
                            let: { autoId: "$parcheggi.auto._id" },
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
                                    auto: "$parcheggi.auto.datiAuto.auto",
                                    targhe: "$parcheggi.auto.targhe"
                                }
                            }
                        }
                    }
                ]).toArray()
                    .then(res => {
                        const veicoli = res[0].autoArray.map(key => {
                            return { mezzo: key.auto[0], code: key.targhe }
                        });
                        db.collection("Prenotazione").aggregate([
                            {
                                $match:
                                {
                                    $and: [
                                        { "ritiro.data": { $lte: new Date(datiPrenotazione.consegna.data) } },
                                        { "consegna.data": { $gte: new Date(datiPrenotazione.ritiro.data) } }
                                    ]
                                }
                            },
                            { $project: { _id: 0, "mezzo.idMezzo": 1, "mezzo.code": 1 } }
                        ]).toArray()
                            .then(res => {
                                const targhePrenotazioni = res.map(key => {
                                    return key.mezzo.code
                                })
                                veicoli.map((key) => {
                                    key.code.map((value, index, arr) => {
                                        targhePrenotazioni.forEach(element => {
                                            let i = index
                                            if (element === arr[i]) {
                                                arr.splice(i, 1)
                                                i--
                                            }
                                        })
                                    })
                                })
                                const veicoliDisponibili = veicoli.filter((value, index, arr) => {
                                    return value.code.length !== 0
                                })
                                if (veicoliDisponibili.length === 0) return callback(404)

                                return callback({
                                    status: 200,
                                    veicoli: veicoliDisponibili
                                })
                            })
                    })
                    .catch(err => {
                        return callback(500)
                    })
            } catch (error) {
                console.log(error)
                callback(500)
            }
        } else if (datiPrenotazione.tipologiaMezzo === "moto") {
            try {
                db.collection("Deposito").aggregate([
                    { $unwind: "$parcheggi" },
                    { $match: { "parcheggi._id": ObjectId(datiPrenotazione.ritiro.localita) } },
                    { $unset: ["_id", "stalli", "parcheggi.auto"] },
                    { $unwind: "$parcheggi.moto" },
                    {
                        $lookup: {
                            from: "Veicolo",
                            let: { motoId: "$parcheggi.moto._id" },
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
                                    moto: "$parcheggi.moto.datiMoto.moto",
                                    targhe: "$parcheggi.moto.targhe"
                                }
                            }
                        }
                    }
                ]).toArray()
                    .then(res => {
                        const veicoli = res[0].motoArray.map(key => {
                            return { mezzo: key.moto[0], code: key.targhe }
                        });
                        db.collection("Prenotazione").aggregate([
                            {
                                $match:
                                {
                                    $and: [
                                        { "ritiro.data": { $lte: new Date(datiPrenotazione.consegna.data) } },
                                        { "consegna.data": { $gte: new Date(datiPrenotazione.ritiro.data) } }
                                    ]
                                }
                            },
                            { $project: { _id: 0, "mezzo.idMezzo": 1, "mezzo.code": 1 } }
                        ]).toArray()
                            .then(res => {
                                const targhePrenotazioni = res.map(key => {
                                    return key.mezzo.code
                                })
                                veicoli.map((key) => {
                                    key.code.map((value, index, arr) => {
                                        targhePrenotazioni.forEach(element => {
                                            let i = index
                                            if (element === arr[i]) {
                                                arr.splice(i, 1)
                                                i--
                                            }
                                        })
                                    })
                                })
                                const veicoliDisponibili = veicoli.filter((value, index, arr) => {
                                    return value.code.length !== 0
                                })
                                if (veicoliDisponibili.length === 0) return callback(404)

                                return callback({
                                    status: 200,
                                    veicoli: veicoliDisponibili
                                })
                            })
                    })
                    .catch(err => {
                        return callback(500)
                    })
            } catch (error) {
                console.log(error)
                callback(500)
            }
        } else if (datiPrenotazione.tipologiaMezzo === "bici") {
            try {
                db.collection("Deposito").aggregate([
                    { $unwind: "$stalli" },
                    { $match: { "stalli._id": ObjectId(datiPrenotazione.ritiro.localita) } },
                    { $unset: ["_id", "parcheggi", "stalli.monopattino"] },
                    { $unwind: "$stalli.bici" },
                    {
                        $lookup: {
                            from: "Veicolo",
                            let: { biciId: "$stalli.bici._id" },
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
                                    bici: "$stalli.bici.datiBici.bicicletta",
                                    codici: "$stalli.bici.codice"
                                }
                            }
                        }
                    }
                ]).toArray()
                    .then(res => {
                        const veicoli = res[0].biciArray.map(key => {
                            return { mezzo: key.bici[0], code: key.codici }
                        });
                        db.collection("Prenotazione").aggregate([
                            {
                                $match:
                                {
                                    $and: [
                                        { "ritiro.data": { $lte: new Date(datiPrenotazione.consegna.data) } },
                                        { "consegna.data": { $gte: new Date(datiPrenotazione.ritiro.data) } }
                                    ]
                                }
                            },
                            { $project: { _id: 0, "mezzo.idMezzo": 1, "mezzo.code": 1 } }
                        ]).toArray()
                            .then(res => {
                                const codiciPrenotazione = res.map(key => {
                                    return key.mezzo.code
                                })
                                veicoli.map((key) => {
                                    key.code.map((value, index, arr) => {
                                        codiciPrenotazione.forEach(element => {
                                            let i = index
                                            if (element === arr[i]) {
                                                arr.splice(i, 1)
                                                i--
                                            }
                                        })
                                    })
                                })
                                const veicoliDisponibili = veicoli.filter((value, index, arr) => {
                                    return value.code.length !== 0
                                })
                                if (veicoliDisponibili.length === 0) return callback(404)

                                return callback({
                                    status: 200,
                                    veicoli: veicoliDisponibili
                                })
                            })
                    })
                    .catch(err => {
                        return callback(500)
                    })
            } catch (error) {
                console.log(error)
                callback(500)
            }
        } else {
            try {
                db.collection("Deposito").aggregate([
                    { $unwind: "$stalli" },
                    { $match: { "stalli._id": ObjectId(datiPrenotazione.ritiro.localita) } },
                    { $unset: ["_id", "parcheggi", "stalli.bici"] },
                    { $unwind: "$stalli.monopattino" },
                    {
                        $lookup: {
                            from: "Veicolo",
                            let: { monopattinoId: "$stalli.monopattino._id" },
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
                                    monopattino: "$stalli.monopattino.datiMonopattino.monopattino",
                                    codici: "$stalli.monopattino.codice"
                                }
                            }
                        }
                    }
                ]).toArray()
                    .then(res => {
                        const veicoli = res[0].monopattinoArray.map(key => {
                            return { mezzo: key.monopattino[0], code: key.codici }
                        });
                        db.collection("Prenotazione").aggregate([
                            {
                                $match:
                                {
                                    $and: [
                                        { "ritiro.data": { $lte: new Date(datiPrenotazione.consegna.data) } },
                                        { "consegna.data": { $gte: new Date(datiPrenotazione.ritiro.data) } }
                                    ]
                                }
                            },
                            { $project: { _id: 0, "mezzo.idMezzo": 1, "mezzo.code": 1 } }
                        ]).toArray()
                            .then(res => {
                                const codiciPrenotazione = res.map(key => {
                                    return key.mezzo.code
                                })
                                veicoli.map((key) => {
                                    key.code.map((value, index, arr) => {
                                        codiciPrenotazione.forEach(element => {
                                            let i = index
                                            if (element === arr[i]) {
                                                arr.splice(i, 1)
                                                i--
                                            }
                                        })
                                    })
                                })
                                const veicoliDisponibili = veicoli.filter((value, index, arr) => {
                                    return value.code.length !== 0
                                })
                                if (veicoliDisponibili.length === 0) return callback(404)

                                return callback({
                                    status: 200,
                                    veicoli: veicoliDisponibili
                                })
                            })
                    })
                    .catch(err => {
                        return callback(500)
                    })
            } catch (error) {
                console.log(error)
                callback(500)
            }
        }
    },

    confermaPrenotazione: async function (datiPrenotazione, callback) {
        const db = await makeDb(config);
        const prenotazione = {
            _id: new ObjectId(),
            dataPrenotazione: new Date(),
            ritiro: {
                idRitiro: ObjectId(datiPrenotazione.ritiro.localita),
                nome: datiPrenotazione.ritiro.nome,
                data: new Date(datiPrenotazione.ritiro.data),
            },
            consegna: {
                idConsegna: ObjectId(datiPrenotazione.consegna.localita),
                nome: datiPrenotazione.consegna.nome,
                data: new Date(datiPrenotazione.consegna.data),
            },
            mezzo: {
                ...datiPrenotazione.mezzo,
                idMezzo: ObjectId(datiPrenotazione.mezzo.idMezzo),
                tipologia: datiPrenotazione.tipologiaMezzo,
                code: datiPrenotazione.mezzo.code[0]
            },
            pagamento: {
                idMetodoPagamento: ObjectId(datiPrenotazione.metodoPagamento),
                importoTotale: datiPrenotazione.totale
            },
            autista: datiPrenotazione.autista,
            stato: "PROGRAMMATA",
            idUtente: ObjectId(datiPrenotazione.idUtente),
        }
        try {

            db.collection("Utente").aggregate([
                { $match: { "_id": prenotazione.idUtente } },
                { $unset: ["credenziali.password", "accountStatus"] },
                { $unwind: "$metodiPagamento" },
                { $match: { "metodiPagamento._id": prenotazione.pagamento.idMetodoPagamento } }])
                .toArray()
                .then(res => {
                    pagamentoModel.generaConfermaPrenotazione({ prenotazione: prenotazione, utente: res[0] });
                    db.collection("Prenotazione").insertOne(prenotazione, (err, res) => {
                        if (err) return callback(500)
                        timerModel.setTimerAttivazionePrenotazione(prenotazione);
                        gestionePrenotazioneModel.fetchPrenotazioniUtente({ _id: datiPrenotazione.idUtente }, res => {
                            return callback({
                                status: 201,
                                prenotazioni: res.prenotazioni
                            })
                        })
                    })
                })
        } catch (error) {
            console.log(error)
            callback(500)
        }
    }
}