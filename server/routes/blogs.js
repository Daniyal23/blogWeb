const express = require("express");
const router = express.Router();
const Blogs = require('../controllers/blogs');
const passport = require("passport");

router.get('/getAllBlogs', Blogs.getAllBlogs);
router.post('/addBlog', passport.authenticate('jwt', { session: false }), Blogs.addBlog);
router.get('/getBlogsById/:id', Blogs.getBlogsById);
router.post('/updateBlog/:id', passport.authenticate('jwt', { session: false }), Blogs.updateBlog);
router.delete('/deleteBlog/:id', passport.authenticate('jwt', { session: false }), Blogs.deleteBlog);


module.exports = router;