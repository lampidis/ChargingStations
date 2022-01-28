'use strict';

const express = require('express');
const router = express.Router();

const ChStationsController = require('../controller/ChStationsController');
const logInController = require('../controller/log-in-controller');

//when the client requests a URI, the corresponding controller function will be called


//router.get('/move/:moveId', chessListController.move)

router.route('/').get((req, res) => { res.redirect('/home') });
router.get('/login', logInController.checkAuthenticated, logInController.showLogInForm);
router.post('/login', logInController.doLogin);
router.get('/logout', logInController.doLogout);
router.post('/register', logInController.doRegister);


//router.route('/home').get(logInController.checkAuthenticated, chessController.getHomePage);

router.get('/home', ChStationsController.Home)
// post location, radious
router.post('/map', ChStationsController.ChargingStationsInArea)
router.post('/chStation/info', ChStationsController.ChargingStationInfo)
// post user/company id
router.get('/user/info', ChStationsController.getUserInfo)
router.get('/company/info', ChStationsController.getCompanyInfo)
router.get('/evs', ChStationsController.AvailableEvs)

// // post user id, comment/review/checkIn/favorite_id
router.post('/user/comment', ChStationsController.postComment)
// router.post('/user/review', ChStationsController.addReview)
// router.post('/user/checkIn', ChStationsController.addCheckIn)
// router.post('/user/favorite/station', ChStationsController.addFavoriteStation)
// router.post('/user/favorite/company', ChStationsController.addFavoriteCompany)

router.post('/addCharger', ChStationsController.addCharger)

// requests from simulator
router.get('/sim/getRandUser' , ChStationsController.randUser)
router.post('/sim/startCharging' , ChStationsController.startCharging)
router.post('/sim/endCharging' , ChStationsController.endCharging)

module.exports = router;