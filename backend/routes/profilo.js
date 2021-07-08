const express = require('express');
const router = express.Router();
const profiloModel = require("../models/Profilo");

router.put("/modificaCellulare", function (req, res) {
    profiloModel.modificaCellulare(req.body, function (result) {
        if (result === 404) {
            res.status(result).send(`La modifica del numero di cellulare 
            non è andata a buon fine.`)
        } else if (result === 500) {
            res.status(result).send("Internal Server Error")
        } else {
            res.status(result.status).send({
                cellulare: result.cellulare,
                message: `La modifica del numero di cellulare 
                è andata a buon fine.`
            })
        }
    })
})

router.put("/modificaEmail", function (req, res) {
    profiloModel.modificaEmail(req.body, function (result) {
        if (result === 404) {
            res.status(result).send(`La modifica della email
            non è andata a buon fine.`);
        } else if (result === 500) {
            res.status(result).send("Internal Server Error");
        } else {
            res.status(result.status).send({
                email: result.email,
                message: `La modifica della email è andata a buon fine.`
            })
        }
    })
})

router.put("/modificaPassword", function (req, res) {
    profiloModel.modificaPassword(req.body, function (result) {
        if (result === 400) {
            res.status(result).send(`La modifica della tua password 
            non è andata a buon fine.`)
        } else if (result === 403) {
            res.status(result).send(`Password errata.`)
        } else {
            res.status(result).send(`La modifica della tua password
            è andata a buon fine.`)
        }
    })
})

router.post("/eliminaAccount", function (req, res) {
    profiloModel.eliminaAccount(req.body, function (result) {
        if (result === 500) {
            res.status(result).send("Internal Server Error");
        } else {
            res.status(result).send();
        }
    })
})

router.post("/fetchDatiUtente", function (req, res) {
    profiloModel.fetchDatiUtente(req.body, function (result) {
        if (result === 500) {
            res.status(result).send()
        } else {
            res.status(result.status).send(result.utente)
        }
    })
})

module.exports = router;