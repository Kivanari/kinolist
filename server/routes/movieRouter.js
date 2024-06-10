const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    res.json({ message: 'Movie created' });
});

router.get('/', (req, res) => {
    res.json({ message: 'List of movies' });
});

router.get('/:id', (req, res) => {
    res.json({ message: `Movie with id ${req.params.id}` });
});

module.exports = router;
