const mongoose = require("mongoose");

const Doscg = mongoose.model("Doscg", {
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = { Doscg };
