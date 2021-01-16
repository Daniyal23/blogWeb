const express = require("express");
const router = express.Router();
const passport = require("passport");
const controller = require("./controller");
let {SEND_RESPONSE} = require('../../../utils/helpers');


router.get('/getAllBlogs', async (req, res) => {
    try {
        let data = await controller.getAllBlogs(req,res);
        
        res.status(200).send( data);
    } catch (error) {
        
        res.status(500).send( error);
    }
});
router.post('/addBlog', passport.authenticate('jwt', { session: false }),async (req, res) => {
    try {
        let data = await controller.addBlog(req,res);
        
        res.status(200).send( data);
    } catch (error) {
        
        res.status(500).send( error);
    }
});
router.get('/getBlogsById/:id', async (req, res) => {
    try {
        let data = await controller.getBlogsById(req,res);
        
        res.status(200).send( data);
    } catch (error) {
        
        res.status(500).send( error);
    }
});
router.post('/updateBlog/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        let data = await controller.updateBlog(req,res);
        
        res.status(200).send( data);
    } catch (error) {
        
        res.status(500).send( error);
    }
});
router.delete('/deleteBlog/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        let data = await controller.deleteBlog(req,res);
        
        res.status(200).send( data);
    } catch (error) {
        
        res.status(500).send( error);
    }
});


module.exports = router;