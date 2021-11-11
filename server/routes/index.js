
var express = require('express');
var router = express.Router();

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true}));

let indexController = require('../controllers/index');

/* GET home page. */
router.get('/', indexController.displayHomePage);

/* GET home page. */
router.get('/home', indexController.displayHomePage);

/* GET About page. */
router.get('/about', indexController.displayAboutPage);

module.exports = router;
