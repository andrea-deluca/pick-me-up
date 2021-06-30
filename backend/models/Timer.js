const { config } = require("../db/config")
const { makeDb } = require("../db/dbmiddleware")
const createError = require("http-errors")
const { ObjectId } = require("mongodb")
const gestionePrenotazioneModel = require("./GestionePrenotazione")

module.exports = {
    setTimerAttivazionePrenotazione: async function (data){
        // AGGIUNGERE 15 MINUTI PRIMA DEL RITIRO
        const timer = new Date(data.ritiro.data) - new Date()
        setTimeout(async function(){
            const db = await makeDb(config);
            try {
                db.collection("Prenotazione").findOneAndUpdate(
                    {_id: ObjectId(data._id)},
                    {$set: {stato: "ATTIVA"}}
                )
            } catch (error) {
                console.log(error)
            }
        }, timer)
    }
}