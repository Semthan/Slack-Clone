const express = require('express')
const router = express.Router()

//login page
router.get('/', (req, res) => {
    res.render('Welcome')
})

//Register page
router.get('register', (req,res) => {
    res.render('Register')
})

module.exports = router