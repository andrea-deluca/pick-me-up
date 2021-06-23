const express = require('express');
const router = express.Router();
const walletModel = require("../models/Wallet");

router.post("/aggiungiCarta", function(req, res){
    walletModel.aggiungiCarta(req.body, function(status){
        if(status.code === 201){
            res.status(status.code)
            res.send(status.carta)
        } else {
            res.status(status).send();
        }
    })
})

module.exports = router;