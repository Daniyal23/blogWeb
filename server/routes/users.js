const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const users = require('../controllers/users');

router.post('/signup', users.signup);
router.post('/login', users.login);
router.get('/getAllUsers', users.getAllUsers);
router.delete('/deleteUsers/:id', users.deleteUsers);
router.get('/getUsersById/:id', users.getUsersById);
router.post('/updateUser/:id', users.updateUser);
router.get('/getUserAccountType/:id', users.getUserAccountType);


module.exports = router;
