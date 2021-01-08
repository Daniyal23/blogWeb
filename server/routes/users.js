const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const users = require('../controllers/users');
const passport = require("passport");


router.post('/signup', users.signup);
router.post('/login', users.login);
router.get('/getAllUsers', passport.authenticate('jwt', { session: false }), users.getAllUsers);
router.delete('/deleteUsers/:id', passport.authenticate('jwt', { session: false }), users.deleteUsers);
router.get('/getUsersById/:id', passport.authenticate('jwt', { session: false }), users.getUsersById);
router.post('/updateUser/:id', passport.authenticate('jwt', { session: false }), users.updateUser);
router.get('/getUserAccountType/:id', passport.authenticate('jwt', { session: false }), users.getUserAccountType);

router.post('/createAdmin', users.createAdmin);


module.exports = router;

