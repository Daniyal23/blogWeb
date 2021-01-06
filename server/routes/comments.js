const express = require("express");
const router = express.Router();
const Comments = require('../controllers/comments');

router.get('/getAllComments', Comments.getAllComments);
router.post('/addComments', Comments.addComments);
router.get('/getCommentsById/:id', Comments.getCommentsById);
router.delete('/deleteComment/:id', Comments.deleteComment);
router.post('/updateComment/:id', Comments.updateComment);




module.exports = router;
