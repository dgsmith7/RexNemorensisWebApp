import express from "express";
import * as blurbs from "./utils/blurbs.js";
import * as game from "./utils/game.js";
import * as maps from "./utils/maps.js";

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
  console.log("---app /entry---");
  let reply = "";
  let move = req.body.move;
  let gameState = req.body.gameState;
  if (move == "start") {
    await game
      .initialize(gameState)
      // .then((r) => r.json())
      .then((data) => {
        gameState = data;
        console.log("app says initialize mode...");
      });
    await maps
      .loadWeaponsAndMagic(gameState)
      // .then((r) => r.json())
      .then((data) => {
        gameState = data.gameState;
        reply = blurbs.intro;
      })
      .then(() => maps.getLocationBlurb(gameState))
      .then((data) => {
        reply += data + "<br/>";
        reply += blurbs.getBlurb(blurbs.enterAMove);
        console.log("app says loaded up grid.");
        res.send({
          move: move,
          message: reply,
          gameState: gameState,
        });
      });
  } else {
    await game.processMoveEntryPlayer(move, gameState).then((data) => {
      reply += data.message;
      gameState = data.gameState;
      console.log("app says player move processed");
    });

    if (gameState.gameOver != true) {
      await game
        .processMoveEntryBot(gameState)
        .then((data) => {
          // if (gameState.gameOver != true) {
          reply += data.message;
          gameState = data.gameState;
          console.log("app says bot move processed");
          // }
        })
        .then(() => maps.getLocationBlurb(gameState))
        .then((data) => {
          reply += data + "<br/>";
          reply += blurbs.getBlurb(blurbs.enterAMove);
        });
    }
    res.send({
      move: move,
      message: reply,
      gameState: gameState,
    });
  }
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
