// Drugrouter.js

var express = require("express");
var router = express.Router();
var Drug = require("../model/drugsModel.js");
const { getBucket } = require("../firebase");
const path = require("path");
const fs = require("fs");

// GET all
router.get("/", (req, res) => {
  Drug.find().exec((err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(data);
  });
});

// GET 1
router.get("/:_id", (req, res) => {
  Drug.findById(req.params._id).exec((err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(data);
  });
});

// POST (create new data)
router.post("/", async (req, res) => {
  const imagesMediaLink = [];

  // post image to firebase
  const files = req.files;
  console.log(files);
  const bucket = getBucket();
  for (const file of files) {
    const filePath = path.join(__dirname, "../", file.path);
    const response = await bucket.upload(filePath, {
      predefinedAcl: "publicRead",
    });
    const fileMetaData = await response[0].getMetadata();

    const mediaLink = fileMetaData[0].mediaLink;

    imagesMediaLink.push(mediaLink);

    // delete image in Back End
    fs.unlinkSync(filePath);
  }

  const drugData = JSON.parse(req.body.data);

  const drug = new Drug({
    ...drugData,
    images: imagesMediaLink,
  });

  drug.save((err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send("เพิ่มข้อมูลเรียบร้อย");
  });
});

// PUT (update current data)
router.put("/:_id", async (req, res) => {
  const imagesMediaLink = [];

  // post image to firebase
  const files = req.files;
  console.log(files);
  const bucket = getBucket();
  for (const file of files) {
    const filePath = path.join(__dirname, "../", file.path);
    const response = await bucket.upload(filePath, {
      predefinedAcl: "publicRead",
    });
    const fileMetaData = await response[0].getMetadata();

    const mediaLink = fileMetaData[0].mediaLink;

    imagesMediaLink.push(mediaLink);

    // delete image in Back End
    fs.unlinkSync(filePath);
  }

  const drugData = JSON.parse(req.body.data);

  if (imagesMediaLink.length === 0) {
    Drug.findByIdAndUpdate(
      req.params._id,
      {
        ...drugData,
      },
      (err, data) => {
        if (err) return res.status(400).send(err);
        res.status(200).send("อัพเดทข้อมูลเรียบร้อย");
      }
    );
  } else {
    // ลบรูปใน firebase

    Drug.findByIdAndUpdate(
      req.params._id,
      {
        ...drugData,
        images: imagesMediaLink,
      },
      (err, data) => {
        if (err) return res.status(400).send(err);
        res.status(200).send("อัพเดทข้อมูลเรียบร้อย");
      }
    );
  }
});

// DELETE (delete 1 data)
router.delete("/:_id", (req, res) => {
  // ลบรูปด้วยไอสัส
  Drug.findByIdAndDelete(req.params._id, (err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send("ลบข้อมูลเรียบร้อย");
  });
});

module.exports = router;
