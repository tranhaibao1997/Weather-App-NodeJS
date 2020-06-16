var express = require('express');
var router = express.Router();
var getForeCast=require('./../utils/forecast')


/* GET home page. */


router.get("/", (req, res) => {
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


