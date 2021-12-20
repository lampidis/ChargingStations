'use strict';

const express = require('express');
const router = express.Router();

const chessController = require('../controller/chess-controller');
const logInController = require('../controller/log-in-controller');

//when the client requests a URI, the corresponding controller function will be called


//router.get('/move/:moveId', chessListController.move)

router.route('/').get((req, res) => { res.redirect('/home') });
router.route('/login').get(logInController.checkAuthenticated, logInController.showLogInForm);
router.route('/login').post(logInController.doLogin);
router.route('/logout').get(logInController.doLogout);
router.post('/register', logInController.doRegister);


router.route('/home').get(logInController.checkAuthenticated, chessController.getHomePage);

// post location, radious
router.post('/map', ChStationsController.ChargingStationsInArea)
// post user/company id
router.post('/user/info', ChStationsController.getUserInfo)
router.post('/company/info', ChStationsController.getCompanyInfo)

router.get('/evs', ChStationsController.getAvailableEvs)
router.get('/')

// post user id, comment/review/checkIn/favorite_id
router.post('/user/comment', ChStationsController.addComment)
router.post('/user/review', ChStationsController.addReview)
router.post('/user/checkIn', ChStationsController.addCheckIn)
router.post('/user/favorite/station', ChStationsController.addFavoriteStation)
router.post('/user/favorite/company', ChStationsController.addFavoriteCompany)



router.get('/playerStats', logInController.checkAuthenticated, chessController.getAllStats)
router.get('/openings', logInController.checkAuthenticated, chessController.getOpenings)
router.get('/selfAnalyzing', logInController.checkAuthenticated, chessController.getSelfAnalyzing)
router.get('/endings', logInController.checkAuthenticated, chessController.getEndings)
router.get('/puzzles', logInController.checkAuthenticated, chessController.getPuzzles)

module.exports = router;