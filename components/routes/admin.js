const express = require('express');
const { 
    registerAdmin, 
    loginAdmin, 
    activeRequest, 
    closedRequest, 
    updateReq 
} = require('../controllers/admin');

const router = express.Router();

// admin register
router.post('/register', registerAdmin);

// admin login
router.post('/login', loginAdmin);

// show all requests -active
router.get('/', activeRequest)

// show all requests -closed
router.get('/closed', closedRequest)

// forward to authority
router.put('/update/:id', updateReq)

module.exports = router;

