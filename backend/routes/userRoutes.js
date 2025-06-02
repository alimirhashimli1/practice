const express = require('express');
const { registerUser, loginUser, getAllUsers, getUser } = require('../controllers/userController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', getAllUsers);
router.get('/:id', getUser);

module.exports = router;
