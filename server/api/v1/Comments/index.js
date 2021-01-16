const express = require("express");
const router = express.Router();
const passport = require("passport");
const controller = require("./controller");
let {SEND_RESPONSE} = require('../../../utils/helpers');


router.get('/getAllComments', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        let data = await controller.getAllComments(req,res);
        
        SEND_RESPONSE(res, data);
    } catch (error) {
        
        SEND_RESPONSE(res, error);
    }
});
router.post('/addComments', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        let data = await controller.addComments(req,res);
        console.log(data,"comment man");
        SEND_RESPONSE(res, data);
    } catch (error) {
        SEND_RESPONSE(res, error);
    }
});
router.get('/getCommentsById/:id', async (req, res) => {
    try {
        let data = await controller.getCommentsById(req,res);
        
        SEND_RESPONSE(res, data);
    } catch (error) {
        
        SEND_RESPONSE(res, error);
    }
});
router.delete('/deleteComment/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        let data = await controller.deleteComment(req,res);
        
        SEND_RESPONSE(res, data);
    } catch (error) {
        
        SEND_RESPONSE(res, error);
    }
});
router.post('/updateComment/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        let data = await controller.updateComment(req,res);
        
        SEND_RESPONSE(res, data);
    } catch (error) {
        
        SEND_RESPONSE(res, error);
    }
});




module.exports = router;
