const express = require('express');
var router = express.Router();
let gestionePrenotazioneModel = require("../models/GestionePrenotazione");

router.post("/fetchPrenotazioniUtente", function (req, res){
    gestionePrenotazioneModel.fetchPrenotazioniUtente(req.body, function (result){
        if(result === 404){
            res.status(result).send("Nessuna prenotazione attiva trovata.")
        } else if(result === 500){
            res.status(result).send("Internal Server Error")
        } else {
            res.status(result.status).send(result.prenotazioni)
        }
    })
})

module.exports = router;