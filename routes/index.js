var express = require('express');
const bcrypt = require('bcrypt');
var router = express.Router();
const UserModel = require('../models/User');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/register', (req, res) => {
  res.render('register');
})

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body; // destructuring ES6

    const hashedPassword = await bcrypt.hash(password, 10); // 123 => ádfádgádzzzxxx

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
});

router.post('/login', async (req, res) => {
  try {
    // return res.send(req.body);
    const { email, password } = req.body;

    

    // Check if email and password is empty
    if(!email || !password) return res.redirect('/login');

    // Check if email does not match with users in database.
    const user = await UserModel.findOne({email});
    console.log("🚀 ~ file: index.js ~ line 49 ~ router.post ~ user", user);
    if (!user) return res.redirect('/login');

    // Check if password does not match with existing password in database.
    user.checkPassword(password, async (err, result) => {
      console.log("🚀 ~ file: index.js ~ line 54 ~ user.checkPassword ~ result", result)
      if (err) return res.redirect('/login');

      if (!result) return res.redirect('/login');
      
      const token = await user.createToken();

      return res.status(200).json({...user, token});
    })

  } catch (error) {
    console.log("🚀 ~ file: index.js ~ line 43 ~ router.post ~ error", error) // control + option + l
    return res.redirect('/login');
  }
})

module.exports = router;
