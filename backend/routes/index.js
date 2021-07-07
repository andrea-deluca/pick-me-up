var express = require('express');
const withAuth = require('../middleware/auth');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('index', { title: 'PickMeUp!' });
});

router.get("/checkToken", withAuth, function(req, res){
  res.sendStatus(200)
})

module.exports = router;
