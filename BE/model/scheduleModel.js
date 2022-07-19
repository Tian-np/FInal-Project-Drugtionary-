var mongoose = require("mongoose");

var scheduleSchema = mongoose.Schema(
  {
    // กำหนด ชื่อและชนิดของ document เรา

    enable: {
      type: Boolean,
    },
    userId: {
      type: String,
    },
    drugId: {
      type: String
    },
    time: {
      type: Date
    },
    detail: {
      type: Object
    }
  },
  {
    collection: "Schedule",
  }
);

var Schedule = mongoose.model("Schedule", scheduleSchema);
module.exports = Schedule;
