const User = require("../model/User");
// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.signup = async (req, res) => {
  try {
    // We check if user is already signed up
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = await User.create(req.body);

    if (!newUser) {
      return res.status(400).json({ message: "User creation failed" });
    }
    return res.status(200).json({ message: "User created successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err, message: "Internal Server Error" });
  }
};


exports.signin = async (req, res) => {
  try {
    // Is the user valid
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User doesn't exist/ Signup first" });
    }
    const isPasswordValid =  bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }
    console.log(user);
    const { _id, email, firstname, role } = user;
    const JWTtoken = jwt.sign({ _id, email, firstname }, req.app.get('secretKey'), {
      expiresIn : '30d'
    });
    return res
      .status(200)
      .json({ token: JWTtoken, userId: _id , userRole: role, message: "Sign in successfull" });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err, message: "Internal Server Error" });
  }

};


