'use strict';

const express = require('express');
const router = express.Router();

const ChStationsController = require('../controller/ChStationsController');
const logInController = require('../controller/log-in-controller');

//when the client requests a URI, the corresponding controller function will be called


//router.get('/move/:moveId', chessListController.move)

router.route('/').get((req, res) => { res.redirect('/home') });
router.route('/login').get(logInController.checkAuthenticated, logInController.showLogInForm);
router.route('/login').post(logInController.doLogin);
router.route('/logout').get(logInController.doLogout);
router.post('/register', logInController.doRegister);


//router.route('/home').get(logInController.checkAuthenticated, chessController.getHomePage);

router.get('/home', ChStationsController.Home)
// post location, radious
router.post('/map', ChStationsController.ChargingStationsInArea)
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



module.exports = router;