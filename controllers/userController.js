const User = require("../modules/userModule");
const catchAsync = require("../ultils/catchAsync");

exports.createUser = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  res.status(200).json({
    status: "success",
    data: {
      newUser,
    },
  });
});
