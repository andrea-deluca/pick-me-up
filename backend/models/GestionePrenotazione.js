const { config } = require("../db/config");
const { makeDb } = require("../db/dbmiddleware");
const createError = require("http-errors");
const mailModel = require("./Mail")
const pagamentoModel = require("./Pagamento")
const { ObjectId } = require("mongodb");
const Timers = require("./Timers")

const timer = new Timers()

module.exports = {
    fetchPrenotazioniUtente: async function (utente, callback) {
        const db = await makeDb(config)
        try {
            db.collection("Prenotazione").aggregate([
                { $match: { idUtente: ObjectId(utente._id) } },
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
                        { $match: { idUtente: ObjectId(utente._id) } },
                        { $match: { stato: "PROGRAMMATA" } }
                    ]).toArray()
                        .then(res => {
                            const prenotazioniProg = res;
                            db.collection("Prenotazione").aggregate([
                                { $match: { idUtente: ObjectId(utente._id) } },
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

    fetchPrenotazioni: async function (callback) {
        const db = await makeDb(config);
        try {
            db.collection("Prenotazione").aggregate([
                {
                    $lookup: {
                        from: "Utente",
                        localField: "idUtente",
                        foreignField: "_id",
                        as: "datiUtente"
                    }
                },
                {
                    $project: {
                        "dataPrenotazione": 1,
                        "datiUtente._id": 1,
                        "datiUtente.credenziali.email": 1,
                        "stato": 1,
                        "autista": 1,
                        "ritiro": 1,
                        "consegna": 1,
                        "mezzo": 1
                    }
                }
            ]).toArray()
                .then(res => {
                    return callback({
                        status: 200,
                        prenotazioni: res
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

    modificaPrenotazione: async function (data, callback) {
        const db = await makeDb(config)
        const tempoTotale = (new Date(data.prenotazione.consegna.data) - new Date(data.prenotazione.ritiro.data)) / (1000 * 3600)
        const importoAggiornato = data.prenotazione.mezzo.tariffa * tempoTotale
        const datiPrenotazione = {
            ritiro: {
                _id: ObjectId(data.prenotazione.ritiro.localita),
                nome: data.prenotazione.ritiro.nome,
                data: new Date(data.prenotazione.ritiro.data),
            },
            consegna: {
                _id: ObjectId(data.prenotazione.consegna.localita),
                nome: data.prenotazione.consegna.nome,
                data: new Date(data.prenotazione.consegna.data),
            },
            mezzo: {
                ...data.prenotazione.mezzo,
                tipologia: data.prenotazione.tipologiaMezzo,
                _id: ObjectId(data.prenotazione.mezzo.idMezzo),
                targa: data.prenotazione.mezzo.targa
            },
            pagamento: {
                importoTotale: importoAggiornato
            },
        }
        try {
            db.collection("Prenotazione").findOne(
                { _id: ObjectId(data.prenotazione._id) },
                (err, res) => {
                    if (err) return callback(500)
                    const differenzaImporto = importoAggiornato - res.pagamento.importoTotale
                    const metodoPagamento = res.pagamento._id
                    db.collection("Prenotazione").findOneAndUpdate(
                        { _id: ObjectId(data.prenotazione._id) },
                        {
                            $set: {
                                ritiro: datiPrenotazione.ritiro,
                                consegna: datiPrenotazione.consegna,
                                mezzo: datiPrenotazione.mezzo,
                                "pagamento.importoTotale": datiPrenotazione.pagamento.importoTotale
                            }
                        }, { returnDocument: 'after' },
                        (err, res) => {
                            if (err) return callback(500)
                            const prenotazione = res.value
                            db.collection("Utente").aggregate([
                                { $match: { "_id": ObjectId(data.utente) } },
                                { $unwind: "$metodiPagamento" },
                                { $match: { "metodiPagamento._id": ObjectId(metodoPagamento) } },
                                {
                                    $project: {
                                        "metodiPagamento": 1,
                                        "nome": 1,
                                        "cognome": 1,
                                        "codiceFiscale": 1,
                                        "credenziali.cellulare": 1,
                                        "credenziali.email": 1
                                    }
                                }
                            ]).toArray()
                                .then(res => {
                                    const utente = {
                                        id: res[0]._id,
                                        nome: res[0].nome,
                                        cognome: res[0].cognome,
                                        codiceFiscale: res[0].codiceFiscale,
                                        cellulare: res[0].credenziali.cellulare,
                                        email: res[0].credenziali.email,
                                        metodoPagamento: res[0].metodiPagamento
                                    }
                                    pagamentoModel.generaModificaPrenotazione({
                                        utente: utente,
                                        prenotazione: prenotazione,
                                        differenzaImporto: differenzaImporto
                                    })
                                    timer.updateTimeoutPrenotazione({
                                        _id: prenotazione._id,
                                        ritiro: prenotazione.ritiro.data,
                                        dataPrenotazione: new Date()
                                    })
                                    return callback(200)
                                })
                                .catch(err => { return callback(500) })
                        }
                    )
                })
        } catch (error) {
            console.log(error)
            callback(500)
        }
    },

    cambiaMezzoPrenotazione: async function (data, callback) {
        const db = await makeDb(config)
        const tempoTotale = (new Date(data.prenotazione.consegna.data) - new Date(data.prenotazione.ritiro.data)) / (1000 * 3600)
        const importoAggiornato = data.prenotazione.mezzo.tariffa * tempoTotale
        const datiPrenotazione = {
            mezzo: {
                ...data.prenotazione.mezzo,
                tipologia: data.prenotazione.tipologiaMezzo,
                _id: ObjectId(data.prenotazione.mezzo.idMezzo),
                targa: data.prenotazione.mezzo.targa
            },
            pagamento: {
                importoTotale: importoAggiornato
            },
        }
        try {
            db.collection("Prenotazione").findOne(
                { _id: ObjectId(data.prenotazione._id) },
                (err, res) => {
                    if (err) return callback(500)
                    const differenzaImporto = importoAggiornato - res.pagamento.importoTotale
                    const metodoPagamento = res.pagamento._id
                    db.collection("Prenotazione").findOneAndUpdate(
                        { _id: ObjectId(data.prenotazione._id) },
                        {
                            $set: {
                                mezzo: datiPrenotazione.mezzo,
                                "pagamento.importoTotale": datiPrenotazione.pagamento.importoTotale
                            }
                        }, { returnDocument: 'after' },
                        (err, res) => {
                            if (err) return callback(500)
                            const prenotazione = res.value
                            db.collection("Utente").aggregate([
                                { $match: { "_id": ObjectId(data.utente) } },
                                { $unwind: "$metodiPagamento" },
                                { $match: { "metodiPagamento._id": ObjectId(metodoPagamento) } },
                                {
                                    $project: {
                                        "metodiPagamento": 1,
                                        "nome": 1,
                                        "cognome": 1,
                                        "codiceFiscale": 1,
                                        "credenziali.cellulare": 1,
                                        "credenziali.email": 1
                                    }
                                }
                            ]).toArray()
                                .then(res => {
                                    const utente = {
                                        id: res[0]._id,
                                        nome: res[0].nome,
                                        cognome: res[0].cognome,
                                        codiceFiscale: res[0].codiceFiscale,
                                        cellulare: res[0].credenziali.cellulare,
                                        email: res[0].credenziali.email,
                                        metodoPagamento: res[0].metodiPagamento
                                    }
                                    pagamentoModel.generaModificaPrenotazione({
                                        utente: utente,
                                        prenotazione: prenotazione,
                                        differenzaImporto: differenzaImporto
                                    })
                                    return callback(200)
                                })
                                .catch(err => { return callback(500) })
                        }
                    )
                })
        } catch (error) {
            console.log(error)
            callback(500)
        }
    },

    annullaPrenotazione: async function (data, callback) {
        const db = await makeDb(config);
        try {
            db.collection("Prenotazione").findOneAndDelete(
                { _id: ObjectId(data.idPrenotazione) }, (err, res) => {
                    if (err) return callback(500)
                    const prenotazione = res.value;
                    db.collection("Utente").aggregate([
                        { $match: { "_id": ObjectId(data.utente) } },
                        { $unwind: "$metodiPagamento" },
                        { $match: { "metodiPagamento._id": ObjectId(prenotazione.pagamento._id) } },
                        {
                            $project: {
                                "metodiPagamento": 1,
                                "nome": 1,
                                "cognome": 1,
                                "codiceFiscale": 1,
                                "credenziali.cellulare": 1,
                                "credenziali.email": 1

                            }
                        }
                    ]).toArray()
                        .then(res => {
                            const utente = {
                                id: res[0]._id,
                                nome: res[0].nome,
                                cognome: res[0].cognome,
                                codiceFiscale: res[0].codiceFiscale,
                                cellulare: res[0].credenziali.cellulare,
                                email: res[0].credenziali.email,
                                metodoPagamento: res[0].metodiPagamento
                            }
                            pagamentoModel.generaAnnullaPrenotazione({ utente: utente, prenotazione: prenotazione })
                            timer.stopTimeoutPrenotazione({
                                _id: data.idPrenotazione
                            })
                            return callback(200)
                        })
                        .catch(err => {
                            return callback(500)
                        })
                }
            )
        } catch (error) {
            console.log(error)
            callback(500)
        }
    },

    iniziaNoleggio: async function (data, callback) {
        const db = await makeDb(config);
        try {
            db.collection("Prenotazione").findOneAndUpdate(
                { _id: ObjectId(data._id) },
                { $set: { stato: "INIZIATA" } },
                (err, res) => {
                    if (err) return callback(500)
                    const metodoPagamento = res.value.pagamento._id
                    db.collection("Prenotazione").aggregate([
                        { $match: { _id: ObjectId(data._id) } },
                        {
                            $lookup: {
                                from: "Utente",
                                localField: "idUtente",
                                foreignField: "_id",
                                as: "datiUtente"
                            }
                        },
                        { $unwind: "$datiUtente" },
                        { $unwind: "$datiUtente.metodiPagamento" },
                        { $match: { "datiUtente.metodiPagamento._id": ObjectId(metodoPagamento) } },
                    ]).toArray().then(res => {
                        const prenotazione = res[0]
                        timer.startTimoutPrenotazioneIniziata({
                            _id: prenotazione._id,
                            dataPrenotazione: prenotazione.dataPrenotazione,
                            ritiro: prenotazione.ritiro.data,
                            consegna: prenotazione.consegna.data,
                            mezzo: prenotazione.mezzo.targa,
                            idUtente: prenotazione.idUtente,
                            nome: prenotazione.datiUtente.nome,
                            cognome: prenotazione.datiUtente.cognome,
                            codiceFiscale: prenotazione.datiUtente.codiceFiscale,
                            cellulare: prenotazione.datiUtente.credenziali.cellulare,
                            email: prenotazione.datiUtente.credenziali.email,
                            metodoPagamento: prenotazione.datiUtente.metodiPagamento,
                            importoTotale: prenotazione.pagamento.importoTotale
                        })
                        return callback(200)
                    }).catch(err => {
                        return callback(500)
                    })
                }
            )
        } catch (error) {
            console.log(error)
            return callback(500)
        }
    },

    terminaNoleggio: async function (data, callback) {
        const db = await makeDb(config);
        try {
            db.collection("Prenotazione").findOneAndUpdate(
                { _id: ObjectId(data._id) },
                { $set: { stato: "TERMINATA" } },
                { returnDocument: "after" },
                (err, res) => {
                    if (err) return callback(500)
                    let prenotazione = res.value
                    if (data.consegna) {
                        prenotazione = {
                            ...prenotazione,
                            consegna: {
                                ...prenotazione.consegna,
                                _id: data.consegna
                            }
                        }
                    }
                    if (prenotazione.mezzo.tipologia === "auto") {
                        db.collection("Deposito").findOneAndUpdate(
                            { "_id": ObjectId(prenotazione.ritiro._id) },
                            { $pull: { "auto.$[idMezzo].targhe": prenotazione.mezzo.targa } },
                            { arrayFilters: [{ "idMezzo._id": ObjectId(prenotazione.mezzo._id) }] },
                            (err, res) => {
                                db.collection("Deposito").findOneAndUpdate(
                                    { "_id": ObjectId(prenotazione.consegna._id) },
                                    { $push: { "auto.$[idMezzo].targhe": prenotazione.mezzo.targa } },
                                    { arrayFilters: [{ "idMezzo._id": ObjectId(prenotazione.mezzo._id) }] },
                                    ((err, res) => {
                                        if (err) return callback(500)
                                        timer.stopTimeoutPrenotazione({
                                            _id: prenotazione._id
                                        })
                                        Timers.stopTimersRitardiAutomatici({
                                            _id: prenotazione._id
                                        })
                                        return callback(200)
                                    })
                                )
                            })
                    } else if (prenotazione.mezzo.tipologia === "moto") {
                        db.collection("Deposito").findOneAndUpdate(
                            { "_id": ObjectId(prenotazione.ritiro._id) },
                            { $pull: { "moto.$[idMezzo].targhe": prenotazione.mezzo.targa } },
                            { arrayFilters: [{ "idMezzo._id": ObjectId(prenotazione.mezzo._id) }] },
                            (err, res) => {
                                db.collection("Deposito").findOneAndUpdate(
                                    { "_id": ObjectId(prenotazione.consegna._id) },
                                    { $push: { "moto.$[idMezzo].targhe": prenotazione.mezzo.targa } },
                                    { arrayFilters: [{ "idMezzo._id": ObjectId(prenotazione.mezzo._id) }] },
                                    ((err, res) => {
                                        if (err) return callback(500)
                                        timer.stopTimeoutPrenotazione({
                                            _id: prenotazione._id
                                        })
                                        Timers.stopTimersRitardiAutomatici({
                                            _id: prenotazione._id
                                        })
                                        return callback(200)
                                    })
                                )
                            })
                    } else if (prenotazione.mezzo.tipologia === "bici") {
                        db.collection("Deposito").findOneAndUpdate(
                            { "_id": ObjectId(prenotazione.ritiro._id) },
                            { $pull: { "bici.$[idMezzo].targhe": prenotazione.mezzo.targa } },
                            { arrayFilters: [{ "idMezzo._id": ObjectId(prenotazione.mezzo._id) }] },
                            (err, res) => {
                                db.collection("Deposito").findOneAndUpdate(
                                    { "_id": ObjectId(prenotazione.consegna._id) },
                                    { $push: { "bici.$[idMezzo].targhe": prenotazione.mezzo.targa } },
                                    { arrayFilters: [{ "idMezzo._id": ObjectId(prenotazione.mezzo._id) }] },
                                    ((err, res) => {
                                        if (err) return callback(500)
                                        timer.stopTimeoutPrenotazione({
                                            _id: prenotazione._id
                                        })
                                        Timers.stopTimersRitardiAutomatici({
                                            _id: prenotazione._id
                                        })
                                        return callback(200)
                                    })
                                )
                            })
                    } else if (prenotazione.mezzo.tipologia === "monopattino") {
                        db.collection("Deposito").findOneAndUpdate(
                            { "_id": ObjectId(prenotazione.ritiro._id) },
                            { $pull: { "monopattino.$[idMezzo].targhe": prenotazione.mezzo.targa } },
                            { arrayFilters: [{ "idMezzo._id": ObjectId(prenotazione.mezzo._id) }] },
                            (err, res) => {
                                db.collection("Deposito").findOneAndUpdate(
                                    { "_id": ObjectId(prenotazione.consegna._id) },
                                    { $push: { "monopattino.$[idMezzo].targhe": prenotazione.mezzo._id } },
                                    { arrayFilters: [{ "idMezzo._id": ObjectId(prenotazione.mezzo._id) }] },
                                    ((err, res) => {
                                        if (err) return callback(500)
                                        timer.stopTimeoutPrenotazione({
                                            _id: prenotazione._id
                                        })
                                        Timers.stopTimersRitardiAutomatici({
                                            _id: prenotazione._id
                                        })
                                        return callback(200)
                                    })
                                )
                            })
                    }
                }
            )
        } catch (error) {
            console.log(error)
            return callback(500)
        }
    },

    terminaNoleggioAltro: async function (data, callback) {
        const db = await makeDb(config)
        try {
            db.collection("Prenotazione").findOneAndUpdate(
                { _id: ObjectId(data._id) },
                { $set: { stato: "TERMINATA" } },
                { returnDocument: "after" },
                (err, res) => {
                    if (err) return callback(500)
                    let prenotazione = res.value
                    if (data.consegna) {
                        prenotazione = {
                            ...prenotazione,
                            consegna: {
                                ...prenotazione.consegna,
                                _id: data.consegna
                            }
                        }
                    }
                    if (prenotazione.mezzo.tipologia === "auto") {
                        db.collection("Deposito").findOneAndUpdate(
                            { "_id": ObjectId(prenotazione.ritiro._id) },
                            { $pull: { "auto.$[idMezzo].targhe": prenotazione.mezzo.targa } },
                            { arrayFilters: [{ "idMezzo._id": ObjectId(prenotazione.mezzo._id) }] },
                            (err, res) => {
                                const auto = {
                                    _id: ObjectId(prenotazione.mezzo._id),
                                    targhe: [
                                        prenotazione.mezzo.targa,
                                    ],
                                    posizione: data.consegna
                                }
                                db.collection("Deposito").findOneAndUpdate(
                                    { "tipologia": "Altro" },
                                    { $push: { "auto": auto } },
                                    ((err, res) => {
                                        if (err) return callback(500)
                                        timer.stopTimeoutPrenotazione({
                                            _id: prenotazione._id
                                        })
                                        Timers.stopTimersRitardiAutomatici({
                                            _id: prenotazione._id
                                        })
                                        return callback(200)
                                    })
                                )
                            })
                    } else if (prenotazione.mezzo.tipologia === "moto") {
                        db.collection("Deposito").findOneAndUpdate(
                            { "_id": ObjectId(prenotazione.ritiro._id) },
                            { $pull: { "moto.$[idMezzo].targhe": prenotazione.mezzo.targa } },
                            { arrayFilters: [{ "idMezzo._id": ObjectId(prenotazione.mezzo._id) }] },
                            (err, res) => {
                                const moto = {
                                    _id: ObjectId(prenotazione.mezzo._id),
                                    targhe: [
                                        prenotazione.mezzo.targa,
                                    ],
                                    posizione: data.consegna
                                }
                                db.collection("Deposito").findOneAndUpdate(
                                    { "tipologia": "Altro" },
                                    { $push: { "moto": moto } },
                                    ((err, res) => {
                                        if (err) return callback(500)
                                        timer.stopTimeoutPrenotazione({
                                            _id: prenotazione._id
                                        })
                                        Timers.stopTimersRitardiAutomatici({
                                            _id: prenotazione._id
                                        })
                                        return callback(200)
                                    })
                                )
                            })
                    } else if (prenotazione.mezzo.tipologia === "bici") {
                        db.collection("Deposito").findOneAndUpdate(
                            { "_id": ObjectId(prenotazione.ritiro._id) },
                            { $pull: { "bici.$[idMezzo].targhe": prenotazione.mezzo.targa } },
                            { arrayFilters: [{ "idMezzo._id": ObjectId(prenotazione.mezzo._id) }] },
                            (err, res) => {
                                const bici = {
                                    _id: ObjectId(prenotazione.mezzo._id),
                                    targhe: [
                                        prenotazione.mezzo.targa,
                                    ],
                                    posizione: data.consegna
                                }
                                db.collection("Deposito").findOneAndUpdate(
                                    { "tipologia": "Altro" },
                                    { $push: { "bici": bici } },
                                    ((err, res) => {
                                        if (err) return callback(500)
                                        timer.stopTimeoutPrenotazione({
                                            _id: prenotazione._id
                                        })
                                        Timers.stopTimersRitardiAutomatici({
                                            _id: prenotazione._id
                                        })
                                        return callback(200)
                                    })
                                )
                            })
                    } else {
                        db.collection("Deposito").findOneAndUpdate(
                            { "_id": ObjectId(prenotazione.ritiro._id) },
                            { $pull: { "monopattino.$[idMezzo].targhe": prenotazione.mezzo.targa } },
                            { arrayFilters: [{ "idMezzo._id": ObjectId(prenotazione.mezzo._id) }] },
                            (err, res) => {
                                const monopattino = {
                                    _id: ObjectId(prenotazione.mezzo._id),
                                    targhe: [
                                        prenotazione.mezzo.targa,
                                    ],
                                    posizione: data.consegna
                                }
                                db.collection("Deposito").findOneAndUpdate(
                                    { "tipologia": "Altro" },
                                    { $push: { "monopattino": monopattino } },
                                    ((err, res) => {
                                        if (err) return callback(500)
                                        timer.stopTimeoutPrenotazione({
                                            _id: prenotazione._id
                                        })
                                        Timers.stopTimersRitardiAutomatici({
                                            _id: prenotazione._id
                                        })
                                        return callback(200)
                                    })
                                )
                            })
                    }
                })
        } catch (error) {
            console.log(error)
            return callback(500)
        }
    },

    estendiNoleggio: async function (data, callback) {
        const db = await makeDb(config)
        try {
            db.collection("Prenotazione").findOne(
                { _id: ObjectId(data._id) },
                { projection: { _id: 0, "mezzo._id": 1, "mezzo.targa": 1 } },
                (err, res) => {
                    if (err) return callback(500)
                    db.collection("Prenotazione").findOne(
                        {
                            "mezzo._id": ObjectId(res.mezzo._id),
                            "mezzo.targa": res.mezzo.targa,
                            "_id": { $ne: ObjectId(data._id) },
                            "ritiro.data": { $lte: new Date(data.dataConsegna) }
                        },
                        (err, res) => {
                            if (err) return callback(500)
                            if (res) {
                                return callback(400)
                            } else {
                                db.collection("Prenotazione").findOneAndUpdate(
                                    { _id: ObjectId(data._id) },
                                    { $set: { "consegna.data": new Date(data.dataConsegna) } },
                                    (err, res) => {
                                        if (err) return callback(500)
                                        const prenotazione = res.value
                                        const tempoTotaleMillis = new Date(data.dataConsegna) - new Date(prenotazione.ritiro.data)
                                        const tempoTotale = tempoTotaleMillis / (1000 * 3600)
                                        const importoTotale = tempoTotale * prenotazione.mezzo.tariffa;
                                        const importoPagato = prenotazione.pagamento.importoTotale;
                                        const differenzaImporto = importoTotale - importoPagato
                                        db.collection("Prenotazione").findOneAndUpdate(
                                            { _id: ObjectId(data._id) },
                                            { $set: { "pagamento.importoTotale": importoTotale } },
                                            (err, res) => {
                                                db.collection("Utente").findOne(
                                                    {
                                                        _id: ObjectId(prenotazione.idUtente),
                                                        "metodiPagamento._id": ObjectId(prenotazione.pagamento._id)
                                                    },
                                                    {
                                                        projection: {
                                                            nome: 1,
                                                            cognome: 1,
                                                            codiceFiscale: 1,
                                                            "credenziali.cellulare": 1,
                                                            "credenziali.email": 1,
                                                            "metodiPagamento.$": 1
                                                        }
                                                    },
                                                    (err, res) => {
                                                        const utente = {
                                                            id: res._id,
                                                            nome: res.nome,
                                                            cognome: res.cognome,
                                                            codiceFiscale: res.codiceFiscale,
                                                            cellulare: res.credenziali.cellulare,
                                                            email: res.credenziali.email,
                                                            metodoPagamento: {
                                                                ...res.metodiPagamento[0]
                                                            }
                                                        }
                                                        pagamentoModel.generaEstensioneNoleggio({
                                                            utente: utente,
                                                            prenotazione: {
                                                                ...prenotazione,
                                                                consegna: {
                                                                    ...prenotazione.consegna,
                                                                    data: data.dataConsegna
                                                                },
                                                                pagamento: {
                                                                    ...prenotazione.pagamento,
                                                                    importoTotale: importoTotale
                                                                }
                                                            },
                                                            differenzaImporto: differenzaImporto
                                                        })
                                                        return callback(200)
                                                    }
                                                )
                                            }
                                        )
                                    }
                                )
                            }
                        }
                    )
                }
            )
        } catch (error) {
            console.log(error)
            return callback(500)
        }
    }
}