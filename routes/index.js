var express = require('express');
var router = express.Router();
var getcurrentLocationForcast = require('./../utils/currentLocationForecast')


/* GET home page. */


router.get("/", (req, res,next) => {
 res.render("index")
});



router.post("/", (req, res) => {
 getcurrentLocationForcast(res,req.body)

})



module.exports = router;


