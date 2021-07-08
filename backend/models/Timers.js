const { config } = require("../db/config");
const { makeDb } = require("../db/dbmiddleware");
const { ObjectId } = require("mongodb");
const pagamentoModel = require("./Pagamento");
const mailModel = require("./Mail")
const notificheModel = require("./Notifiche")


class Timers {
    static ritardiAutomatici = []

    constructor() {
        this.prenotazione = [];
    }

    startTimeoutAttivazionePrenotazione(prenotazione) {
        const timerPreparazione = (prenotazione.ritiro - prenotazione.dataPrenotazione) - 900000
        let idTimeout = this.setTimeoutPrenotazione(async function () {
            const db = await makeDb(config)
            try {
                db.collection("Prenotazione").findOneAndUpdate(
                    { _id: ObjectId(prenotazione._id) },
                    { $set: { stato: "IN PREPARAZIONE" } },
                    (err, res) => {
                        setTimeout(async function () {
                            const db = await makeDb(config)
                            try {
                                db.collection("Prenotazione").findOneAndUpdate(
                                    { _id: ObjectId(prenotazione._id) },
                                    { $set: { stato: "ATTIVA" } },
                                    (err, res) => {
                                        new Timers().startTimoutTerminePrenotazione(prenotazione)
                                    }
                                )
                            } catch (error) {
                                console.log(error)
                            }
                        }, 900000)
                    }
                )
            } catch (error) {
                console.log(error)
            }
        }, timerPreparazione)
        this.prenotazione.push({ ...prenotazione, timeout: idTimeout })
    }

    updateTimeoutPrenotazione(prenotazione) {
        this.prenotazione.forEach((element, index, arr) => {
            if (element._id === prenotazione._id) {
                clearTimeout(arr[index].timeout)
                this.prenotazione.splice(index, 1)
                this.startTimeoutAttivazionePrenotazione(prenotazione)
            }
        })
    }

    stopTimeoutPrenotazione(prenotazione) {
        this.prenotazione.forEach((element, index, arr) => {
            if (ObjectId(element._id).toString() === ObjectId(prenotazione._id).toString()) {
                clearTimeout(arr[index].timeout)
                this.prenotazione.splice(index, 1)
            }
        })
    }

    startTimoutTerminePrenotazione(prenotazione) {
        const timerPrenotazione = (prenotazione.consegna - prenotazione.ritiro)
        let idTimeout = this.setTimeoutPrenotazione(async function () {
            const db = await makeDb(config)
            try {
                db.collection("Prenotazione").findOneAndUpdate(
                    { _id: ObjectId(prenotazione._id) },
                    { $set: { stato: "TERMINATA" } },
                )
            } catch (error) {
                console.log(error)
            }
        }, timerPrenotazione)
        this.prenotazione.push({ ...prenotazione, timeout: idTimeout })
    }

    startTimoutPrenotazioneIniziata(prenotazione) {
        this.stopTimeoutPrenotazione(prenotazione)
        const timerPrenotazione = (prenotazione.consegna - prenotazione.ritiro) + 300000
        let idTimeout = this.setTimeoutPrenotazione(async function () {
            pagamentoModel.generaRitardoConsegna(prenotazione)
            notificheModel.inviaNotificaRitardoConsegna({ id: prenotazione.idUtente })
            Timers.startTimersRitardiAutomatici(prenotazione)
        }, timerPrenotazione)
        this.prenotazione.push({ ...prenotazione, timeout: idTimeout })
    }

    static startTimersRitardiAutomatici(prenotazione) {
        const timerPrenotazione = 1800000
        let idRitardiAutomatici = setInterval(function () {
            console.log("RITARDO")
            pagamentoModel.generaRitardoConsegna(prenotazione)
            notificheModel.inviaNotificaRitardoConsegna({ id: prenotazione.idUtente })
        }, timerPrenotazione)
        Timers.ritardiAutomatici.push({ ...prenotazione, timeout: idRitardiAutomatici })
    }

    static stopTimersRitardiAutomatici(prenotazione) {
        Timers.ritardiAutomatici.forEach((element, index, arr) => {
            if (ObjectId(element._id).toString() === ObjectId(prenotazione._id).toString()) {
                clearInterval(arr[index].timeout)
                Timers.ritardiAutomatici.splice(index, 1)
            }
        })
    }

    setTimeoutPrenotazione(callback, timer) {
        const timeout = setTimeout(function () {
            clearTimeout(timeout);
            callback.apply(this, [])
        }, timer)
    }
}

module.exports = Timers