// index.js

var express = require("express");
var cors = require("cors");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
const multer = require("multer");
const fs = require("fs");

const { v4: uuidv4 } = require("uuid");

var mongo_uri =
  "mongodb+srv://drugtionary:drugtionary@cluster0.rnz5m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.Promise = global.Promise;
mongoose
  .connect(mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(
    () => {
      console.log("[success] task 2 : connected to the database ");
    },
    (error) => {
      console.log("[failed] task 2 " + error);
      process.exit();
    }
  );

// upload image to firebase
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync("./images")) {
      fs.mkdirSync("./images");
    }
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.split(".");
    cb(null, uuidv4() + "." + fileName[fileName.length - 1]);
  },
});

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(multer({ storage: storage }).array("images"));

var port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("[success] task 1 : listening on port " + port);
});

app.get("/", (req, res) => {
  res.status(200).send("หน้าแรกของ api express");
});

// path สำหรับ MongoDB ของเรา
var Drugs = require("./router/drugRouter");
app.use("/api/drugs", Drugs);

// path สำหรับ MongoDB ของเรา
var User = require("./router/auth");
app.use("/api/user", User);

var Schedule = require("./router/scheduleRouter");
app.use("/api/schedule", Schedule);

app.use((req, res, next) => {
  var err = new Error("ไม่พบ path ที่คุณต้องการ");
  err.status = 404;
  next(err);
});
