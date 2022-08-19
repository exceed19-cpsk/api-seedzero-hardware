const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
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
  },
  { versionKey: false }
);

const userModel = mongoose.model("User", userSchema, "User");

module.exports = userModel;
