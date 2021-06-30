const express = require('express');
var router = express.Router();
let gestionePrenotazioneModel = require("../models/GestionePrenotazione");

router.post("/fetchPrenotazioniUtente", function (req, res) {
    gestionePrenotazioneModel.fetchPrenotazioniUtente(req.body, function (result) {
        if (result === 404) {
            res.status(result).send("Nessuna prenotazione attiva trovata.")
        } else if (result === 500) {
            res.status(result).send("Internal Server Error")
        } else {
            res.status(result.status).send(result.prenotazioni)
        }
    })
})

router.put("/modificaPrenotazione", function (req, res) {
    gestionePrenotazioneModel.modificaPrenotazione(req.body, function (result) {
        if (result === 500) {
            res.status(result).send("Internal Server Error")
        } else {
            res.status(result.status).send({
                prenotazioni: result.prenotazioni,
                message: `La tua prenotazione è stata modificata con successo.
                Riceverai una email al tuo indirizzo di posta elettronica
                con la conferma e la fattura del pagamento.`
            })
        }
    })
})

router.put("/cambiaMezzoPrenotazione", function (req, res) {
    gestionePrenotazioneModel.cambiaMezzoPrenotazione(req.body, function (result) {
        if (result === 500) {
            res.status(result).send("Internal Server Error")
        } else {
            res.status(result.status).send({
                prenotazioni: result.prenotazioni,
                message: `La tua prenotazione è stata modificata con successo.
                Riceverai una email al tuo indirizzo di posta elettronica
                con la conferma e la fattura del pagamento.`
            })
        }
    })
})

router.delete("/annullaPrenotazione", function (req, res) {
    gestionePrenotazioneModel.annullaPrenotazione(req.body, function (result) {
        if (result === 500) {
            res.status(result).send("Internal Server Error")
        } else {
            res.status(result.status).send({
                prenotazioni: result.prenotazioni,
                message: `La tua prenotazione è stata annullata con successo.
                Riceverai una email al tuo indirizzo di posta elettronica 
                con la conferma e la fattura del rimborso.`
            });
        }
    })
})

module.exports = router;