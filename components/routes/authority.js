const express = require('express');
const { 
    registerAuthority, 
    loginAuthority, 
    progressRequest, 
    closedRequest, 
    updateReq 
} = require('../controllers/authority');

const router = express.Router();

// authority register
router.post('/register', registerAuthority);

// authority login
router.post('/login', loginAuthority);

// show all requests - progress
router.get('/progress', progressRequest);

// show all closed requests - progress
router.get('/', closedRequest)

// close request
router.put('/update/:id', updateReq)


/*
{
    cat: food
    status: active
}
name : xyz
food
clothe
status: closed
*/ 
module.exports = router;
