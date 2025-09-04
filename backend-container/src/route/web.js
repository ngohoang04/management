const express = require('express');
const router = express.Router();

// Example route
router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.get('/home', (req, res) => {
    res.send('Welcome to the Home Page!');
});

module.exports = router;
