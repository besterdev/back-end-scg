const mongoose = require("mongoose");

const Doscg = mongoose.model("Doscg", {
  title: { type: String, require: true },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = { Doscg };
