const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const users = require('../controllers/users');

router.post('/signup', users.signup);
router.post('/login', users.login);
router.get('/getAllUsers', users.getAllUsers);
router.delete('/deleteUsers/:id', users.deleteUsers);
router.get('/getUserById/:id', users.getUserById);
router.post('/updateUser/:id', users.updateUser);


module.exports = router;
