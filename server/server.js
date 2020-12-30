const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const users = require("./routes/users");
const blogs = require("./routes/blogs");
const passport = require("passport");

//Connect Database
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Passport middleware
app.use(passport.initialize());

// //Passport Config
require('./config/passport')(passport);


// Routes
// app.use('/api/auth', require('./routes/auth'));
app.use("/users", users);
app.use("/blogs", blogs);



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server Started on Port ${PORT}`));
