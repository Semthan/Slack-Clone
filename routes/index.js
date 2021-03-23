const express = require('express');
const router  = express.Router();
const {ensureAuthenticated} = require("../config/auth");
const Channel = require('../models/channel');

router.use(express.urlencoded({ extended: true }));

//login page
router.get('/', (req,res)=>{
        res.render('welcome');
})

//register page
router.get('/register', (req,res)=>{
    res.render('register');
})


//dashboard
router.get('/dashboard',ensureAuthenticated,(req,res)=> {
    Channel.find((error,data) => {
        if (error) return console.error(error)
        res.render('dashboard', { user: req.user, channels: data})
    })

})


module.exports = router; 