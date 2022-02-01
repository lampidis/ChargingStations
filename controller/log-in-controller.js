'use strict';
const bcrypt = require('bcrypt');
const passport = require('passport');

const model = require('../model/chstations_model.js');


exports.showLogInForm = function (req, res) {
    console.log("got into showLogInForm")
    model.connect((err, result) => {
        res.render('login', {layout: 'loginlayout.hbs', message: err})
    })
}

exports.doRegister = function (req, res) {
    console.log("got into doRegister")
    let body = ''
    req.on('data', chunk=>{
        body = JSON.parse(chunk.toString())
    })
    req.on('end', () => {
        console.log(body)
        var username = body.username
        var password = body.password
        var email = body.email
        model.registerUser(username, password, email, (err, result, message) => {
            if (err) console.error('registration error: ' + err);
            req.session.loggedUserId = result;
            res.status(200).json({ result: result });
        })
    })
}

exports.doLogin = function (req, res) {
    console.log("got into doLogin")
    let body = ''
    req.on('data', chunk=>{
        body = JSON.parse(chunk.toString())
    })
    req.on('end', () => {
        console.log(body)
        var username = body.username
        var password = body.password
        model.getUserByUsernamePassword(username,password, (err, user) => {
            if (user != undefined) req.session.loggedUserId = user.player_id;
            res.status(200).json({ result: result });
            
        })
    })
}

exports.doLogout = (req, res) => {
    console.log("got into doLogout")
    //Σημειώνουμε πως ο χρήστης δεν είναι πια συνδεδεμένος
    req.session.destroy();
    res.redirect('/');
}

//Τη χρησιμοποιούμε για να ανακατευθύνουμε στη σελίδα /login όλα τα αιτήματα από μη συνδεδεμένςου χρήστες
exports.checkAuthenticated = function (req, res, next) {
    console.log("got into checkAuthenticated")
    //Αν η μεταβλητή συνεδρίας έχει τεθεί, τότε ο χρήστης είναι συνεδεμένος
    if (req.session.loggedUserId) {
        console.log("user is authenticated", req.originalUrl);
        //Καλεί τον επόμενο χειριστή (handler) του αιτήματος
        next()
    }
    else {
        //Ο χρήστης δεν έχει ταυτοποιηθεί, αν απλά ζητάει το /login ή το register δίνουμε τον
        //έλεγχο στο επόμενο middleware που έχει οριστεί στον router
        if ((req.originalUrl === "/login") || (req.originalUrl === "/register")) {
            next()
        }
        else {
            //Στείλε το χρήστη στη "/login" 
            console.log("not authenticated, redirecting to /login")
            res.redirect('/login');
        }
    }
}