const express = require('express');
const { signup, login, access } = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/access', access);

module.exports = router;
