
const mongoose = require("mongoose");

const connect = mongoose.connect("mongodb://localhost:27017/signup-tut");
//make a folder name signup-tut in mongodb compass or should already exists

// check connection server with DB

connect
  .then(() => {
    console.log(`successfully connected `);
  })
  .catch(() => {
    console.log(`No connection`);
  });

// create a schema

const LoginSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// collection part
const collection = new mongoose.model("users", LoginSchema);
//users named collection in mongoDB compass

module.exports = collection;
