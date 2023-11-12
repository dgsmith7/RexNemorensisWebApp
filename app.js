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
  utils.initialize();
  res.render("index.ejs", {
    art1: blurbs.titleText1,
  });
});

app.post("/entry", async (req, res) => {
  let move = req.body.move;
  let gameState = req.body.gameState;
  let reply = utils.processMove(move, gameState);
  gameState = reply.gameState;
  console.log("r1 - ", reply.message, reply.gameState);
  let reply2 = { message: "", gameState: gameState };
  if (gameState.advance == true) {
    reply2 = utils.processEnemyMove(reply.gameState);
    gameState = reply2.gameState;
    console.log("r2 - ", reply2.message, reply2.gameState);
  }

  console.log("final - ", reply.message, reply.gameState);
  res.send({
    move: move,
    reply: reply.message + reply2.message + utils.getBlurb(blurbs.enterAMove),
    gameState: gameState,
  });
});

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
