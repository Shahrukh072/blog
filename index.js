require("dotenv").config();
const express = require("express");
const app = express();
const cors = require('cors');
const port = process.env.PORT || 8080;
const bodyParser = require("body-parser");
const {ErrorMiddleware} = require("./middleware/Error");
const db = require("./config/database");
const userRoutes = require("./routes/userRoutes");
const liveRoutes = require("./routes/liveRoutes");
const blogRoutes = require("./routes/blogRoutes");


app.use(ErrorMiddleware);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/user', userRoutes)
app.use('/live', liveRoutes)
app.use('/blog', blogRoutes)
app.set('secretKey', "shahrukh")


app.get("/", (req, res) => {
  res.send("Hey, server is runnning ")
})

app.listen(port, () => {
  console.log("Server running on port " + port);
});


