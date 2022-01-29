if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express')
var bodyParser = require('body-parser');
const app = express()
const session = require("express-session");
const path = require('path');
const url = require('url');

app.use(session({
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET || "PynOjAuHetAuWawtinAytVunar", // κλειδί για κρυπτογράφηση του cookie
    resave: true, // δεν χρειάζεται να αποθηκεύεται αν δεν αλλάξει
    saveUninitialized: false, // όχι αποθήκευση αν δεν έχει αρχικοποιηθεί
    cookie: {
      maxAge: 2*60*60*1000, //TWO_HOURS χρόνος ζωής του cookie σε ms
      sameSite: true
    }
}));
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
//Διαδρομές - Routs
const routes = require('./routes/chstations-routes');
app.use('/', routes);

const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));


module.exports = app;
