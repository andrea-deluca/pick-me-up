const express = require('express');
var router = express.Router();
let gestioneCorseModel = require("../models/GestioneCorse");

router.post("/fetchPrenotazioniAutista", function (req, res) {
    gestioneCorseModel.fetchPrenotazioniAutista(req.body, function (result) {
        if (result === 500) {
            res.status(result).send("Internal Server Error")
        } else {
            res.status(result.status).send(result.prenotazioni)
        }
    })
})

router.put("/accettaCorsa", function (req, res) {
    gestioneCorseModel.accettaCorsa(req.body, function (result) {
        if (result === 500) {
            res.status(result).send("Internal Server Error")
        } else {
            res.status(result).send({
                message: `La corsa è stata accetta correttamente.`
            })
        }
    })
})

router.put("/rifiutaCorsa", function (req, res) {
    gestioneCorseModel.rifiutaCorsa(req.body, function (result) {
        if (result === 500) {
            res.status(result).send("Internal Server Error")
        } else {
            res.status(result).send({
                message: `La corsa è stata rifiutata correttamente.`
            })
        }
    })
})

module.exports = router