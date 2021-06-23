const express = require('express');
var router = express.Router();
let autenticazioneModel = require("../models/Autenticazione");

router.post('/registraUtente', function (req, res) {
  autenticazioneModel.registraUtente(req.body, function (status) {
    if (status === 400) {
      res.status(status);
      console.log(status)
      res.send();
    } else {
      res.status(status);
      res.send()
      console.log(req.body)
      console.log("Cliente registrato")
    }
  })
});

router.get('/confermaRegistrazione/:key', function (req, res) {
  autenticazioneModel.confermaRegistrazione(req.params.key, function (status) {
    res.status(status);
    console.log(status);
    res.redirect("http://localhost:3000/registrazione-confermata");
  })
})

router.post('/accedi', function (req, res) {
  autenticazioneModel.accedi(req.body, function (status) {
    if (status.code === 202) {
      res.status(status.code);
      //res.cookie("token", status.utente.token, { httpOnly: true });
      res.send(status)
    } else{
      res.status(status).send()
    }
  })
});

router.post("/recupero-password", function (req, res){
  autenticazioneModel.recuperaPassword(req.body, function(status){
    res.status(status).send();
  })
});

module.exports = router;