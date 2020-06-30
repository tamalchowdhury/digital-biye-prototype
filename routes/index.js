// Calling the modules
const express = require('express');
const router = express.Router();
const appController = require('../controllers/appController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const tweetController = require('../controllers/tweetController');
const verificationService = require('../services/verification');
const marriageService = require('../services/marriage');

// Index page
// Make sure user is logged in
router.get('/', appController.dashboard);

// Dashboard page for the Kazi to look and create marriage
router.get('/dashboard', appController.dashboard);

// STEP 1 VoterID marriage verification page,
router.get('/verify', appController.verifyPage);

// This part will get the user to step 2
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
    let husband = await verificationService.mockVerify(
      husband_document_type,
      husband_document_number
    );
    let wife = await verificationService.mockVerify(
      wife_document_type,
      wife_document_number
    );

    if (!husband || !wife)
      throw new Error(
        'The records does not exits, use a different method or try again'
      );

    let data = { ...req.body };
    data.husband_age = husband.age;
    data.husband_date_of_birth = husband.date_of_birth;
    data.wife_age = wife.age;
    data.wife_date_of_birth = wife.date_of_birth;

    // They are verified and both are in good age
    if (husband.age >= 21 && wife.age >= 18) {
      data.husband_age_verified = true;
      data.wife_age_verified = true;
      let marriage = await marriageService.createNew(data);
      res.render('marriage_type', {
        marriage,
      });
    } else {
      res.render('info_page', {
        info: `Husband age is ${husband.age} ${husband_document_type}, and wife age is ${wife.age} ${wife_document_type}. Husband should be at least 21 and wife should be at least 18 years old`,
      });
    }
  } catch (error) {
    res.render('info_page', { info: error });
  }
});

// STEP 2: Marriage type

// Should disable it
router.get('/marriage-type', async function (req, res) {
  res.render('marriage_type');
});

// This will take the user to step 3, form input
router.post('/marriage-type', async function (req, res) {
  let data = { ...req.body };

  try {
    const marriage = await marriageService.updateOne(data);
    res.render('marriage_form', { marriage });
  } catch (error) {
    res.render('info_page', { info: error });
  }
});

// STEP 4: Register and generate the form
router.get('/register-marriage/:id', async function (req, res) {
  try {
    const marriage = await marriageService.getOne(req.params.id);
    res.render('register_marriage', { marriage });
  } catch (error) {
    res.render('info_page', { info: error });
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

// When editing this form page from the dashboard
// Make sure it is secured
router.get('/form/:id', async function (req, res) {
  const marriage = await marriageService.getOne(req.params.id);
  res.render('marriage_form', { marriage });
});

// Update the form and go to the next stage
router.post('/form', async function (req, res) {
  try {
    const marriage = await marriageService.updateOne(req.body);
    res.render('marriage_form', { marriage });
  } catch (error) {
    res.render('info_page', { info: error });
  }

  // marriageService.updateOne();
});

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
