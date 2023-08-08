import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
// import blurbs from "./scripts/blurbs.js");
import { art } from "./scripts/blurbs.js";
let app = express();
const port = 3000;

// view engine setup
app.set("views", "./views");
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("./public"));

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  console.log("500");
  res.status(err.status || 500);
  res.render("error");
});

app.get("/", (req, res) => {
  console.log("this - ", art);
  res.render("index.ejs", { art: art });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
