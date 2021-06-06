const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth');
const { signupValidationRules, loginValidationRules } = require('../../validators/auth');
const validate = require('../../validators/validate');

router.get('/', (_,res) => res.send('Auth works...'));

router.post('/signup', signupValidationRules(), validate, AuthController.signup);
router.post('/login', loginValidationRules(), validate, AuthController.login);

module.exports = router;