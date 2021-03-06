const express = require('express');
var router = express.Router();
const withAuth = require("../middleware/auth")
let autenticazioneModel = require("../models/Autenticazione");

router.post('/registraUtente', function (req, res) {
  autenticazioneModel.registraUtente(req.body, function (result) {
    if (result === 400) {
      res.status(result).send("L'email fornita risulta essere già associata ad un account esistente.");
    } else if (result === 201) {
      res.status(result).send();
    } else {
      res.status(result).send("Internal Server Error.")
    }
  })
});

router.get('/confermaRegistrazione/:key', function (req, res) {
  autenticazioneModel.confermaRegistrazione(req.params.key, function (result) {
    if (result === 500) {
      res.status(result).send("Internal Server Error.");
    } else {
      res.status(result);
      res.redirect("/registrazione-confermata");
    }
  })
})

router.post('/accedi', function (req, res) {
  autenticazioneModel.accedi(req.body, function (result) {
    if (result === 403) {
      res.status(result).send(`Il tuo account non risulta essere attivato.
      Procedi con la verifica via email prima di accedere.`);
    } else if (result === 401) {
      res.status(result).send(`Password errata.`);
    } else if (result === 404) {
      res.status(result).send(`Non è stato trovato nessun account associato
      all'email fornita. Procedi prima con la registrazione.`);
    } else if (result === 500) {
      res.status(result).send("Internal Server Error.")
    } else {
      res.cookie('token', result.token, { httpOnly: true })
      res.status(result.status).send({ user: result.user, token: result.token });
    }
  })
});

router.post("/recupero-password", function (req, res) {
  autenticazioneModel.recuperaPassword(req.body, function (result) {
    if (result === 404) {
      res.status(result).send(`Non è stato trovato nessun account associato
      all'email fornita.`)
    } else if (result === 500) {
      res.status(result).send("Internal Server Error");
    } else {
      res.status(result).send();
    }
  })
});

router.post("/registraImpiegato", function (req, res) {
  autenticazioneModel.registraImpiegato(req.body, function (result) {
    if (result === 400) {
      res.status(result).send("L'email fornita risulta essere già associata ad un account esistente.");
    } else if (result === 201) {
      res.status(result).send();
    } else {
      res.status(result).send("Internal Server Error.")
    }
  })
})

router.get("/logout", function (req, res) {
  res.cookie('token', "", { maxAge: 1 })
  res.status(200).send()
})

module.exports = router;