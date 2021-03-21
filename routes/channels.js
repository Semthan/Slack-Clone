const express = require('express');
const router = express.Router();


router.use(express.urlencoded({ extended: true }));

const Channel = require('../models/channel');

router.get('/createChannel', (req,res)=>{
  res.render('createChannel');
})

router.post('/createChannel', (req,res) => {
  const channel = new Channel({
      name: req.body.name,
      description: req.body.description || ''
  })

  channel.save((error) => {
      if (error) return console.error(error)
      console.log('Channel created.');
      res.redirect('/dashboard');
  })
})

router.get('/delete/:id', (req,res) => {
  Channel.deleteOne({_id: req.params.id}, (err,data) => {
      if (err) return console.error(err);
      res.redirect('/dashboard');
  })
})


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