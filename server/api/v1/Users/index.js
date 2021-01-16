const express = require('express');
const router = express.Router();
const passport = require('passport');
const controller = require('./controller');
let { SEND_RESPONSE } = require('../../../utils/helpers');

router.post('/signup', async (req, res) => {
  try {
    let data = await controller.signup(req, res);
    // res.status(200).send(data);
    SEND_RESPONSE(res, data);
  } catch (error) {
    // res.status(500).send(error);
    SEND_RESPONSE(res, error);
  }
});

router.post('/login', async (req, res) => {
  try {
    let data = await controller.login(req, res);
    // console.log(res);
    // res.status(200).send(data);
    SEND_RESPONSE(res, data);
  } catch (error) {
    // res.status(500).send(error);
    SEND_RESPONSE(res, error);
  }
});

router.get(
  '/getAllUsers',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      let data = await controller.getAllUsers(req, res);
      //   res.status(200).send(data);
      SEND_RESPONSE(res, data);
    } catch (error) {
      //   res.status(500).send(error);
      SEND_RESPONSE(res, error);
    }
  }
);

router.get(
  '/getUsersById/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      let data = await controller.getUsersById(req, res);
      //   res.status(200).send(data);
      SEND_RESPONSE(res, data);
    } catch (error) {
      //   res.status(500).send(error);
      SEND_RESPONSE(res, error);
    }
  }
);
router.get(
  '/getUserAccountType/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      let data = await controller.getUserAccountType(req, res);
      //   res.status(200).send(data);
      SEND_RESPONSE(res, data);
    } catch (error) {
      //   res.status(500).send(error);
      SEND_RESPONSE(res, error);
    }
  }
);
router.post(
  '/updateUser/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      let data = await controller.updateUser(req, res);
      //   res.status(200).send(data);
      SEND_RESPONSE(res, data);
    } catch (error) {
      //   res.status(500).send(error);
      SEND_RESPONSE(res, error);
    }
  }
);
router.delete(
  '/deleteUsers/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      let data = await controller.deleteUsers(req, res);
      res.status(200).send(data);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);
router.post('/createAdmin', async (req, res) => {
  try {
    let data = await controller.createAdmin(req, res);
    // res.status(200).send(data);
    SEND_RESPONSE(res, data);
  } catch (error) {
    // console.log("came heress");
    // console.log(error);
    // res.status(500).send( error);
    SEND_RESPONSE(res, error);
  }
});
module.exports = router;
