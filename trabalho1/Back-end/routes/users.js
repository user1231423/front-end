var express = require('express');
var router = express.Router();
var passport = require('passport');


require('../controllers/passport')(passport); //Passport configuration
router.use(passport.initialize());
router.use(passport.session());

/* Process the login from Post*/
router.post('/login', passport.authenticate('local-login'));

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