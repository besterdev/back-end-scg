"use strict";
require("./db");
const line = require("@line/bot-sdk");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");

const express = require("express");
const mongoose = require("mongoose");
const { MONGOURI } = require("./keys");
const bodyParser = require("body-parser");
const DOSCGRoutes = require("./controllers/doscgController");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//  X, Y, 5, 9, 15, 23, Z function finding X, Y, Z value
let a = 1;
let b = -3;
let c = 5;
let handlerSeriesX = (n) => {
  //an = a*n**2 - b*n + c
  let result = a * n ** 2 + b * n + c;
  return `resultValue :${result}`;
};
console.log(handlerSeriesX(1));

// A = 21, A + B = 23, A + C = -21 function finding B and C value
let A = 21;
let AB = 23;
let AC = -21;
let find = () => {
  let B = AB - A;
  let C = AC - A;
  return `B:${B} & C:${C}`;
};
console.log(find());

io.on("connection", (socket) => {
  socket.join("line").emit("connectToRoom", "you are in room.");
  socket.emit("status", "connection");
  console.log("user join roon");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// create LINE SDK config from env variables
const config = {
  channelAccessToken:
    "0oAnGk4witDZy91wJ61qOwXyFYj11DAFugQseVBVyC8ZKEkUWDidkV7eINrAR0RlNLtYyxcQwNOdicyCbwHcqo81eQ8oTY/ToiNYFVsa91IGjDR9WlxCqIbGSZtv0AOHbpKgjoAymZ/PhcOuiQEmDgdB04t89/1O/w1cDnyilFU=",
  channelSecret: "633ad03ffab15be8df62c2fa71f0a8c1",
};

// create LINE SDK client
const client = new line.Client(config);

app.post("/callback", line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// Set static folder
app.use(express.static(path.join(__dirname, "/public")));

// event handler
function handleEvent(event) {
  if (event.type !== "message" || event.message.type !== "text") {
    // ignore non-text-message eventผ
    return Promise.resolve(null);
  } else if (event.message.type == "message" || event.message.text == "B") {
    const payload = {
      type: "text",
      text: "Hello Test 1.",
    };
    return client.replyMessage(event.replyToken, payload);
  }
  // create a echoing text message
  // let count = event.message.text;
  io.in("line").emit("message", event.message.text);
  const echo = {
    type: "text",
    text: ` AI does not recognize your message : ${event.message.text} , please wait for the admin to reach out to you soon`,
  };
  // use reply API
  return client.replyMessage(event.replyToken, echo);
}

//Middleware

app.use(bodyParser.json());

app.use("/doscg", DOSCGRoutes);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// password: MOs8XjEBszG38ePZ
