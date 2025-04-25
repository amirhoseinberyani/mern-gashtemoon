const express = require("express");
const http = require("http");
const cors = require("cors");
const app = express();
const server = http.createServer(app);

app.use(cors());

// config dotenv
require("dotenv").config();

// config bodyparser
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

//set public folder
app.use(express.static("public"));

// mongoose
const mongoose = require("mongoose");
mongoose.connect(`mongodb://mongo:27017/perisanLocals`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.set("strictQuery", true);

// config file upload
// const fileUpload = require("express-fileupload");
// app.use(
//   fileUpload({
//     createParentPath: true,
//   })
// );

//config cors

// routes version 1
const addLocale2ReqMiddleware = require("./src/middlewares/addLocale2Req");
const V1Router = require("./src/routes");
app.use(addLocale2ReqMiddleware, V1Router);

server.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`);
});
