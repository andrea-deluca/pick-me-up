const express = require('express');
var router = express.Router();
let gestioneUtentiModel = require("../models/GestioneUtenti");

router.get("/fetchUtenti", function(req, res){
    gestioneUtentiModel.fetchUtenti(function(result){
        if(result === 500){
            res.status(result).send("Internal Server Error")
        } else{
            res.status(result.status).send(result.utenti)
        }
    })
})

module.exports = router