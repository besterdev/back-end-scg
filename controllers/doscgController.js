const express = require("express");
const router = express.Router();
const ObjectID = require("mongoose").Types.ObjectId;

const { Doscg } = require("../models/Doscg");

router.get("/", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  ); // If needed
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  try {
    const bucketListItems = await Doscg.find();
    if (!bucketListItems) throw new Error("No bucketListItems");
    const sorted = bucketListItems.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
    res.status(200).json(sorted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
