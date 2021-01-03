const express = require("express");
const router = express.Router();
const Blogs = require('../controllers/blogs');

router.get('/getAllBlogs', Blogs.getAllBlogs);
router.post('/addBlog', Blogs.addBlog);
router.get('/getBlogsById/:id', Blogs.getBlogsById);
router.post('/updateBlog/:id', Blogs.updateBlog);


module.exports = router;