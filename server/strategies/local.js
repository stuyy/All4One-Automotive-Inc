const LocalStrategy = require('passport-local');
const passport = require('passport');
const User = require('../models/User');

passport.serializeUser(function(user, done) {
    console.log("Serializing Local.")
    console.log(user);
    done(null, user);
});
  
passport.deserializeUser(function(user, done) {
    console.log("Deserializing")
    console.log(user)
    User.findOne({username: user.username})
    .then(user => {
        done(null, user.id);
    })
    .catch(err => done(err, null));
});

passport.use(new LocalStrategy(async (username, password, done) => {
    const user = await User.findOne({ username: username });
    if(user)
    {   
        let result = await user.comparePassword(password, user.password);
        return result ? done(null, user) : done(null, false)
    } 
    else
        return done(null, false);
})); 