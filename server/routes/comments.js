const express = require("express");
const router = express.Router();
const Comments = require('../controllers/comments');
const passport = require("passport");

router.get('/getAllComments', passport.authenticate('jwt', { session: false }), Comments.getAllComments);
router.post('/addComments', passport.authenticate('jwt', { session: false }), Comments.addComments);
router.get('/getCommentsById/:id', Comments.getCommentsById);
router.delete('/deleteComment/:id', passport.authenticate('jwt', { session: false }), Comments.deleteComment);
router.post('/updateComment/:id', passport.authenticate('jwt', { session: false }), Comments.updateComment);




module.exports = router;
