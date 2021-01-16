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
        return HTTPRESPONSE.CONFLICT('Username already exists', {
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
        return HTTPRESPONSE.CONFLICT('email already exists', {
          error: 'email exists',
        });


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
      if (user) return HTTPRESPONSE.CONFLICT('Username already exists', {
        error: 'Username exists',
      });


      let users = await User.find();
      const checkmail = await Promise.all(
        users.map((user) => bcrypt.compare(Email, user.Email))
      );
      checkmail.map((response, index) => {
        if (response) FoundUser = users[index];
      });
      if (FoundUser._id)
        return HTTPRESPONSE.CONFLICT('Email already exists', {
          error: 'Email exists',
        });


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

      const data = await newUser.save()
      if (!data) { return HTTPRESPONSE.CONFLICT('Error occurred', error); }
      else {
        return HTTPRESPONSE.SUCCESS('Added');
      }

    } catch (error) {
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

      }

      for await (let item of users) {
        temp = await bcrypt.compareSync(email, item.Email);
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
              expiresIn: 3600 * 4,
            });
          }
        } else {
          temp == false;

        }
      }

      if (token) {


        return HTTPRESPONSE.SUCCESS('User Lgged in', {
          success: true,
          token: 'Bearer ' + token,
        });
      }
      else if (temp == false) {
        return HTTPRESPONSE.NOT_FOUND('Account not found', {
          error: 'Account not found',
        });
      }
      else if (temp2 == false) {
        // return res.json({ error: 'Password incorrect' });
        return HTTPRESPONSE.CONFLICT('Incorrect Password', {
          error: 'Incorrect Password',
        });
      }

    } catch (error) {
      //   return res.status(500).send('Server error');
      return HTTPRESPONSE.CONFLICT('Error occurred', error);
    }
  },

  getAllUsers: async (req, res) => {
    try {
      let users = await User.find();

      if (!users) {
        return HTTPRESPONSE.NOT_FOUND('Users not found', {
          error: 'Users not found',
        });
      }
      else {
        return HTTPRESPONSE.SUCCESS('Users list found', users);
      }

      //return res.json({ error: "Password incorrect" });
    } catch (error) {
      //   return res.status(500).send('Server error');
      return HTTPRESPONSE.CONFLICT('Error occurred', error);
    }
  },

  deleteUsers: async (req, res) => {
    try {
      let user = await User.findOneAndDelete({ _id: req.params.id });
      if (user) {
        return HTTPRESPONSE.SUCCESS('Deleted Successfully');
      } else {
        return HTTPRESPONSE.NOT_FOUND('User not found', {
          error: 'User not found',
        });
      }
    } catch (error) {
      //   return res.status(500).send('Server error');
      return HTTPRESPONSE.CONFLICT('Error occurred', error);
    }
  },


  getUsersById: async (req, res) => {
    try {

      let user = await User.findOne({ _id: req.params.id });
      if (user) {
        return HTTPRESPONSE.SUCCESS('user found', user);

      } else {
        return HTTPRESPONSE.NOT_FOUND('User not found', {
          error: 'User not found',
        });
      }
    } catch (error) {
      return HTTPRESPONSE.CONFLICT('Error occurred', error);
    }
  },

  getUserAccountType: async (req, res) => {
    try {

      let user = await User.findOne({ _id: req.params.id });
      if (user) {
        return HTTPRESPONSE.SUCCESS('User Lgged in', user.accountType);

      } else {
        return HTTPRESPONSE.NOT_FOUND('Account not found', {
          error: 'Account not found',
        });
      }
    } catch (error) {
      //   return res.status(500).send('Server error');
      return HTTPRESPONSE.CONFLICT('Error occurred', error);
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
        return HTTPRESPONSE.SUCCESS('Update complete');
      } else {
        return HTTPRESPONSE.NOT_FOUND('Account not found with that id', {
          error: 'Account not found with that id',
        });
      }
    } catch (error) {
      return HTTPRESPONSE.CONFLICT('Error occurred', error);
    }
  },
};
