const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const users = require("./routes/users");
const blogs = require("./routes/blogs");
const interactions = require("./routes/interactions");
const comments = require("./routes/comments");
const passport = require("passport");
const dotenv = require('dotenv');
dotenv.config();
//Connect Database
connectDB();

//Init Middleware
//app.use(express.json({ extended: false }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
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
app.use("/interactions", interactions);
app.use("/comments", comments);



const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server Started on Port ${PORT}`));
