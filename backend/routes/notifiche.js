const express = require('express');
var router = express.Router();
let notificheModel = require("../models/Notifiche");

router.post("/fetchNotificheUtente", function (req, res) {
    notificheModel.fetchNotificheUtente(req.body, function (result) {
        if (result === 500) {
            res.status(result).send("Internal Server Error")
        } else if (result === 404) {
            res.status(result).send({
                message: `Non hai nuove notifiche`
            })
        } else {
            res.status(result.status).send(result.notifiche)
        }
    })
})

module.exports = router