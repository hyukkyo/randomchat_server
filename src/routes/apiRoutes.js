const express = require('express');
const { userInfo } = require('../controllers/userController');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/user', authenticateToken, userInfo);

module.exports = router;
