const moongose = require("mongoose");

const userSchema = moongose.Schema({
  username: {
    type: String,
    required: [true, "Username is required!"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
  },
  role: {
    type: String,
    default: "default",
  },
});

module.exports = moongose.model("user", userSchema);
