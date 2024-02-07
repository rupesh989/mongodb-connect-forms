
const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const collection = require("./config");

const app = express();
//convert data in json format
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

//register users

app.post("/signup", async (req, res) => {
  const data = {
    name: req.body.username,
    password: req.body.password,
  };

  //check user exists before
  const existingUser = await collection.findOne({ name: data.name });

  if (existingUser) {
    res.send(`User already exists`);
  } else {
    // hash the password using bcrypt

    const saltRounds = 10; //no. of slat for bcrpyt
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    data.password = hashedPassword; // replace the hash pass woth originalk

    const userdata = await collection.insertMany(data);
    console.log(userdata);
  }
});

//login users

app.post("/login", async (req, res) => {
  try {
    const check = await collection.findOne({ name: req.body.username });
    if (!check) {
      res.send("username cannot find");
    }
    //compare apassword hsad
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      check.password
    );
    if (!isPasswordMatch) {
      res.render("home");
    } else {
      res.send("Wrong Password");
    }
  } catch (error) {
    res.send("Wrong Details");
  }
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
