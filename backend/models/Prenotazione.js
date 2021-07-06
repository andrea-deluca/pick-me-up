const { config } = require("../db/config");
const { makeDb } = require("../db/dbmiddleware");
const createError = require("http-errors");
const mailModel = require("./Mail")
const pagamentoModel = require("./Pagamento")
const { ObjectId } = require("mongodb");
const gestionePrenotazioneModel = require("./GestionePrenotazione");
const Timers = require("./Timers");

const timer = new Timers()

module.exports = {
    fetchDepositi: async function (datiPrenotazione, callback) {
        const db = await makeDb(config);
        if (datiPrenotazione.tipologiaMezzo === "auto" || datiPrenotazione.tipologiaMezzo === "moto") {
            try {
                db.collection("Deposito").find(
                    { "tipologia": "parcheggio" },
                    { projection: { "nome": 1, "posizione": 1 } }
                ).toArray()
                    .then(res => {
                        return callback({
                            status: 200,
                            depositi: res
                        })
                    })
                    .catch(err => {
                        return callback(500)
                    })
            } catch (error) {
                console.log(error)
                return callback(500)
            }
        } else {
            try {
                db.collection("Deposito").find(
                    { "tipologia": "stallo" },
                    { projection: { "nome": 1, "posizione": 1 } }
                ).toArray()
                    .then(res => {
                        return callback({
                            status: 200,
                            depositi: res
                        })
                    })
                    .catch(err => {
                        return callback(500)
                    })
            } catch (error) {
                console.log(error)
                return callback(500)
            }
        }
    },

    fetchVeicoliDisponibili: async function (datiPrenotazione, callback) {
        const db = await makeDb(config);
        if (datiPrenotazione.tipologiaMezzo === "auto") {
            try {
                db.collection("Deposito").aggregate([
                    { $match: { "_id": ObjectId(datiPrenotazione.ritiro.localita) } },
                    { $unset: ["posizione", "moto"] },
                    { $unwind: "$auto" },
                    {
                        $lookup: {
                            from: "Veicolo",
                            let: { veicoloId: "$auto._id" },
                            pipeline: [
                                { $match: { $expr: { $eq: ["$_id", "$$veicoloId"] } } },
                                { $unset: ["_id"] }
                            ],
                            as: "auto.datiAuto"
                        }
                    },
                    {
                        $group: {
                            "_id": "$_id",
                            auto: {
                                $push: {
                                    _id: "$auto._id",
                                    dati: "$auto.datiAuto",
                                    targhe: "$auto.targhe"
                                }
                            }
                        }
                    }
                ]).toArray()
                    .then(res => {
                        const veicoli = res[0]
                        db.collection("Prenotazione").find(
                            {
                                $and: [
                                    { "ritiro.data": { $lte: new Date(datiPrenotazione.consegna.data) } },
                                    { "consegna.data": { $gte: new Date(datiPrenotazione.ritiro.data) } }
                                ]
                            },
                            { projection: { _id: 0, "mezzo.targa": 1 } }
                        ).toArray()
                            .then(res => {
                                const targhePrenotazioni = res.map(key => {
                                    return key.mezzo.targa
                                })
                                veicoli.auto.map((key) => {
                                    key.targhe.map((value, index, arr) => {
                                        targhePrenotazioni.forEach(element => {
                                            let i = index
                                            if (element === arr[i]) {
                                                arr.splice(i, 1)
                                                i--
                                            }
                                        })
                                    })
                                })
                                const veicoliDisponibili = veicoli.auto.filter((value) => {
                                    return value.targhe.length !== 0
                                })
                                if (veicoliDisponibili.length === 0) return callback(404)
                                return callback({
                                    status: 200,
                                    veicoli: veicoliDisponibili
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
                callback(500)
            }
        } else if (datiPrenotazione.tipologiaMezzo === "moto") {
            try {
                db.collection("Deposito").aggregate([
                    { $match: { "_id": ObjectId(datiPrenotazione.ritiro.localita) } },
                    { $unset: ["posizione", "auto"] },
                    { $unwind: "$moto" },
                    {
                        $lookup: {
                            from: "Veicolo",
                            let: { veicoloId: "$moto._id" },
                            pipeline: [
                                { $match: { $expr: { $eq: ["$_id", "$$veicoloId"] } } },
                                { $unset: ["_id"] }
                            ],
                            as: "moto.datiMoto"
                        }
                    },
                    {
                        $group: {
                            "_id": "$_id",
                            moto: {
                                $push: {
                                    _id: "$moto._id",
                                    dati: "$moto.datiMoto",
                                    targhe: "$moto.targhe"
                                }
                            }
                        }
                    }
                ]).toArray()
                    .then(res => {
                        const veicoli = res[0]
                        db.collection("Prenotazione").find(
                            {
                                $and: [
                                    { "ritiro.data": { $lte: new Date(datiPrenotazione.consegna.data) } },
                                    { "consegna.data": { $gte: new Date(datiPrenotazione.ritiro.data) } }
                                ]
                            },
                            { projection: { _id: 0, "mezzo.targa": 1 } }
                        ).toArray()
                            .then(res => {
                                const targhePrenotazioni = res.map(key => {
                                    return key.mezzo.targa
                                })
                                veicoli.moto.map((key) => {
                                    key.targhe.map((value, index, arr) => {
                                        targhePrenotazioni.forEach(element => {
                                            let i = index
                                            if (element === arr[i]) {
                                                arr.splice(i, 1)
                                                i--
                                            }
                                        })
                                    })
                                })
                                const veicoliDisponibili = veicoli.moto.filter((value) => {
                                    return value.targhe.length !== 0
                                })
                                if (veicoliDisponibili.length === 0) return callback(404)
                                return callback({
                                    status: 200,
                                    veicoli: veicoliDisponibili
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
                callback(500)
            }
        } else if (datiPrenotazione.tipologiaMezzo === "bici") {
            try {
                db.collection("Deposito").aggregate([
                    { $match: { "_id": ObjectId(datiPrenotazione.ritiro.localita) } },
                    { $unset: ["posizione", "monopattino"] },
                    { $unwind: "$bici" },
                    {
                        $lookup: {
                            from: "Veicolo",
                            let: { veicoloId: "$bici._id" },
                            pipeline: [
                                { $match: { $expr: { $eq: ["$_id", "$$veicoloId"] } } },
                                { $unset: ["_id"] }
                            ],
                            as: "bici.datiBici"
                        }
                    },
                    {
                        $group: {
                            "_id": "$_id",
                            bici: {
                                $push: {
                                    _id: "$bici._id",
                                    dati: "$bici.datiBici",
                                    targhe: "$bici.targhe"
                                }
                            }
                        }
                    }
                ]).toArray()
                    .then(res => {
                        const veicoli = res[0]
                        db.collection("Prenotazione").find(
                            {
                                $and: [
                                    { "ritiro.data": { $lte: new Date(datiPrenotazione.consegna.data) } },
                                    { "consegna.data": { $gte: new Date(datiPrenotazione.ritiro.data) } }
                                ]
                            },
                            { projection: { _id: 0, "mezzo.targa": 1 } }
                        ).toArray()
                            .then(res => {
                                const targhePrenotazioni = res.map(key => {
                                    return key.mezzo.targa
                                })
                                veicoli.bici.map((key) => {
                                    key.targhe.map((value, index, arr) => {
                                        targhePrenotazioni.forEach(element => {
                                            let i = index
                                            if (element === arr[i]) {
                                                arr.splice(i, 1)
                                                i--
                                            }
                                        })
                                    })
                                })
                                const veicoliDisponibili = veicoli.bici.filter((value) => {
                                    return value.targhe.length !== 0
                                })
                                if (veicoliDisponibili.length === 0) return callback(404)
                                return callback({
                                    status: 200,
                                    veicoli: veicoliDisponibili
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
                callback(500)
            }
        } else {
            try {
                db.collection("Deposito").aggregate([
                    { $match: { "_id": ObjectId(datiPrenotazione.ritiro.localita) } },
                    { $unset: ["posizione", "bici"] },
                    { $unwind: "$monopattino" },
                    {
                        $lookup: {
                            from: "Veicolo",
                            let: { veicoloId: "$monopattino._id" },
                            pipeline: [
                                { $match: { $expr: { $eq: ["$_id", "$$veicoloId"] } } },
                                { $unset: ["_id"] }
                            ],
                            as: "monopattino.datiMonopattino"
                        }
                    },
                    {
                        $group: {
                            "_id": "$_id",
                            monopattino: {
                                $push: {
                                    _id: "$monopattino._id",
                                    dati: "$monopattino.datiMonopattino",
                                    targhe: "$monopattino.targhe"
                                }
                            }
                        }
                    }
                ]).toArray()
                    .then(res => {
                        const veicoli = res[0]
                        db.collection("Prenotazione").find(
                            {
                                $and: [
                                    { "ritiro.data": { $lte: new Date(datiPrenotazione.consegna.data) } },
                                    { "consegna.data": { $gte: new Date(datiPrenotazione.ritiro.data) } }
                                ]
                            },
                            { projection: { _id: 0, "mezzo.targa": 1 } }
                        ).toArray()
                            .then(res => {
                                const targhePrenotazioni = res.map(key => {
                                    return key.mezzo.targa
                                })
                                veicoli.monopattino.map((key) => {
                                    key.targhe.map((value, index, arr) => {
                                        targhePrenotazioni.forEach(element => {
                                            let i = index
                                            if (element === arr[i]) {
                                                arr.splice(i, 1)
                                                i--
                                            }
                                        })
                                    })
                                })
                                const veicoliDisponibili = veicoli.monopattino.filter((value) => {
                                    return value.targhe.length !== 0
                                })
                                if (veicoliDisponibili.length === 0) return callback(404)
                                return callback({
                                    status: 200,
                                    veicoli: veicoliDisponibili
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
                _id: ObjectId(datiPrenotazione.ritiro.localita),
                nome: datiPrenotazione.ritiro.nome,
                data: new Date(datiPrenotazione.ritiro.data),
            },
            consegna: {
                _id: ObjectId(datiPrenotazione.consegna.localita),
                nome: datiPrenotazione.consegna.nome,
                data: new Date(datiPrenotazione.consegna.data),
            },
            mezzo: {
                ...datiPrenotazione.mezzo,
                _id: ObjectId(datiPrenotazione.mezzo._id),
                tipologia: datiPrenotazione.tipologiaMezzo,
            },
            pagamento: {
                _id: ObjectId(datiPrenotazione.metodoPagamento),
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
                { $match: { "metodiPagamento._id": ObjectId(prenotazione.pagamento._id) } }
            ]).toArray()
                .then(res => {
                    pagamentoModel.generaConfermaPrenotazione({ prenotazione: prenotazione, utente: res[0] });
                    timer.startTimeoutAttivazionePrenotazione({
                        _id: prenotazione._id,
                        dataPrenotazione: prenotazione.dataPrenotazione,
                        ritiro: prenotazione.ritiro.data,
                    })
                    db.collection("Prenotazione").insertOne(prenotazione, (err, res) => {
                        if (err) return callback(500)
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