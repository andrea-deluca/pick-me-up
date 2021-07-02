const { config } = require("../db/config");
const { makeDb } = require("../db/dbmiddleware");
const { ObjectId } = require("mongodb");


class Timers {
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
                                    { $set: { stato: "ATTIVA" } }
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

    updateTimeoutAttivazionePrenotazione(prenotazione) {
        this.prenotazione.forEach((element, index, arr) => {
            if (element._id === prenotazione._id) {
                clearTimeout(arr[index].timeout)
                this.prenotazione.splice(index, 1)
                this.startTimeoutAttivazionePrenotazione(prenotazione)
            }
        })
    }

    stopTimeoutAttivazionePrenotazione(prenotazione) {
        this.prenotazione.forEach((element, index, arr) => {
            if (element._id === prenotazione._id) {
                clearTimeout(arr[index].timeout)
                this.prenotazione.splice(index, 1)
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