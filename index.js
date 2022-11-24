const express = require("express");
const generateToken = require("./utils/generateToken");
const sendMail = require("./utils/nodemailer");
const app = express();
const cors = require("cors");

// middleware
app.use(express.json());
app.use(cors());
let users = [
  {
    username: "taher",
    email: "taher@gmail.com",
    password: "123456",
    id: 1,
    isActive: false,
    activationCode: "aaaaaaa"
  }
];

app.post("/api/signup", async (req, res) => {
  try {
    const user = { ...req.body, isActive: false, activationCode: "ccccccc" };
    users.push(user);

    sendMail(req.body.email, "ccccccc");
    res.send({ msg: "check your mail for activate account" });
  } catch (error) {
    res.status(500).send({ msg: "Something went wrong!" });
  }
});

app.post("/api/signin", async (req, res) => {
  try {
    const user = users.find(user => user.email === req.body.email);
    if (!user) {
      return res.status(400).send({ msg: "email not exist" });
    }
    const matchPassword = user.password === req.body.password;
    if (!matchPassword) {
      return res.status(400).send({ msg: "password incorrect" });
    }
    if (user && matchPassword && !user.isActive) {
      return res
        .status(400)
        .send({ msg: "go to your boite email and activate your account" });
    }

    // token
    const token = generateToken();

    const { password, ...rest } = user;
    res.status(200).send({ msg: "user login with success", user: rest, token });
  } catch (error) {
    res.status(500).send({ msg: "Something went wrong!" });
  }
});

app.post("/api/verifyuser/:activatecode", async (req, res) => {
  try {
    const user = users.find(
      user => user.activationCode === req.params.activatecode
    );

    if (!user) {
      return res.status(403).send({ msg: "this code is not correct" });
    }
    users = users.map(user =>
      user.activationCode === req.params.activatecode
        ? { ...user, isActive: true }
        : user
    );

    res.send({ msg: "account activated" });
  } catch (error) {
    res.status(500).send({ msg: "Something went wrong!" });
  }
});

app.listen(5000, () => console.log("server running on port 5000"));
