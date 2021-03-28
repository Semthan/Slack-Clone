const express = require('express');
const router = express.Router();
router.use(express.urlencoded({ extended: true }));

const Channel = require('../models/channel');
const Msg = require('../models/message');

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
  Channel.findById(req.params.id, (error, channel) => {
    if (error) return console.error(error);
    res.render('chat.ejs', { channel: channel, user: req.user });
  })
})

router.post('/:id', (req,res) => {
  const msg = new Msg({
    by: req.user.name,
    byId: req.user._id,
    content: req.body.content
  })
  Channel.updateOne(
    {_id: req.params.id },
    { $push: {messages: msg}},
    (error) => {
        if(error) return console.log(error)
        res.redirect(`/channels/${req.params.id}`)
    }
  )
})

module.exports = router;