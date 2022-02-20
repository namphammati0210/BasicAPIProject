var express = require('express');
var router = express.Router();
const UserController = require('../../controller/userController');


/* GET users listing. */
router.get('/users', UserController.findAllUsers);

router.get('/user/:userId', UserController.findUserById);

module.exports = router;
