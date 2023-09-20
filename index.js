require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const bodyParser = require("body-parser");
const db = require("./config/database");
const userRoutes = require("./routes/userRoutes");



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/user', userRoutes)
app.set('secretKey', "guruji")


app.get("/", (req, res) => {
  res.send("Hey, server is runnning ")
})

app.listen(port, () => {
  console.log("Server running on port " + port);
});

