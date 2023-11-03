// const { UserDetails } = require("../model/userDetails");
const catchAsyncError = require("../middleware/catchAsyncError")
const ErrorHandler = require("../utils/errorHandler");
const User = require("../model/User");
const { generateAgoraTokenControler } = require("../utils/agoraFunctions.js");


exports.generateAgoraTokenAdmin = catchAsyncError(
    async (req, res, next) => {
      const { uid } = req.query;
      const result = await generateAgoraTokenControler(uid);
      // console.log(result);
      return res.status(200).json({
        success: true,
        message: "Token generated successfully",
        ...result,
      });
    }
  );