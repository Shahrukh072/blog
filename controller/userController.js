const User = require("../model/User");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/sendTocken");
const catchAsyncError = require("../middleware/catchAsyncError")
const bcrypt = require('bcrypt');
const {appendEmailToGoogleSheet} = require("../utils/googleSheets");


exports.signup = catchAsyncError(async(req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    gender,
    code,
    password,
  } = req.body;

  if (!firstName || !lastName || !phone || !code || !password)
    return next(
      new ErrorHandler(
        "Please enter all field (firstName, lastName,  phone,  image, code)",
        400
      )
    );
  let user;
  const file = req.file;
  // console.log(file)
  console.log("email", email);

  if (email) {
    user = await User.findOne({ email });
    if (user) return next(new ErrorHandler("User Already Exist", 409));
  }
  if (phone) {
    user = await User.findOne({ phone: phone.trim() });
    if (user)
      return next(new ErrorHandler("Please Login ,Number Alraedy Exist", 409));
  }


  // logic for creating a UID
  let uid = 1;
  const last = await User.findOne().sort({ field: "asc", _id: -1 }).limit(1);
  if (last) {
    uid = last.uid + 1;
  }
  //logic for creating unique userName
  let userName = `${firstName}${lastName}`;
  userName = userName.replace(/\s/g, "");
  userName = userName.toUpperCase();
  userName = userName + uid;

  user = await User.create({
    firstName,
    lastName,
    email: email ? email : "",
    phone: phone.trim(),
    gender,
    uid,
    code,
    userName,
    password,
    profileImage: file ? file.path : '',
  });


  user.password = await user.generatePassword(password);
  await user.save();
 
  return res.status(200).json({
    success: true,
    message: 'Registered Successfully',
    user,      
  });
});


exports.signin = catchAsyncError(async(req, res, next) => {
  const { email, password } = req.body;

    const user = await User.findOne({ email});
    if (!user) {
      return next(new ErrorHandler("User doesn't exist  Signup first", 400));
    }

    const isPasswordValid = await user.matchPassword(password);
    if (!isPasswordValid) {
      return next(new ErrorHandler("Invalid password. Please try again.", 400));
    }
    
  const payload = {
    email: user.email,
    userId: user._id, 
  };
  const JWTtoken = jwt.sign(payload, req.app.get('secretKey'), {
    expiresIn: '30d',
  });

    return res.status(200).json({
      success: true,
      message: 'Sign in successfull',
      token: JWTtoken,
    });   
});

exports.saveEmailToGs = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new ErrorHandler("Please enter email", 400));
  }

  // Append email to Google Sheet
  const updateEmail = await appendEmailToGoogleSheet(email);

  if (!updateEmail) {
    return next(new ErrorHandler("Error while saving email ", 400));
  }
  res.status(200).json({
    success: true,
    message: "Email saved successfully!",
  });
});




