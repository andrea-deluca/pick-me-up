const express = require('express');
var router = express.Router();
let gestioneImpiegatiModel = require("../models/GestioneImpiegati");

router.get("/fetchImpiegati", function (req, res) {
    gestioneImpiegatiModel.fetchImpiegati(function (result) {
        if (result === 500) {
            res.status(result).send("Internal Server Error")
        } else {
            res.status(result.status).send(result.impiegati)
        }
    })
})

router.put("/cambiaRuolo", function (req, res) {
    gestioneImpiegatiModel.cambiaRuolo(req.body, function (result) {
        if (result === 500) {
            res.status(result).send("Internal Server Error")
        } else {
            res.status(result).send(`Il ruolo dell'impiegato è stato cambiato con successo.`)
        }
    })
})

module.exports = router