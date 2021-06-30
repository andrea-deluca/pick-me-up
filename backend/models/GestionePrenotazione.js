const { config } = require("../db/config");
const { makeDb } = require("../db/dbmiddleware");
const createError = require("http-errors");
const mailModel = require("./Mail")
const pagamentoModel = require("./Pagamento")
const { ObjectId } = require("mongodb");

module.exports = {
    fetchPrenotazioniUtente: async function (utente, callback) {
        const db = await makeDb(config)
        try {
            db.collection("Prenotazione").aggregate([
                { $match: { idUtente: ObjectId(utente._id) } },
                { $match: { stato: "ATTIVA" } }
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
                                { $match: { stato: "PASSATA" } }
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
    }
}