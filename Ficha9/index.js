const express = require('express');
const app = express();
const port = 3000;
const publicRoot = './wwwRoot/';

const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');

const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

app.use(express.static(publicRoot));
app.use(bodyParser.json());
app.use(cookieSession({
    name: 'mysession',
    keys:['vueauthrandomkey'],
    maxAge: 24 * 60 * 60 * 1000 //24 Horas
}))

let users = [
    {
        id: 1,
        name: "Jude",
        email: "user@email.com",
        password: "password"
    },
    {
        id: 2,
        name: "Emma",
        email: "ema@email.com",
        password: "password2"
    }
]

app.get('/', function(req,res,next){
    res.sendFile("index.html",{root: publicRoot});
})

const authMiddleware = function(req,res,next){
    if (!req.isAuthenticated()){
        res.status(401).send("Não está autenticado!");
    }else{
        return next();
    }
}

app.get('/api/user', authMiddleware,function(req,res){
    let user = users.find((user) => {
        return user.id === req.session.passport.user;
    })
    console.log([user,req.session]);
    res.send({ users: user });
})

app.post('/api/login', function (req,res,next) {
    passport.authenticate('local', (err,user,info) => {
        if (err){
            return next(err);
        }
        if (!user){
            return res.status(400).send([user,"Não é possivel realizar o Login", info]);
        }

        req.login(user, (err)=> {
            res.send("Logged in");
        })
    }) (req,res,next);
})

app.get('/api/logout', function(req,res){
    req.logout();
    console.log("Logged out");
    return res.send();
})

passport.use(new localStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    (username,password,done) => {
        let user = users.find((user) => {
            return user.email === username && user.password === passport;
        })

        if (user){
            done(null, user);
        }else{
            done(null, false, { message: "Password ou Email Inválidos"});
        }
    }   
))

passport.serializeUser((user,done) =>{
    done(null, user.id);
})

passport.deserializeUser(() =>{
    let user = user.find((user)=>{
        return user.id === id;
    })

    done(null, user);
})

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
})