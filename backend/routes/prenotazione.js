const express = require('express');
var router = express.Router();
let prenotazioneModel = require("../models/Prenotazione");

router.post("/fetchDepositi", function(req, res){
    prenotazioneModel.fetchDepositi(req.body, function(result){
        if(result === 500){
            res.status(result).send("Internal Server Error")
        } else {
            res.status(result.status).send(result.depositi)
        }
    })
})

module.exports = router