const mongoose = require("mongoose");
const mongoosePaginate = require ("mongoose-paginate");

const schema = new mongoose.Schema(
  {
   
    blogId: {
      type: String,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    titleImage: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    content: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BlogContent",
      },
    ],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User information is required"],
    },
    tags: {
      type: [
        {
          type: String,
          enum: [
            "Vedic astrology",
            "Tarot card reading",
            "Kundli",
            "Palmistry",
            "Numerology",
            "Astrology",
            "Zodiac",
            "Festivals",
            "Mythology",
            "Meditation",
            "Lal Kitab",
            "Samudrik Shastra",
            "Transits",
            "Gemstone",
            "Love Compatibility",
            "Festivals",
            "Chalisa",
            "Arti",
            "Black Magic Removals",
            "Mantra",
            "Hindu Mythology",
            "Hindu God and Goddess",
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

const Blog = mongoose.model("Blog", schema);
module.exports = Blog;
