const express = require('express');
const router = express.Router();

const viewsController = require('./controllers/viewsController');
const authController = require('./controllers/authController');
const classesController = require('./controllers/classesController');

// HOME PAGE
router.get('/', authController.isLoggedIn, viewsController.homePage);

router.get('/study', authController.isLoggedIn, viewsController.shouldGoToLogin, viewsController.studyPage);

router.get('/give-classes', viewsController.giveClassesPage);

router.get('/login', viewsController.loginPage);

router.get('/register', viewsController.register);

router.post('/classes/save-class', classesController.saveClass);

router.post('/signin', authController.signin);
router.post('/signup', authController.signup);
router.post('/logout', authController.logout);

module.exports = router;