var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(req.query.id);
  console.log(req.query.people);
  console.log(req.query.tent);
  //console.log(req.params.id);
  console.log('usersRouter end');
  res.render('index', { title: 'Hi Express'});
});

module.exports = router;
