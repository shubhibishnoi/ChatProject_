const Pusher = require("pusher");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.json())
app.use(bodyParser.json());
require("dotenv").config();

app.use(cors({
  origin: "*",
  optionsSuccessStatus: 200,
  credentials: true
}));

app.use(function(req, res, next) {
  res.header('Content-Type', 'application/json;charset=UTF-8')
  res.header('Access-Control-Allow-Credentials', true)
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})
const pusher = new Pusher({
  appId: process.env.APPID,
  key: process.env.KEY,
  secret: process.env.SECRET,
  cluster: process.env.CLUSTER,
  useTLS: true,
});

let chat = [];

app.post("/message", async (req, res) => {
  // console.log("message",req.body);
  const payload = req.body;
  chat.push(payload);
  // console.log(req.query.channel);
  await pusher.trigger(req.query.channel, "message", {
    username: payload.username,
    message: payload.message,
    time: payload.time
  });
  res.json(payload);
});

app.post("/userTyping", async (req, res) => {
  const username = req.body.username;
  const channelName = req.query.channelName;
  pusher.trigger(channelName, "user_typing", {
    username: username
  });
  res.status(200).send();
});


app.get('/previousChat', async (req, res) => {
  res.status(200).json(chat);
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
