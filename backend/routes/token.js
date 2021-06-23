const express = require('express');
const withAuth = require('../middleware/auth');
var router = express.Router();


router.get("/verificaToken", withAuth, function(req, res){
    res.status(200).send();
});

module.exports = router