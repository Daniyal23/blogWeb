const express = require("express");
const router = express.Router();
//const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const passport = require("passport");

//Load Input Validation
//const validateRegisterInput = require("../../validation/register");
//const validateLoginInput = require("../../validation/login");
//Load User Model
const User = require("../models/User");

router.get("/test", (req, res) =>
    res.json({
        msg: "User Works"
    })
);


//@route    GET api/users/register
//@desc     Register user route
//@access   Public
router.post('/signup', async (req, res) => {
    try {
      let { UserName, Email, Password, Country, Avatar } = req.body;
      const user = await User.findOne({
        UserName,
      });
      if (user) return res.json('email already exists');
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
      res.status(500).send('Server error');
    }
  });
router.post("/emailupdate", (req, res) => {
    console.log("in update");
    User.findOne({
        "UserName": req.body.UserName
    }).then(user => {
        if (user) {
            console.log("in update");
            //errors.username = "username already exists";
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(user.Email, salt, (err, hash) => {
                    if (err) throw err;
                    user.Email = hash;
                    user
                        .save()
                        .then(user => {
                            res.json('Update complete')
                                .catch(err =>
                                    res.status(404).json({
                                        nouserfound: "no user found with that id"
                                    })
                                );
                        });
                });

            });
        }
        else {
            console.log("not found in update")
        }
    });
});


/*
router.post("/signup", (req, res) => {
    var bools = false;
    User.find()
        .then(users => {
            if (!users) {
                console.log(req.body.UserName, "in ese 1");
                const newUser = new User({
                    //name: req.body.name,
                    UserName: req.body.UserName,
                    Email: req.body.Email,
                    Password: req.body.Password,
                    Country: req.body.Country,
                    Avatar: req.body.Avatar,
 
 
 
                });
                //console.log(newUser.password, "jeje");
 
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.Password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.Password = hash;
                    });
                });
 
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.Email, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.Email = hash;
                        newUser
                            .save()
                            .then(user => res.json({ success: "Added" }))
                            .catch(err => { return res.json(err.code) });
 
                    });
                });
            }
            users.forEach((item) => {
                console.log(item.Email, "jeje");
                var temp = bcrypt.compareSync(req.body.Email, item.Email);
                /* bcrypt.compareSync(req.body.Email, item.Email).then(isMatch => {
                     if (isMatch) {
                         bools=true;
                         console.log(bools, "this is the bools man focus");
                         return res.json({ error: "email already exists" });
                         
 
                     }
                 });*/
/*
if (temp == true) {
   bools = true;
   console.log(bools, "this is the bools man focus");
   return res.json({ error: "email already exists" });
}
});
if (bools == false) {
 
console.log(req.body.UserName, "in ese");
const newUser = new User({
   //name: req.body.name,
   UserName: req.body.UserName,
   Email: req.body.Email,
   Password: req.body.Password,
   Country: req.body.Country,
   Avatar: req.body.Avatar,
 
 
 
});
//console.log(newUser.password, "jeje");
 
bcrypt.genSalt(10, (err, salt) => {
   bcrypt.hash(newUser.Password, salt, (err, hash) => {
       if (err) throw err;
       newUser.Password = hash;
   });
});
 
bcrypt.genSalt(10, (err, salt) => {
   bcrypt.hash(newUser.Email, salt, (err, hash) => {
       if (err) throw err;
       newUser.Email = hash;
       newUser
           .save()
           .then(user => res.json({ success: "Added" }))
           .catch(err => { return res.json(err.code) });
 
   });
});
}
});
});
 
*/




//@route    GET api/users/login
//@desc     Login user / Return JWT token
//@access   Public
router.post("/login", (req, res) => {

    var temp=false;
    var email = req.body.Email;
    var temp2=false;
    const password = req.body.Password;

    User.find()
        .then(users => {
            if (!users) {
                return res.json({ error: "Password incorrect" });
            }
            users.forEach((item) => {
                console.log(item.Email, "jeje");
                temp=bcrypt.compareSync(email, item.Email);
                if (temp==true){
                    temp2=bcrypt.compareSync(password, item.Password)
                    if (temp2==true){
                         //User Matched

                         const payload = {
                            id: item.id,
                            username: item.UserName
                            //name: user.name,
                            //avatar: user.avatar
                            //perm: user.perm
                        }; // Create Jwt payload

                        //Sign Token
                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            {
                                expiresIn: 3600 * 4
                            },
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: "Bearer " + token

                                });
                            })

                    }   
            }
            else{
                temp==false;
                
            }

        })
        console.log(temp,temp2,"this is the error  ")
       
            if (temp2==false){
                return res.json({ error: "Password incorrect" });
            }
        
        
});

});
/*
//@route    GET api/users/current
//@desc     Return Current user
//@access   Private
router.get(
    "/current",
    passport.authenticate("jwt", {
        session: false
    }),
    (req, res) => {
        res.json({
            //id: req.user.id,
            //name: req.user.name,
            username: req.user.username,
            permission: req.user.permission
        });
    }
);
 
router.get("/getAllUsers",
    passport.authenticate("jwt", {
        session: false
    }),
    (req, res) => {
        User.find()
            .then(users => {
                if (!users) {
                    return res.status(404).json(errors);
                }
                res.json(users);
            })
            //return res.json({ error: "Password incorrect" });
            .catch(err => res.json({
                user: 'There are no users'
            }));
 
    });
 
router.get("/getAll",
    // passport.authenticate("jwt", {
    //     session: false
    // }),
    (req, res) => {
        User.find()
            .then(users => {
                if (!users) {
                    return res.status(404).json(errors);
                }
                res.json(users);
            })
            //return res.json({ error: "Password incorrect" });
            .catch(err => res.json({
                user: 'There are no users'
            }));
 
    });
 
router.delete("/delete/:id", passport.authenticate("jwt", {
    session: false
}),
    (req, res) => {
        User.findOneAndDelete({ '_id': req.params.id })
            .then(user => {
                res.json("Deleted Successfully");
            })
            .catch(err =>
                res.status(404).json({
                    nouserfound: "no user found with that id",
                    id: req.params.id
                })
            );
    });
 
 
router.get("/getUser/:id",
    passport.authenticate("jwt", {
        session: false
    }),
    (req, res) => {
        console.log(req.param.id)
        User.findOne({ '_id': (req.params.id) })
            .then(user => res.json(user))
            .catch(err =>
                res.status(404).json({
                    nouserfound: "no user found with that id"
                })
            );
    });
 
router.post("/update/:id", passport.authenticate("jwt", {
    session: false
}),
    (req, res) => {
        User.findById(req.params.id)
            .then(user => {
                user.username = req.body.username;
                user.perm = req.body.permissions;
                user.password = req.body.password
 
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(user.password, salt, (err, hash) => {
                        if (err) throw err;
                        user.password = hash;
                        user
                            .save()
                            .then(user => {
                                res.json('Update complete')
                                    .catch(err =>
                                        res.status(404).json({
                                            nouserfound: "no user found with that id"
                                        })
                                    );
                            });
 
 
 
                    })
                });
            })
    })
*/

module.exports = router;