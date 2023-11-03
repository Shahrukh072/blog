const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    uid: {
      type: Number,
      unique: [true, "uid must be unique"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User information is required"],
    },   
    wallet: {
      type: Number,
      required: [true, "wallet amount is required"],
    }, 
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Guru",
      },
    ],
  },
  { timestamps: true }
);

const UserDetails = mongoose.model("UserDetails", schema);
module.exports = User;
