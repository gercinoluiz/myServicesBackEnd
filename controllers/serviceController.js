const Service = require("../modules/serviceModule");

exports.createService = async (req, res, next) => {
  await Service.create(req.body, (err, newService) => {
    err ? res.status(200).json(err) : res.status(200).json(newService);
  });
};
