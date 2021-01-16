const express = require('express');
const router = express.Router();
const User = require('../../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { Result, check } = require('express-validator');
const { response } = require('express');
const passport = require('passport');
const HTTPRESPONSE = require('../../../utils/httpResponses');
dotenv.config();

module.exports = {
  createAdmin: async (req, res) => {
    try {
      console.log('in create admin');
      var UserName = 'admin';
      var Email = 'admin@admin.com';
      var Password = '12345678';
      var Country = 'pak';
      var Avatar = '/assets/avatar1.jpg';
      var accountType = 'admin';
      var status = 'approved';

      let FoundUser = {};
      const user = await User.findOne({
        UserName,
      });
      if (user)
        return HTTPRESPONSE.BAD_REQUEST('Username already exists', {
          error: 'username exists',
        });

      let users = await User.find();
      const checkmail = await Promise.all(
        users.map((user) => bcrypt.compare(Email, user.Email))
      );
      checkmail.map((response, index) => {
        if (response) FoundUser = users[index];
      });
      if (FoundUser._id)
        return HTTPRESPONSE.BAD_REQUEST('email already exists');

      const salt = await bcrypt.genSalt(10);
      Email = await bcrypt.hash(Email, salt);
      Password = await bcrypt.hash(Password, salt);
      const newUser = new User({
        UserName,
        Email,
        Password,
        Country,
        Avatar,
        accountType,
        status,
      });
      const data = await newUser.save();
      // return res.json({ success: 'Added' });
      return HTTPRESPONSE.CREATED('Admin registered successfully', data);
    } catch (err) {
      // console.log("i am here man");
      return HTTPRESPONSE.CONFLICT('Error occurred', error);
    }
  },

  signup: async (req, res) => {
    try {
      let { UserName, Email, Password, Country, Avatar } = req.body;
      let FoundUser = {};
      const user = await User.findOne({
        UserName,
      });
      if (user) return HTTPRESPONSE.BAD_REQUEST('Username already exists');

      let users = await User.find();
      const checkmail = await Promise.all(
        users.map((user) => bcrypt.compare(Email, user.Email))
      );
      checkmail.map((response, index) => {
        if (response) FoundUser = users[index];
      });
      if (FoundUser._id)
        return HTTPRESPONSE.BAD_REQUEST('email already exists');

      const salt = await bcrypt.genSalt(10);
      Email = await bcrypt.hash(Email, salt);
      Password = await bcrypt.hash(Password, salt);
      const newUser = new User({
        UserName,
        Email,
        Password,
        Country,
        Avatar,
      });

      await newUser.save(function (error, obj) {
        if (error) res.send(error);
        return res.json({ success: 'Added' });
      });
    } catch (err) {
      return HTTPRESPONSE.CONFLICT('Error occurred', error);
    }
  },

  login: async (req, res) => {
    try {
      var temp = false;
      var email = req.body.Email;
      var temp2 = false;
      const password = req.body.Password;
      let token = null;

      let users = await User.find();
      if (!users) {
        return HTTPRESPONSE.BAD_REQUEST('No users', {
          error: 'No users',
        });
        // return res.json({ error: 'Password incorrect' });
      }

      for await (let item of users) {
        //users.forEach((item) => {
        //console.log(item.Email, "jeje");
        temp = bcrypt.compareSync(email, item.Email);
        // console.log(temp);
        if (temp == true) {
          temp2 = bcrypt.compareSync(password, item.Password);
          if (temp2 == true) {
            //User Matched
            if (item.status != 'approved') {
              //   return res.json({ error: 'account not approved' });
              return HTTPRESPONSE.CONFLICT('account not approved', {
                error: 'account not approved',
              });
            }
            const payload = {
              id: item.id,
              username: item.UserName,
              accountType: item.accountType,
              avatar: item.Avatar,
              //perm: user.perm
            }; // Create Jwt payload

            //Sign Token

            token = await jwt.sign(payload, process.env.secretOrKey, {
              expiresIn: 3600,
            });
          }
        } else {
          temp == false;
          return HTTPRESPONSE.NOT_FOUND('Account not found', {
            error: 'Account not found',
          });
        }
      }
      // console.log(temp,temp2,"this is the error  ")

      if (temp2 == false) {
        // return res.json({ error: 'Password incorrect' });
        return HTTPRESPONSE.CONFLICT('Incorrect Password', {
          error: 'Incorrect Password',
        });
      }
      if (token) {
        // res.json();
        return HTTPRESPONSE.SUCCESS('User Lgged in', {
          success: true,
          token: 'Bearer ' + token,
        });
      }
    } catch (err) {
      //   return res.status(500).send('Server error');
      return HTTPRESPONSE.CONFLICT('Error occurred', error);
    }
  },
  getAllUsers: async (req, res) => {
    try {
      let users = await User.find();

      if (!users) {
        return res.status(404).json(errors);
      }
      return users;

      //return res.json({ error: "Password incorrect" });
    } catch (err) {
      return res.status(500).send('Server error');
    }
  },

  deleteUsers: async (req, res) => {
    try {
      let user = await User.findOneAndDelete({ _id: req.params.id });
      if (user) {
        res.json('Deleted Successfully');
      } else {
        res.status(404).json({
          nouserfound: 'no user found with that id',
          id: req.params.id,
        });
      }
    } catch (err) {
      return res.status(500).send('Server error');
    }
  },

  getUsersById: async (req, res) => {
    try {
      //console.log(req.param.id)
      let user = await User.findOne({ _id: req.params.id });
      if (user) {
        return res.json(user);
      } else {
        res.status(404).json({
          nouserfound: 'no user found with that id',
        });
      }
    } catch (err) {
      return res.status(500).send('Server error');
    }
  },

  getUserAccountType: async (req, res) => {
    try {
      //console.log(req.param.id)
      let user = await User.findOne({ _id: req.params.id });
      if (user) {
        return res.json(user.accountType);
      } else {
        res.status(404).json({
          nouserfound: 'no user found with that id',
        });
      }
    } catch (err) {
      return res.status(500).send('Server error');
    }
  },

  updateUser: async (req, res) => {
    try {
      let user = await User.findById(req.params.id);
      if (user) {
        user.UserName = req.body.UserName;
        user.Password = req.body.Password;
        user.Avatar = req.body.Avatar;
        user.status = req.body.status;
        user.Country = req.body.Country;
        user.accountType = req.body.accountType;
        user.Email = req.body.Email;

        const data = await user.save();
        return res.json('Update complete');
      } else {
        res.status(404).json({
          nouserfound: 'no user found with that id',
        });
      }
    } catch (err) {
      return HTTPRESPONSE.CONFLICT('Error occurred', error);
    }
  },
};
