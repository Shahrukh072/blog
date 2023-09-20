const mongoose = require("mongoose");
const db = require("../config/database");
// const bcrypt = require("bcrypt");
const saltrounds = 10;

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    isActive: {
      type: Boolean,
      default: true
    },
    role:{
      type: String,
      required: true,
      default: 'user'
    },
  },
  { timestamps: true }
);

// userSchema.pre('save', function(next){
//   this.password = bcrypt.hashSync(this.password, saltrounds)
//   next();
// })

const User = mongoose.model("User", userSchema)

module.exports = User;