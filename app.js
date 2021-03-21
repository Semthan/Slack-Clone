const express = require('express');
const app = express();
const router = express.Router();
const session = require('express-session');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const expressEjsLayout = require('express-ejs-layouts')
const passport = require('passport')
require("./config/passport")(passport)
const http = require('http').Server(app)
const io = require('socket.io')(http)
const path = require('path');


//mongoose
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('connected'))
    .catch((err) => console.log(err));

//EJS
app.set('view engine', 'ejs');
app.use(expressEjsLayout);

app.use('/public', express.static(path.join(__dirname, 'public')))

//BodyParser
app.use(express.urlencoded({ extended: false }));

//express session
app.use(session ({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

//use flash
app.use(flash());
app.use((req,res,next)=> {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error')
next();    
})

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg)
        io.emit('chat message', msg);
    })


    socket.on("disconnect", () => {
        console.log("user disconnected")
    })

});

//Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/channels',require('./routes/channels'))

http.listen(3000);// varför inte app.listen? 