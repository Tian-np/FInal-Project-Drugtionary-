
var mongoose = require("mongoose");

var drugsSchema = mongoose.Schema(
  {
    // กำหนด ชื่อและชนิดของ document เรา
    name: {
      type: Object
    },
    uses: {
      type: Object
    },
    warnings: {
      type: Object
    },
    dosage: {
      type: Number
    },
    detail: {
      type: String
    },
    images: {
      type: Array
    },
    serialNumber: {
      type: String
    },
  },
  {
    // กำหนด collection ของ MongoDB หรือจะไม่กำหนดก็ได้
    collection: "Drugs"
  }
);

// ถ้าไม่ได้กำหนด collection ข้างบน default จะเป็น "foods"
var Drugs = mongoose.model("drugs", drugsSchema);
module.exports = Drugs;