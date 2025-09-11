const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');

router.get('/', auth.showLogin);
router.post('/login', auth.login);
router.get('/dashboard', auth.dashboard);
router.get('/logout', auth.logout);

module.exports = router;
