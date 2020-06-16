// Calling the modules
const express = require('express');
const router = express.Router();
const appController = require('../controllers/appController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const tweetController = require('../controllers/tweetController');
const verificationService = require('../services/verification');

// Index page
router.get('/', appController.indexPage);

// Dashboard page for the Kazi to look and create marriage
router.get('/dashboard', appController.dashboard);

// STEP 1 VoterID marriage verification page,
router.get('/verify', appController.verifyPage);

router.post('/verify', async function (req, res) {
  let {
    husband_name,
    husband_document_type,
    husband_document_number,
    wife_name,
    wife_document_type,
    wife_document_number,
  } = req.body;

  try {
    let husbandAge = await verificationService.mockVerify(
      husband_document_type,
      husband_document_number
    );
    let wifeAge = await verificationService.mockVerify(
      wife_document_type,
      wife_document_number
    );

    res.send(
      `Husband age is ${husbandAge} ${husband_document_type}, and wife age is ${wifeAge} ${wife_document_type}`
    );
  } catch (error) {
    res.send(error);
  }
});

// Single tweet page
router.get('/tweet/:id', tweetController.singleTweetPage);

// API
////////////////////////////////
router.post('/api/tweets/:id/heart', userController.heartTweet);

// Registration page
router.get('/register', userController.registerPage);

// Registration POST request
router.post(
  '/register',
  userController.verifyRegister,
  userController.checkUserExists,
  userController.registerUser,
  authController.login
);

// Login POST action
router.post('/login', authController.login);

// Logout route
router.get('/logout', authController.logout);

// Account page
router.get('/account', authController.isLoggedIn, userController.accountPage);

// Form page
router.get('/form', userController.formPage);

// Request registration page
router.get('/request', userController.requestRegPage);

router.post(
  '/account',
  userController.upload,
  userController.resize,
  userController.accountUpdate
);

// Uploading a profile image
router.post(
  '/upload',
  userController.upload,
  userController.resize,
  userController.accountUpdate
);

// Tweet Specific routes
///////////////////////////////
router.post('/tweet', tweetController.postTweet);

router.get(
  '/delete/:id',
  authController.isLoggedIn,
  tweetController.deleteTweet
);

// Profile Page at the end because :username
router.get('/:username', userController.profilePage);

// Exporting the module
module.exports = router;
