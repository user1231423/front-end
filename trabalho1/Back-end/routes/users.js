var express = require('express');
var router = express.Router();
var passport = require('passport');


require('../controllers/passport')(passport); //Passport configuration
router.use(passport.initialize());
router.use(passport.session());

/* Process the login from Post*/
router.post('/login', function(req,res,next){
    passport.authenticate('local-login', function(err,user,info){
        if (err){
            return next(err);
        }
        if(!user){
            return res.send("Tente de novo");
        }else{
            req.logIn(user, function(err){
                if(err){
                    return next(err);
                }
                res.redirect('/profile/' + user.id);
            });
        }
    })
});

module.exports = router;

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.status(401).send("Não esta autenticado!");
    }
}