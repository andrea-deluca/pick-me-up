const express = require('express');
var router = express.Router();
let gestionePrenotazioneModel = require("../models/GestionePrenotazione");

router.post("/fetchPrenotazioniUtente", function (req, res) {
    gestionePrenotazioneModel.fetchPrenotazioniUtente(req.body, function (result) {
        if (result === 500) {
            res.status(result).send("Internal Server Error")
        } else {
            res.status(result.status).send(result.prenotazioni)
        }
    })
})

router.get("/fetchPrenotazioni", function(req, res){
    gestionePrenotazioneModel.fetchPrenotazioni(function (result) {
        if(result === 500){
            res.status(result).send()
        } else{
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

router.put("/iniziaNoleggio", function (req, res) {
    gestionePrenotazioneModel.iniziaNoleggio(req.body, function (result) {
        if (result === 500) {
            res.status(result).send("Internal Server Error")
        } else {
            res.status(result.status).send({
                prenotazioni: result.prenotazioni,
                message: `Il tuo noleggio è iniziato con successo.`
            })
        }
    })
})

router.put("/terminaNoleggio", function (req, res) {
    gestionePrenotazioneModel.terminaNoleggio(req.body, function (result) {
        if (result === 500) {
            res.status(result).send("Internal Server Error")
        } else {
            res.status(result.status).send({
                prenotazioni: result.prenotazioni,
                message: `La tua prenotazione è terminata con successo.
                Grazie per averci scelto. Alla prossima!`
            })
        }
    })
})

router.put("/estendiNoleggio", function (req, res) {
    gestionePrenotazioneModel.estendiNoleggio(req.body, function (result) {
        if (result === 500) {
            res.status(result).send("Internal Server Error")
        } else if (result === 400) {
            res.status(result).send(`Mi dispiace! Non è possibile eseguire
            l'estensione del noleggio in base ai dati inseriti.`)
        } else {
            res.status(result.status).send({
                prenotazioni: result.prenotazioni,
                message: `Il tuo noleggio è stato esteso con successo.
                Riceverai una email al tuo indirizzo di posta elettronica 
                con la conferma dell'estensione, la fattura e i dettagli del pagamento.`
            })
        }
    })
})

module.exports = router;