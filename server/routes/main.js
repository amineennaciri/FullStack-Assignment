const express = require('express');
const router = express.Router();
const homeController = require('./../controllers/home');
const userController = require('./../controllers/user');

router.get('/', homeController.getIndex);
router.get('/signup', userController.getSignUp);
router.post('/postsignup', userController.postSignUp);
router.get('/login', userController.getLogIn);
router.post('/postlogin', userController.postLogIn);
router.get('/logout', userController.getLogOut);
module.exports = router;