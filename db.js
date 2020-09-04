const mongoose = require("mongoose");
const { MONGOURI } = require("./keys");

mongoose.connect(
  MONGOURI,
  { useNewUrlParser: true, useUnifiedTopology: true },

  (err) => {
    if (!err) {
      console.log("Mongodb connection succeeded.");
    } else {
      console.log(
        "Error while connecting MongoDB :" + JSON.stringify(err, undefined, 2)
      );
    }
  }
);
