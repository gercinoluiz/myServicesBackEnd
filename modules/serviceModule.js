const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const serviceSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },

    sercretaria: String,
  },
  { timestaps: true }
);

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
