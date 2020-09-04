require("./db");
const express = require("express");
const mongoose = require("mongoose");
const { MONGOURI } = require("./keys");
const bodyParser = require("body-parser");
const DOSCGRoutes = require("./controllers/doscgController");


//Middleware
const app = express();
app.use(bodyParser.json());

app.use("/doscg", DOSCGRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// password: MOs8XjEBszG38ePZ
