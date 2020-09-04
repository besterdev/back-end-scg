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
// router.get("/", async (req, res) => {
//   try {
//     const doscg = await Doscg.find();
//     if (!doscg) throw new Error("Error while retrieving all records.");
//     const sorted = doscg.sort((a, b) => {
//       return new Date(a.date).getTime() - new Date(b.date).getTime();
//     });
//     res.status(200).JSON(sorted);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// router.get("/", (req, res) => {
//   Doscg.find((err, docs) => {
//     if (!err) {
//       res.send(docs);
//       console.log("Successfully retrieving all record");
//     } else {
//       console.log(
//         "Error while retrieving all records : " +
//           JSON.stringify(err, undefined, 2)
//       );
//     }
//   });
// });

router.post("/", async (req, res) => {
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
  const newRecord = new Doscg(req.body);
  try {
    const doscg = await newRecord.save();
    if (!doscg) throw new Error("Error while creating new record.");
    res.status(200).json(doscg);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// router.post("/", (req, res) => {
//   const newRecord = new Doscg({
//     title: `${req.body.title} DOSCG`,
//   });

//   newRecord.save((err, docs) => {
//     if (!err) {
//       res.send(docs);
//       console.log("Successfully creating new record");
//     } else {
//       console.log(
//         "Error while creating new record :" + JSON.stringify(err, undefined, 2)
//       );
//     }
//   });
// });

router.delete("/:id", (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("No record with given id :" + res.params.id);
  }

  Doscg.findByIdAndDelete(req.params.id, (err, docs) => {
    if (!err) {
      res.send(docs);
      console.log("Successfully delete a record");
    } else
      console.log(
        "Error while delete a record :" + JSON.stringify(err, undefined, 2)
      );
  });
});

module.exports = router;
