const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const users = require("./routes/users");
const blogs = require("./routes/blogs");
//const interactions = require("./routes/interactions");
const comments = require("./routes/comments");
const passport = require("passport");
const dotenv = require('dotenv');
var path = require("path");
var fs = require("fs");

var upload_image = require("./image_upload.js");
var delete_image = require("./image_delete.js");

//const blog = require('./routes/blogs')
//import blog from '



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
require('./middleware/auth')(passport);



// Routes
// app.use('/api/auth', require('./routes/auth'));
app.use("/users", users);
//app.use("/blogs", blogs);
//app.use("/interactions", interactions);
app.use("/comments", comments);
app.use('/blogs', blogs)

///////////////
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});
app.use(express.static(__dirname + '/'));

// Image POST handler.
app.post("/image_upload", function (req, res) {
    console.log("img");
    upload_image(req, function (err, data) {

        if (err) {
            return res.status(404).end(JSON.stringify(err));
        }
        setTimeout(function () {
            console.log('hello world!');
            console.log("http://localhost:3000/" + data.link, "from server")
            data.link = "http://localhost:3000" + data.link;
            res.send(data);
        }, 5000);

    });
});

app.post('/delete_image', function (req, res) {

    console.log("in delete");
    delete_image(req, function (err, data) {

        if (err) {
            return res.status(404).end(JSON.stringify(err));
        }
        return res.end();
    });
});

// Create folder for uploading files.
var filesDir = path.join(path.dirname(require.main.filename), "assets");

if (!fs.existsSync(filesDir)) {
    fs.mkdirSync(filesDir);
}
////////

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server Started on Port ${PORT}`));
