var express = require('express');
var router = express.Router();
let autenticazioneModel = require("../models/Autenticazione");

router.post('/registraUtente', function(req, res) {
  autenticazioneModel.registraUtente(req.body, function(status){
    if(status === 400){
      res.status(status);
      console.log(status)
      res.send();
    } else{
      res.status(status);
      res.send()
      console.log(req.body)
      console.log("Cliente registrato")
    }
  })
});

module.exports = router;