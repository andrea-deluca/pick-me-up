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

router.get("/fetchPrenotazioni", function (req, res) {
    gestionePrenotazioneModel.fetchPrenotazioni(function (result) {
        if (result === 500) {
            res.status(result).send()
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
            res.status(result).send({
                message: `La prenotazione è stata modificata con successo.
                È stata inviata una email contenente la conferma e la fattura del pagamento.`
            })
        }
    })
})

router.put("/cambiaMezzoPrenotazione", function (req, res) {
    gestionePrenotazioneModel.cambiaMezzoPrenotazione(req.body, function (result) {
        if (result === 500) {
            res.status(result).send("Internal Server Error")
        } else {
            res.status(result).send({
                message: `La prenotazione è stata modificata con successo.
                È stata inviata una email contenente la conferma e la fattura del pagamento.`
            })
        }
    })
})

router.delete("/annullaPrenotazione", function (req, res) {
    gestionePrenotazioneModel.annullaPrenotazione(req.body, function (result) {
        if (result === 500) {
            res.status(result).send("Internal Server Error")
        } else {
            res.status(result).send({
                message: `La prenotazione è stata annullata con successo.
                È stata inviata una email contenente la conferma e la fattura del rimborso.`
            });
        }
    })
})

router.put("/iniziaNoleggio", function (req, res) {
    gestionePrenotazioneModel.iniziaNoleggio(req.body, function (result) {
        if (result === 500) {
            res.status(result).send("Internal Server Error")
        } else {
            res.status(result).send({
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
            res.status(result).send({
                message: `La tua prenotazione è terminata con successo.
                Grazie per averci scelto. Alla prossima!`
            })
        }
    })
})

router.put("/terminaNoleggioAltro", function (req, res) {
    gestionePrenotazioneModel.terminaNoleggioAltro(req.body, function (result) {
        if (result === 500) {
            res.status(result).send("Internal Server Error")
        } else {
            res.status(result).send({
                message: `La tua prenotazione è terminata con successo.
                È stato applicato un sovrapprezzo a causa della consegna fuori da un nostro
                deposito ed è stata inviata una email contenente la fattura e dettagli del pagamento.`
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
            res.status(result).send({
                message: `Il noleggio è stato esteso con successo.
                È stata inviata una email contenente la conferma dell'estensione, 
                la fattura e i dettagli del pagamento.`
            })
        }
    })
})

module.exports = router;