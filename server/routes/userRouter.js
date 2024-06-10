const express = require('express');
const router = express.Router();

router.post('/registration', (req, res) => {
    res.json({ message: 'Registration successful' });
});

router.get('/login', (req, res) => {
    res.json({ message: 'Login page' });
});

router.get('/auth', (req, res) => {
    res.json({ message: 'ura' });
});

module.exports = router;
