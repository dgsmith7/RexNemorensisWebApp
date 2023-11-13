import express from "express";
import * as blurbs from "./utils/components/blurbs.js";
import * as utils from "./utils/utils.js";
let app = express();
const port = 3000;

// view engine setup
app.set("views", "./views");
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("./public"));

app.get("/", (req, res) => {
  res.render("index.ejs", {
    art1: blurbs.titleText1,
  });
});

app.post("/entry", async (req, res) => {
  let move = req.body.move;
  let gameState = req.body.gameState;
  let reply = utils.processMove(move, gameState);
  gameState = reply.gameState;
  res.send({
    move: move,
    reply: reply.message,
    gameState: gameState,
  });
});

app.post("/menu", async (req, res) => {});

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function (err, req, res, next) {
//   console.log("500");
//   res.status(err.status || 500);
//   res.render("error");
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
