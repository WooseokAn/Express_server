var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //console.log('request params id' + req.params.id);
  res.render('index', { title: 'Hi Express'});
});

module.exports = router;
