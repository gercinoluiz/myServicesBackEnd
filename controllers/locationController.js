const catchAsync = require("../ultils/catchAsync");
const Local = require("../modules/locationModule");
const axios = require("axios");
const { query } = require("express");
const mongoose = require("mongoose");

exports.createLocation = catchAsync(async (req, res, next) => {
  console.log(req.body);
  // Getting the street from the body
  const street = req.body.address.street;

  // Converted to encoded
  const encodedStreet = encodeURI(street);

  // fetchin googleAPI
  const googleMapsResponse = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedStreet}&key=${process.env.googleMapsKey}`
  );

  console.log(googleMapsResponse);
  //Extrating the coordinates from google API
  const { lat, lng } = googleMapsResponse.data.results[0].geometry.location;

  // Refactoring the document
  const newDocument = { ...req.body, location: { coordinates: [lat, lng] } };

  // Saving into the DataBase
  const newLocation = await Local.create(newDocument);

  res.status(200).json({
    status: "success",
    data: { newLocation },
  });
});

exports.getLocations = catchAsync(async (req, res, next) => {
  const places = await Local.find().populate({
    path: "services",
    select: "name id",
  });

  res.status(200).json({
    status: "success",
    data: {
      places,
    },
  });
});

exports.getLocationsNear = catchAsync(async (req, res, next) => {
  const [lat, lng] = req.params.latlng.split(",");

  const places = await Local.aggregate([
    //First Stage
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [lat * 1, lng * 1],
        },
        distanceField: "distance",
        distanceMultiplier: 1 / 1000,
      },
    },

    {
      $project: {
        distance: 1,
        name: 1,
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    data: {
      places,
    },
  });
});

exports.getNearLocationByServices = catchAsync(async (req, res, next) => {
  const { serviceId } = req.params;
  const [lat, lng] = req.params.latlng.split(",");

  const serviceIdAsObject = mongoose.Types.ObjectId(serviceId);
  const places = await Local.aggregate([
    //First Stage

    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [lat * 1, lng * 1],
        },
        distanceField: "distance",
        distanceMultiplier: 1 / 1000,
        query: { services: serviceIdAsObject },
      },
    },

    // I gotta use lookUp in agregation pipeline instead of populate

    {
      $lookup: {
        from: "services", // The collection I whant the name for instance
        localField: "services", // the field of the table I current have the id
        foreignField: "_id", // The field of the forign table I wnat to compare with my localfield
        as: "offered services",
      },
    },

    {
      $project: {
        services: 0,
        __v: 0,
      },
    },

    // {$}
  ]);

  res.status(200).json({
    status: "success",
    results: places.length,
    data: {
      places,
    },
  });
});

exports.deletLocation = catchAsync(async (req, res, next) => {
  const id = req.params.LocalId;

  console.log("DeleteLocation", id);

  const deletedLocation = await Local.findByIdAndDelete(id, (err, success) => {
    if (err) {
      return res.status(400).json({
        status: "fail",
      });
    }
  });

  res.status(200).json({
    status: "success",
  });
});

exports.updateLocation = catchAsync(async (req, res, next) => {
  const local = req.body;
  const id = req.params.localId;


  const updateLocal = await Local.findByIdAndUpdate(id, local, {
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    status: "success",
    data: {
      Former: local,
      New: updateLocal,
    },
  });
});
