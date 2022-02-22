var express = require('express');
var router = express.Router();
const UserController = require('../../controller/userController');


/* GET users listing. */
router.get('/users', UserController.findAllUsers);

router.get('/user/:userId', UserController.findUserById);

router.post('/user', UserController.createUser);

router.put('/user/:userId', UserController.updateUser);

router.delete('/user/:userId', UserController.deleteUser);

module.exports = router;
