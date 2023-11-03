 const sendToken = (res, user, message, statusCode = 200, newUser) => {
    const token = user.getJWTToken();
    const options = {
      expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      // secure: true,
      sameSite: "none",
    };
  
    res.status(statusCode).json({
      success: true,
      message,
      newUser,
      token,
    });
  };

  module.exports = sendToken;
  