const express = require('express');
const session = require("express-session");
const { ResumeToken } = require('mongodb');
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
    res.status(status.code);
    if (status.code === 202) {
      res.cookie("token", status.utente.token, { httpOnly: true });
    }
    res.send(status.utente)
  })
})

module.exports = router;