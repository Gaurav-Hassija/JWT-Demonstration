const User = require("../model/user-model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Signup
// Post Request Require Username and Password.

const signUp = async (req, res) => {
  try {
    let { username, password } = req.body;
    if (!username || !password) {
      return res.status(401).json({
        success: false,
        error: "Validation Error",
        message: "Username and Password is required!",
      });
    }
    let user = await User.findOne({ username: username });
    if (user) {
      return res.status(401).json({
        success: false,
        error: "Validation Error",
        message: "Username Already Exist! Please use different username",
      });
    }
    let newUser = await User.create(req.body);
    res.status(201).json({
      success: true,
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

//Login
//Post Request. Requires username and password.

const userLogin = async (req, res) => {
  try {
    let { username, password } = req.body;
    username = username.toLowerCase();
    console.log(username);
    if (!username || !password) {
      return res.status(401).json({
        success: false,
        error: "Validation Error",
        Message: "Username and Password is required!",
      });
    }

    let user = await User.findOne({ username: username });
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "Not Found",
        message: "Username does'nt exist in database, Please Signup first!",
      });
    }
    if (user.username != username || user.password != password) {
      return res.status(401).json({
        success: false,
        error: "Bad Authentication",
        message: "Username or Password is incorrect",
      });
    }

    let id = user._id;
    const token = jwt.sign({ id }, process.env.SECRET_KEY);

    res.status(200).json({
      success: true,
      message: "Login Successful",
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

const getData = async (req, res) => {
  try {
    let user = await User.findOne({ _id: res.locals.id });
    res.status(200).json({
      success: true,
      message: `Welcome ${user.username}`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

module.exports = {
  signUp,
  userLogin,
  getData,
};
