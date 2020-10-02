const { response } = require("express");
const Service = require("../modules/serviceModule");
const cathAsync = require("../ultils/catchAsync");

exports.createService = async (req, res, next) => {
  await Service.create(req.body, (err, newService) => {
    err ? res.status(200).json(err) : res.status(200).json(newService);
  });
};

exports.getAllServices = cathAsync(async (req, res, next) => {
  console.log("getAllServices");
  const allServices = await Service.find().sort({ name: 1 });

  res.status(200).json({
    status: "success",
    data: {
      services: allServices,
    },
  });
});

exports.updateService = cathAsync(async (req, res, next) => {
  const id = req.params.serviceId;
  const name = req.body.name;

  const updatedService = await Service.findByIdAndUpdate(
    id,
    { name },
    {
      new: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    status: "success",
    data: {
      oldService: name,
      updatedService,
    },
  });
});

exports.deleteService = cathAsync(async (req, res, next) => {
  console.log("deleteService");

  const id = req.params.serviceId;

  await Service.findByIdAndDelete(id);

  res.status(200).json({
    status: "success",
  });
});
