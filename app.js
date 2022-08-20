const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
const User = require("./models/user");

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
});
app.use(express.json());
app.get("/", function (req, res) {
  var today = new Date();
  var time = today.toLocaleString("en-US", {
    timeZone: "Asia/Bangkok",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  res.json({ time: time });
});

app.post("/users/:userId", async (req, res) => {
  const { params } = req;
  const doesUserExit = await User.exists({ userId: params.userId });
  if (doesUserExit) {
    res.status(400).send("user exists");
  } else {
    const payload = {
      userId: params.userId,
      led: "0",
      button: "0",
      ldr: "1000",
    };

    const user = new User(payload);
    await user.save();
    res.send(`Create ${params.userId} finished`);
  }
});

app.put("/users/:userId/update", async (req, res) => {
  const payload = req.body;
  var checkkey = ["led", "ldr", "button"];
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).end("Please fill the body before sending request.");
  }
  else if (payload.hasOwnProperty("userId")){
    res.status(400).end("userId can't change.");
  }
   else {
    const { params } = req;
    const doesUserExit = await User.exists({ userId: params.userId });
    if (!doesUserExit) {
      res.status(400).send("user not found");
    } else {
      const { userId } = req.params;
      await User.findOneAndUpdate(
        { userId: userId },
        { $set: payload },
        { new: true }
      );
      res.status(200).send("update finished");
    }
  }
});

app.get("/users/:userId", async (req, res) => {
  const { params } = req;
  const doesUserExit = await User.exists({ userId: params.userId });
  if (!doesUserExit) {
    res.status(400).send("user not found");
  } else {
    const { userId } = req.params;
    const user = await User.findOne({ userId: userId },{'_id': 0}).select('userId led button ldr');
    res.json(user);
  }
});
app.listen(port);
