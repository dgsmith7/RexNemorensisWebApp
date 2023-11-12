import * as blurbs from "./components/blurbs.js";
import badwordsArray from "../node_modules/badwords/array.js";

export function processMove(move, gameState) {
  let reply = "";
  gameState.advance = true;
  move = move.toLowerCase();
  switch (move.toString()) {
    case "start": // initial startup
      initialize(gameState);
      reply = buildIntroBlurb();
      gameState.advance = false;
      break;
    case "h": // help
      reply = blurbs.help;
      gameState.advance = false;
      break;
    case "i": // inventory
      reply = buildInventoryBlurb();
      gameState.advance = false;
      break;
    case "q": // quit
      reply = handleQuit();
      break;
    case "1": // magic item
    case "2":
    case "3":
    case "4":
    case "5":
      reply = processMagic(parseInt(move.replace(/[^0-9]/g, "")));
      break;
    case "g": // get
      reply = pickUpItem();
      break;
    case "a": // attack
      reply = processAttack();
      break;
    case "n": // move
    case "s":
    case "e":
    case "w":
      reply = processMovement(move);
      break;
    case "m":
      reply = displayMap();
      gameState.advance = false;
      break;
    case "verbose":
      reply = "Alas, this is not Zork, my friend.";
      gameState.advance = false;
      break;
    default:
      isSwearWord(move)
        ? (reply = getProfanityReply())
        : (reply = getUnknownCommandReply());
      gameState.advance = false;
      break;
  }
  return {
    message: `${reply}<br/>`,
    gameState: gameState,
  };
}

export function initialize(gameState) {
  // runs on landing page
  gameState = {
    advance: false,
  };
  console.log("Initialized.");
}

export function processEnemyMove(gameState) {
  return {
    message: "This is the narative from the enemy move.<br/>",
    gameState: gameState,
  };
}

export function getBlurb(blurbArray) {
  let which = parseInt(Math.random(3) * blurbArray.length);
  return blurbArray[which];
}

function buildIntroBlurb() {
  return blurbs.intro + blurbs.help;
}

function buildInventoryBlurb() {
  return "this will show the inventory.";
}

function handleQuit() {
  return "we handle a quit here";
}

function processMagic(which) {
  return "Processing magic";
}

function pickUpItem() {
  return "Picked up the ...";
}

function processAttack() {
  return "You attacked and did x damage.";
}

function isSwearWord(str) {
  let profane = false;
  badwordsArray.forEach((item) => {
    if (str.includes(item)) profane = true;
  });
  return profane;
}

function processMovement(str) {
  return "Moving in the direction of " + str;
}

function getProfanityReply() {
  return "Such language in a high-class establishment like this.";
  return "Go wash your mouth out with soap, youngster!";
  return "Hey, fuggedaboutit!";
}

function getUnknownCommandReply() {
  return "I do not know how to do that.";
  return "Try again, Ace!";
  return "You can always just type 'h' for help.";
}

function getStatusBlurb() {
  return "This is the stats update.";
}

function generateBotMove() {}

function buildMap() {}

function getMapBlurb() {
  return "This will report on current location and stuff in sight.";
}

function displayMap() {
  return "This will be the map if it is in inventory.";
}
