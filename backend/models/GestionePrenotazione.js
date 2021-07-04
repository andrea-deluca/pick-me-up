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

    modificaPrenotazione: async function (data, callback) {
        const db = await makeDb(config)
        const tempoTotale = (new Date(data.prenotazione.consegna.data) - new Date(data.prenotazione.ritiro.data)) / (1000 * 3600)
        const importoAggiornato = data.prenotazione.mezzo.tariffa * tempoTotale
        const datiPrenotazione = {
            ritiro: {
                idRitiro: ObjectId(data.prenotazione.ritiro.localita),
                nome: data.prenotazione.ritiro.nome,
                data: new Date(data.prenotazione.ritiro.data),
            },
            consegna: {
                idConsegna: ObjectId(data.prenotazione.consegna.localita),
                nome: data.prenotazione.consegna.nome,
                data: new Date(data.prenotazione.consegna.data),
            },
            mezzo: {
                ...data.prenotazione.mezzo,
                tipologia: data.prenotazione.tipologiaMezzo,
                idMezzo: ObjectId(data.prenotazione.mezzo.idMezzo),
                code: data.prenotazione.mezzo.code[0]
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
                    const metodoPagamento = res.pagamento.idMetodoPagamento
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
                                { $match: { "_id": ObjectId(data.utente.id) } },
                                { $unwind: "$metodiPagamento" },
                                { $match: { "metodiPagamento._id": ObjectId(metodoPagamento) } },
                                { $project: { "metodiPagamento": 1 } }
                            ]).toArray()
                                .then(res => {
                                    const utente = {
                                        ...data.utente,
                                        metodoPagamento: res[0].metodiPagamento
                                    }
                                    pagamentoModel.generaModificaPrenotazione({
                                        utente: utente,
                                        prenotazione: prenotazione,
                                        differenzaImporto: differenzaImporto
                                    })
                                    timer.updateTimeoutAttivazionePrenotazione({
                                        _id: prenotazione._id,
                                        ritiro: prenotazione.ritiro.data,
                                        dataPrenotazione: new Date()
                                    })
                                    this.fetchPrenotazioniUtente({ _id: utente.id }, res => {
                                        if (res === 500) return callback(500)
                                        return callback({
                                            status: 200,
                                            prenotazioni: res.prenotazioni
                                        })
                                    })
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
                idMezzo: ObjectId(data.prenotazione.mezzo.idMezzo),
                code: data.prenotazione.mezzo.code[0]
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
                    const metodoPagamento = res.pagamento.idMetodoPagamento
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
                                { $match: { "_id": ObjectId(data.utente.id) } },
                                { $unwind: "$metodiPagamento" },
                                { $match: { "metodiPagamento._id": ObjectId(metodoPagamento) } },
                                { $project: { "metodiPagamento": 1 } }
                            ]).toArray()
                                .then(res => {
                                    const utente = {
                                        ...data.utente,
                                        metodoPagamento: res[0].metodiPagamento
                                    }
                                    pagamentoModel.generaModificaPrenotazione({
                                        utente: utente,
                                        prenotazione: prenotazione,
                                        differenzaImporto: differenzaImporto
                                    })
                                    this.fetchPrenotazioniUtente({ _id: utente.id }, res => {
                                        if (res === 500) return callback(500)
                                        return callback({
                                            status: 200,
                                            prenotazioni: res.prenotazioni
                                        })
                                    })
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
                        { $match: { "_id": ObjectId(data.utente.id) } },
                        { $unwind: "$metodiPagamento" },
                        { $match: { "metodiPagamento._id": ObjectId(prenotazione.pagamento.idMetodoPagamento) } },
                        { $project: { "metodiPagamento": 1 } }
                    ]).toArray()
                        .then(res => {
                            const utente = {
                                ...data.utente,
                                metodoPagamento: res[0].metodiPagamento
                            }
                            pagamentoModel.generaAnnullaPrenotazione({ utente: utente, prenotazione: prenotazione })
                            timer.stopTimeoutAttivazionePrenotazione({
                                _id: data.idPrenotazione
                            })
                            this.fetchPrenotazioniUtente({ _id: utente.id }, res => {
                                if (res === 500) return callback(500)
                                return callback({
                                    status: 200,
                                    prenotazioni: res.prenotazioni
                                })
                            })
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
                    this.fetchPrenotazioniUtente({ _id: data.idUtente }, res => {
                        if (res === 500) return callback(500)
                        return callback({
                            status: 200,
                            prenotazioni: res.prenotazioni
                        })
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
                                idConsegna: data.consegna
                            }
                        }
                    }
                    if (prenotazione.mezzo.tipologia === "auto") {
                        db.collection("Deposito").findOneAndUpdate(
                            { "parcheggi._id": ObjectId(prenotazione.ritiro.idRitiro) },
                            { $pull: { "parcheggi.$.auto.$[idMezzo].targhe": prenotazione.mezzo.code } },
                            { arrayFilters: [{ "idMezzo._id": ObjectId(prenotazione.mezzo.idMezzo) }] },
                            (err, res) => {
                                db.collection("Deposito").findOneAndUpdate(
                                    { "parcheggi._id": ObjectId(prenotazione.consegna.idConsegna) },
                                    { $push: { "parcheggi.$.auto.$[idMezzo].targhe": prenotazione.mezzo.code } },
                                    { arrayFilters: [{ "idMezzo._id": ObjectId(prenotazione.mezzo.idMezzo) }] },
                                    ((err, res) => {
                                        if (err) return callback(500)
                                        this.fetchPrenotazioniUtente({ _id: data.idUtente }, res => {
                                            return callback({
                                                status: 200,
                                                prenotazioni: res.prenotazioni
                                            })
                                        })
                                    })
                                )
                            })
                    } else if (prenotazione.mezzo.tipologia === "moto") {
                        db.collection("Deposito").findOneAndUpdate(
                            { "parcheggi._id": ObjectId(prenotazione.ritiro.idRitiro) },
                            { $pull: { "parcheggi.$.moto.$[idMezzo].targhe": prenotazione.mezzo.code } },
                            { arrayFilters: [{ "idMezzo._id": ObjectId(prenotazione.mezzo.idMezzo) }] },
                            (err, res) => {
                                db.collection("Deposito").findOneAndUpdate(
                                    { "parcheggi._id": ObjectId(prenotazione.consegna.idConsegna) },
                                    { $push: { "parcheggi.$.moto.$[idMezzo].targhe": prenotazione.mezzo.code } },
                                    { arrayFilters: [{ "idMezzo._id": ObjectId(prenotazione.mezzo.idMezzo) }] },
                                    ((err, res) => {
                                        if (err) return callback(500)
                                        this.fetchPrenotazioniUtente({ _id: data.idUtente }, res => {
                                            return callback({
                                                status: 200,
                                                prenotazioni: res.prenotazioni
                                            })
                                        })
                                    })
                                )
                            })
                    } else if (prenotazione.mezzo.tipologia === "bici") {
                        db.collection("Deposito").findOneAndUpdate(
                            { "stalli._id": ObjectId(prenotazione.ritiro.idRitiro) },
                            { $pull: { "stalli.$.bici.$[idMezzo].codice": prenotazione.mezzo.code } },
                            { arrayFilters: [{ "idMezzo._id": ObjectId(prenotazione.mezzo.idMezzo) }] },
                            (err, res) => {
                                db.collection("Deposito").findOneAndUpdate(
                                    { "stalli._id": ObjectId(prenotazione.consegna.idConsegna) },
                                    { $push: { "stalli.$.bici.$[idMezzo].codice": prenotazione.mezzo.code } },
                                    { arrayFilters: [{ "idMezzo._id": ObjectId(prenotazione.mezzo.idMezzo) }] },
                                    ((err, res) => {
                                        if (err) return callback(500)
                                        this.fetchPrenotazioniUtente({ _id: data.idUtente }, res => {
                                            return callback({
                                                status: 200,
                                                prenotazioni: res.prenotazioni
                                            })
                                        })
                                    })
                                )
                            })
                    } else if (prenotazione.mezzo.tipologia === "monopattino") {
                        db.collection("Deposito").findOneAndUpdate(
                            { "stalli._id": ObjectId(prenotazione.ritiro.idRitiro) },
                            { $pull: { "stalli.$.monopattino.$[idMezzo].codice": prenotazione.mezzo.code } },
                            { arrayFilters: [{ "idMezzo._id": ObjectId(prenotazione.mezzo.idMezzo) }] },
                            (err, res) => {
                                db.collection("Deposito").findOneAndUpdate(
                                    { "stalli._id": ObjectId(prenotazione.consegna.idConsegna) },
                                    { $push: { "stalli.$.monopattino.$[idMezzo].targhe": prenotazione.mezzo.code } },
                                    { arrayFilters: [{ "idMezzo._id": ObjectId(prenotazione.mezzo.idMezzo) }] },
                                    ((err, res) => {
                                        if (err) return callback(500)
                                        this.fetchPrenotazioniUtente({ _id: data.idUtente }, res => {
                                            return callback({
                                                status: 200,
                                                prenotazioni: res.prenotazioni
                                            })
                                        })
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

    estendiNoleggio: async function (data, callback) {
        const db = await makeDb(config)
        try {
            db.collection("Prenotazione").findOne(
                { _id: ObjectId(data._id) },
                { projection: { _id: 0, "mezzo.idMezzo": 1, "mezzo.code": 1 } },
                (err, res) => {
                    if (err) return callback(500)
                    db.collection("Prenotazione").findOne(
                        {
                            "mezzo.idMezzo": ObjectId(res.mezzo.idMezzo),
                            "mezzo.code": res.mezzo.code,
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
                                                        "metodiPagamento._id": ObjectId(prenotazione.pagamento.idMetodoPagamento)
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
                                                        this.fetchPrenotazioniUtente({ _id: utente.id }, res => {
                                                            return callback({
                                                                status: 200,
                                                                prenotazioni: res.prenotazioni
                                                            })
                                                        })
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