const User = require("../model/User");
const Blog = require("../model/blogs");
const Comments = require("../model/comments");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError")


exports.createBlogs = catchAsyncError(async (req, res, next) => {
    const {
      title,
      author,
      authorName,
      tags,
      category,
      description,
      htmlContent,
    } = req.body;
    const file = req.file;
  
    if (!title ) {
      return next(
        new ErrorHandler("Please enter all required fields title", 400)
      );
    }
    const formattedAuthorName = authorName.replace(/\s+/g, " ").trim();
  
    // Find the author in the Guru collection using their ID
    const user = await User.findOne({ uid: author });
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }   
  
    const blog = await Blog.create({
      title,
      author: user._id,
      file,
      authorName: formattedAuthorName,
      tags,
      category,
      description,
      htmlContent,
      titleImage,
    });
  
    return res.status(200).json({
      success: true,
      message: "Blog Post created successfully",
      blog,
    });
  });

  exports.getAllBlogs = catchAsyncError(async (req, res, next) => {
    const { page, perPage } = req.query;
    const options = {
      page: parseInt(page, 10) || 1,
      limit: parseInt(perPage, 10) || 20,
      sort: { _id: -1 },
    };
    const blogs = await Blog.paginate({}, options);
  
    if (blogs.length === 0) {
      return next(new ErrorHandler("No blogs found", 404));
    }
  
    return res.status(200).json({
      success: true,
      message: "Blogs found successfully",
      blogs,
    });
  });

  exports.updateBlogs = catchAsyncError(async (req, res, next) => {
    const {
      title,
      author,
      tags,
      category,
      description,
      authorName,
      htmlContent,
    } = req.body;
    const file = req.file;
    const { blogId } = req.query;
  
    if (!blogId) {
      return next(new ErrorHandler("Please provide the blogId to update", 400));
    }
  
    // Find the existing blog using the provided blogId
    let blog = await Blog.findById(blogId);
  
    if (!blog) {
      return next(new ErrorHandler("Blog not found", 404));
    }
  
    // Update the fields if they are provided in the request body
    if (title) {
      blog.title = title;
    }
    if (author) {
      const user = await User.findById(req.user.id);
      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }
      blog.author = user._id;
    }
    if (tags) {
      blog.tags = tags;
    }
    if (category) {
      blog.category = category;
    }
    if (description) {
      blog.description = description;
    }
    if (authorName) {
      blog.authorName = authorName;
    }
    if (htmlContent) {
      blog.htmlContent = htmlContent;
    }
    if (file) {
      blog.titleImage = file;
    }
    
    await blog.save();
  
    return res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog,
    });
  });  

  exports.likesBlogs = catchAsyncError(async (req, res, next) => {
    const { blogId } = req.query;
    const { userId } = req.body;
  
    if (!blogId) {
      return next(new ErrorHandler("Please provide the blogId to like", 400));
    }
  
    if (!userId) {
      return next(
        new ErrorHandler("Please provide the uid of the liking user", 400)
      );
    }
  
    // Find the existing blog using the provided blogId
    const blog = await Blog.findById(blogId);
  
    if (!blog) {
      return next(new ErrorHandler("Blog not found", 404));
    }
  
    // Check if the user has already liked the blog post
    if (blog.likes.includes(userId)) {
      return next(new ErrorHandler("User already liked this blog post", 400));
    }
  
    // Add the user's ObjectId to the likes array
    blog.likes.push(userId);
  
    await blog.save();
  
    // Get the updated list of users who liked the blog post
    const likedUsers = await User.find({ _id: { $in: blog.likes } }, "user");
  
    return res.status(200).json({
      success: true,
      message: "Blog Post liked successfully",
      likes: blog.likes.length,
      likedUsers,
    });
  });
  
  exports.commentsBlogs = catchAsyncError(async (req, res, next) => {
    const { blogId } = req.query;
    const { userId, commentText } = req.body;
  
    if (!blogId) {
      return next(
        new ErrorHandler("Please provide the blogId to add a comment", 400)
      );
    }
  
    if (!userId || !commentText) {
      return next(
        new ErrorHandler(
          "Please provide the uid and commentText of the comment",
          400
        )
      );
    }
  
    // Find the existing blog using the provided blogId
    const blog = await Blog.findById(blogId);
  
    if (!blog) {
      return next(new ErrorHandler("Blog not found", 404));
    }
  
    // Create the comment and add it to the Comment collection
    const comments = await Comments.create({
      user: userId,
      commentText,
      blog: blog._id,
    });
  
    blog.comments.push(userId);
    await blog.save();
  
    return res.status(200).json({
      success: true,
      message: "Comment added successfully",
      comments,
    });
  });