const express = require('express');
var router = express.Router();
let prenotazioneModel = require("../models/Prenotazione");

router.post("/fetchDepositi", function (req, res) {
    prenotazioneModel.fetchDepositi(req.body, function (result) {
        if (result === 500) {
            res.status(result).send("Internal Server Error")
        } else {
            res.status(result.status).send(result.depositi)
        }
    })
})

router.post("/fetchVeicoliDisponibili", function (req, res) {
    prenotazioneModel.fetchVeicoliDisponibili(req.body, function (result) {
        if (result === 500) {
            res.status(result).send("Internal Server Error")
        } else if (result === 404) {
            res.status(result).send(`Non sono stati trovati veicoli disponibili.`)
        } else {
            res.status(result.status).send(result.veicoli)
        }
    })
})

router.post("/confermaPrenotazione", function (req, res) {
    prenotazioneModel.confermaPrenotazione(req.body, function (result) {
        if (result === 500) {
            res.status(result).send("Internal Server Error")
        } else {
            res.status(result.status).send(result.prenotazioni)
        }
    })
})

module.exports = router