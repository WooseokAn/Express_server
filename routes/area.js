var express = require('express');
var cors = require('cors');
var router = express.Router();


/* GET users listing. 
router.get('/', cors(), function(req, res, next) {
  //console.log(req.params.id);
  console.log('usersRouter end');
  res.render('index', { title: 'Hi Express'});
  //return area;
});
*/

const camping_zone_area = 4629;
const tent_area = 4;
const people_area = 2;
const camera_weight = 1.25;     // 8/10
const people_weight = 1.6;      // 6/10
const camera_num = 3;
const dead_area = 900;
const criteria = 50;            // 기준 퍼센트 정규화에 사용
const accuracy = 1.1;           // 9/10

router.get('/', cors(), (req, res) => {
  res.send('here is the congestion');
});

router.post('/', cors(), (req, res) => {
  console.log(req.body);
  console.log(req.body.person, '  ', req.body.tents);

  var peoples = req.body.person;
  var tents = req.body.tents;
  var congestion = accuracy * ((camera_weight * camera_num * (peoples * people_area * people_weight + tent_area * tents)) / (camping_zone_area - dead_area)) * 100;

  var con_grade;
  if(congestion / criteria >= 0.5) {
    con_string = 4
  }
  else if(congestion / criteria < 0.5 && congestion / criteria >= 0.3) {
    con_string = 3;
  }
  else if(congestion / criteria < 0.3 && congestion / criteria > 0.10) {
    con_string = 2;
  }
  else {
    con_string = 1;
  }

  res.json({
    'congestion': congestion.toFixed(2) + '%',
    'congestion_grade': con_grade,
    'camping_zone_area': camping_zone_area,
    'tent_area': tent_area,
    'camera_weight': camera_weight,
    'people_weight': people_weight,
    'camera_num': camera_num,
    'dead_area': dead_area,
    'criteria': criteria,
    'accuracy': accuracy
  });
  res.send('user created');
})

module.exports = router;
