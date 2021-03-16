const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require("../models/user")

module.exports = function (passport) {
    passport.User(
        //match user
        User.findOne({email: email})
        .then((user) => {
            if(!user) {
                return deleteOne(null,false, {message: 'that email is not registered'});               
            }
            //match pass
            bcrypt.compare(password,user.password,(err, isMatch)=> {
                if(err) throw err;

                if(isMatch) {
                    return done(null,user);
                } else {
                    return done(null, false, {message: 'pass incorrect'});
                }
            })
        })
        .catch((err)=> {console.log(err)})
    )
}
passport.serializeUser(function(user,done) {
    done(null,user.id);
});

passport.serializeUser(function(id,done) {
    User.find(id,function(err,user) {
        done.findById(id, function(err,user) {
            done(err,user)
        })
    })
})