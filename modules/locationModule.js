const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const locationSchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
    },

    location: {
      type: {
        type: String,
        default: "Point",
        enum: ["Point"],
      },

      coordinates: [Number],
    },

    address: {
      street: String,
      nubmer: Number,
      city: String,
      state: String,
      description: String,
    },

    services: [
      {
        type: ObjectId,
        ref: "Service",
      },
    ],
  },
  { timestaps: true }
);

// Creating indexes :

locationSchema.index({ location: "2dsphere" });

const Location = mongoose.model("Location", locationSchema);

module.exports = Location;
