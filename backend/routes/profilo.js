const express = require('express');
const router = express.Router();
const profiloModel = require("../models/Profilo");

router.put("/modificaCellulare", function (req, res) {
    profiloModel.modificaCellulare(req.body, function (status) {
        if (status.code === 200) {
            res.status(status.code)
            res.send(status.cellulare)
        } else {
            res.status(status).send()
        }
    })
})

router.put("/modificaEmail", function (req, res) {
    profiloModel.modificaEmail(req.body, function (status) {
        if (status.code === 200) {
            res.status(status.code)
            res.send(status.email)
        } else {
            res.status(status).send()
        }
    })
})

router.put("/modificaPassword", function (req, res) {
    profiloModel.modificaPassword(req.body, function (status) {
        res.status(status).send()
    })
})

router.post("/eliminaAccount", function (req, res) {
    profiloModel.eliminaAccount(req.body, function (status) {
        res.status(status).send();
    })
})

module.exports = router;