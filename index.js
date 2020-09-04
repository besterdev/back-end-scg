require("./db");
const express = require("express");
const mongoose = require("mongoose");
const { MONGOURI } = require("./keys");
const bodyParser = require("body-parser");
const DOSCGRoutes = require("./controllers/doscgController");

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

//Middleware
const app = express();
app.use(bodyParser.json());

app.use("/doscg", DOSCGRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// password: MOs8XjEBszG38ePZ
