const express = require('express');
const router = express.Router();
const walletModel = require("../models/Wallet");

router.post("/aggiungiCarta", function (req, res) {
    walletModel.aggiungiCarta(req.body, function (result) {
        if (result === 400) {
            res.status(result).send(`La registrazione del tuo metodo di pagamento
            non è andata a buon fine.`)
        } else if (result === 500) {
            res.status(result).send("Internal Server Error");
        } else {
            res.status(result.status).send({
                metodoPagamento: result.carta,
                message: `La registrazione del tuo metodo di pagamento
                è andata a buon fine.`
            })
        }
    })
})

router.put("/modificaCarta", function (req, res) {
    walletModel.modificaCarta(req.body, function (result) {
        if (result === 400) {
            res.status(result).send(`La modifica del tuo metodo di pagamento
            non è andata a buon fine.`)
        } else if (result === 500) {
            res.status(result).send("Internal Server Error");
        } else {
            res.status(result.status).send({
                metodiPagamento: result.metodiPagamento,
                message: `La modifica del tuo metodo di pagamento 
             è andata a buon fine.`
            })
        }
    })
})

router.delete("/eliminaCarta", function (req, res) {
    walletModel.eliminaCarta(req.body, function (result) {
        if (result === 400) {
            res.status(result).send(`La cancellazione del tuo metodo di pagamento
            non è andata a buon fine.`);
        } else if (result === 500) {
            res.status(result).send("Internal Server Error");
        } else {
            res.status(result.status).send({
                metodiPagamento: result.metodiPagamento,
                message: `La cancellazione del tuo metodo di pagamento
                è andata a buon fine.`
            })
        }
    })
})

module.exports = router;