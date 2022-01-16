var express = require('express');
const bcrypt = require('bcrypt');
var router = express.Router();
const UserModel = require('../models/User');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body; // destructuring ES6

    const hashedPassword = await bcrypt.hash(password, 10);

    const data = {
      name,
      email,
      password: hashedPassword
    }
  
    const user = await UserModel.create(data);
    if(user) return res.redirect('/login');
  } catch (error) {
    console.log("🚀 ~ file: index.js ~ line 24 ~ router.post ~ error", error)
    next(error)
  }
})

router.get('/login', (req, res) => {
  res.render('login')
})

module.exports = router;
