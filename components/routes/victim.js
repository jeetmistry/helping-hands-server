const express = require('express');
const { addVictim } = require('../controllers/victim');
const router = express.Router();

// post request
router.post('/register', addVictim);
module.exports = router;

