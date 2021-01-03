const mongoose = require("mongoose");
//const config = require("config");
//const db = config.get("mongoURI");
//const db = require("./keys").mongoURI;
const dotenv = require('dotenv');
dotenv.config();
const db = process.env.mongoURI;


const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log("mongoDb connected");
  } catch (err) {
    console.error(err.message);

    process.exit(1);
  }
};

module.exports = connectDB;
