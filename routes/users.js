const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require("../models/user");
const passport = require('passport');

router.use(express.urlencoded({ extended: true }));

//login handle
router.get('/login', (req, res) => {
  res.render('login');
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true,
  }) (req,res,next);
})

//Register handle
//register post handle
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];
  console.log(' Name ' + name + ' email :' + email + ' pass:' + password);
  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please fill in all fields" })
  }
  //check if match
  if (password !== password2) {
    errors.push({ msg: "passwords dont match" });
  }

  //check if password is more than 6 characters
  if (password.length < 6) {
    errors.push({ msg: 'password atleast 6 characters' })
  }
  if (errors.length > 0) {
    res.render('register', {
      errors: errors,
      name: name,
      email: email,
      password: password,
      password2: password2
    })
  } else {
    //validation passed
    User.findOne({ email: email }).exec((err, user) => {
      console.log(user);
      if (user) {
        errors.push({ msg: 'email already registered' });
        res.render('register', { errors, name, email, password, password2 })
      } else {
        const newUser = new User({
          name: name,
          email: email,
          password: password
        });

        //hash password
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt,
            (err, hash) => {
              if (err) throw err;
              //save pass to hash
              newUser.password = hash;
              //save user
              newUser.save()
                .then((value) => {
                  console.log(value)
                  req.flash('success_msg','You have now registered!')
                  res.redirect('/users/login');
                })
                .catch(value => console.log(value));

            }));
      }
    })
  }
})

//logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'new logged out');
  res.redirect('/users/login');
})

router.get('/profile', (req,res) => {
  res.render('profile', {user:req.user} )
})

router.post('/profile/upload', (req,res) => {
  if(req.files){
    let pic = req.files.pic
    const extension = pic.name.split('.').slice(-1)[0];
    let file_name = `/uploads/${req.user._id}.${extension}`

    pic.mv(`.${file_name}`)

    User.updateOne(
      {_id: req.user._id },
      { $set: {profilePic: file_name}},
      (error) =>{
        if (error) console.log(error);
        const msg = "profile picture update"
        res.render('profile', {user: req.user, msg})
      }
    )
  }
  else {
    const message = 'No file uploaded';
    res.render('profile', { user: req.user, message });
  }
})

module.exports = router;