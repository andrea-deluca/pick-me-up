const express = require('express');
var router = express.Router();
let gestioneMezziModel = require("../models/GestioneMezzi");

router.get("/fetchMezzi", function(req, res){
    gestioneMezziModel.fetchMezzi(function(result){
        if(result === 500){
            res.status(result).send("Internal Server Error")
        } else{
            res.status(result.status).send(result.mezzi)
        }
    })
})

router.put("/spostaMezzo", function(req, res){
    gestioneMezziModel.spostaMezzo(req.body, function(result){
        if(result === 500){
            res.status(result).send("Internal Server Error")
        } else {
            res.status(result).send("Il mezzo è stato spostato correttamente.")
        }
    })
})

module.exports = router