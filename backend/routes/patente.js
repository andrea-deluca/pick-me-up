const express = require('express');
const router = express.Router();
const patenteModel = require("../models/Patente");

router.post("/aggiungiPatente", function (req, res) {
    patenteModel.aggiungiPatente(req.body, function (result) {
        if (result === 400) {
            res.status(result).send(`La registrazione della tua patente
            non è andata a buon fine.`)
        } else if (result === 500) {
            res.status(result).send("Internal Server Error");
        } else {
            res.status(result.status).send({
                patente: result.patente,
                message: `La registrazione della tua patente
                è andata a buon fine.`
            })
        }
    })
})

router.put("/modificaPatente", function (req, res) {
    patenteModel.modificaPatente(req.body, function (result) {
        if (result === 400) {
            res.status(result).send(`La modifica della tua patente
            non è andata a buon fine.`)
        } else if (result === 500) {
            res.status(result).send("Internal Server Error");
        } else {
            res.status(result.status).send({
                patente: result.patente,
                message: `La modifica della tua patente
             è andata a buon fine.`
            })
        }
    })
})

router.delete("/eliminaPatente", function (req, res) {
    patenteModel.eliminaPatente(req.body, function (result) {
        if (result === 400) {
            res.status(result).send(`La cancellazione della tua patente
            non è andata a buon fine.`);
        } else if (result === 500) {
            res.status(result).send("Internal Server Error");
        } else {
            res.status(result).send(`La cancellazione della tua patente
                è andata a buon fine.`)
        }
    })
})

module.exports = router;