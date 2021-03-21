const express = require('express');
const router = express.Router();


router.use(express.urlencoded({ extended: true }));

const Channel = require('../models/channel');

router.get('/:id', (req,res) => {
  Channel.findById(req.params.id, (error,data) => {
    if (error) return console.error(error);
    res.render('chat.ejs', { channel: data });
  })
})


/* router.get('/chat', (req, res) => {
  res.render('chat');
})

router.get('/createChannel', (req, res) => {
  res.render('createChannel')
}) */

module.exports = router;