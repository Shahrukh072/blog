const { file } = require("googleapis/build/src/apis/file");
const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const schema = new mongoose.Schema(
  {  
    blogId: {
      type: String,
    },
    title: {
      type: String,
    },
    titleImage: {
      data: Buffer, 
      contentType: String,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    tags: {
      type: [
        {
          type: String,
          enum: [
            "Travels",
            "Sports",           
          ],
        },
      ],
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comments",
      },
    ],
    category: {
      type: String,
    },
    date: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["blocked", "active"],
      default: "active",
    },
    mainBlog: {
      type: Boolean,
      default: false,
    },
    homePageBlog: {
      type: Boolean,
      default: false,
    },
    htmlContent: {
      type: String,
    },
    description: {
      type: String,
    },
    authorName: {
      type: String,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

schema.plugin(mongoosePaginate);
const Blog = mongoose.model("Blog", schema);
schema.index({ title: "text" });
module.exports = Blog;
