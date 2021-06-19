var express = require('express');
var router = express.Router();

router.post('/registraUtente', function(req, res, next) {
  res.send(req.body);
});

module.exports = router;