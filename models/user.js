const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userId: {
    type: String,
  },
  led: {
    type: String,
  },
  button: {
    type: String,
  },
  ldr: {
    type: String,
  },
});

const userModel = mongoose.model("User", userSchema,"User");

module.exports = userModel;
