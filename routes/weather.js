var express = require('express');
var router = express.Router();
var getForeCast=require('./../utils/forecast')

/* GET users listing. */
router.get('/', function(req, res, next) {
  if (!req.query.city) {
    res.render("index", {
      greeting: "Hello! Enter the name of your place to get weather forecast"
    });
  }
  else {
    getForeCast(res, req.query.city)
    
  }
});

module.exports = router;
