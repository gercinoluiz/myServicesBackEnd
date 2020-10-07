const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name!"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"], // for validation
  },
  photo: {
    type: String,
    // default: "default.jpg",
  },
  role: {
    type: String,
    enum: ["viewer", "admin"],
    default: "viewer",
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "passwords don`t match",
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

//Hashing the passWord
userSchema.pre("save", async function (next) {
  // does not run at first time

  if (!this.isModified("password")) next();

  // hashing the password with the cost of Twelve

  this.password = await bcrypt.hash(this.password, 12);

  // clean the password Confirm Field

  this.passwordConfirm = undefined;

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
