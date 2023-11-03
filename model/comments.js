const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
     user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User information is required"],
  },  
    commentText: {
      type: String,
      required: true,
    },      
  },
  { timestamps: true }
);

const Comments = mongoose.model("Comments", schema);
module.exports = Comments;