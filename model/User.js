const mongoose = require("mongoose");
const db = require("../config/database");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const jwtSecret = 'shah8980';

const userSchema = new mongoose.Schema(
  {    
    uid: {
      type: Number,
      unique: [true, "uid must be unique"],
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    userName: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      validate: {
        validator: function (v) {
          return v.toString().length >= 10;
        },
        message: "myNumber must have at least 10 digits",
      },
    },
    code: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    status: {
      type: String,
      enum: ["blocked", "active"],
      default: "active",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }, 
    password: {
      type: String,
    },
    profileImage:{
      type: String,
    },
    userDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserDetails",
    },
},
{ timestamps: true }
);


userSchema.methods.getJWTToken = function () {
  return jwt.sign({ _id: this._id }, jwtSecret, {
    expiresIn: "15d",
  });
};

// generate password
userSchema.methods.generatePassword = async function (password) {
  let salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
// matchPassword
userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema)

module.exports = User;