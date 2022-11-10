const express = require("express");
const mongoose = require("mongoose");
const app = express();
const login_router = require("./router/login-router");
const cors = require("cors");
const dotenv = require("dotenv");

app.use(cors());

let env = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : ".env";
dotenv.config({ path: env.trim() }); // env setup

app.use(express.json()); // to parser request content_type:json

app.use(express.urlencoded({ extended: true })); // parse request content-type:form-data;

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });
mongoose.Promise = global.Promise;

app.use("/", login_router);

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log("connection Failed", err);
  });
// app.use(express.static("Hoitalent"));

const port = process.env.PORT;

app.listen(port, () => {
  console.log("server is listening at port", port);
});
