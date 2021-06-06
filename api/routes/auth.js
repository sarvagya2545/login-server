const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth');

router.get('/', (_,res) => res.send('Auth works...'));

router.post('/signup', AuthController.signup);

module.exports = router;