import * as blurbs from "./components/blurbs.js";
import badwordsArray from "../node_modules/badwords/array.js";

export function processMove(move) {
  let reply = "";
  move = move.toLowerCase();
  switch (move) {
    // start h i q 1 2 3 4 5 g a n s e w
    case "start": // initial startup
      initialize();
      reply = buildIntroBlurb();
      break;
    case "h" || "help": // help
      reply = blurbs.help;
      break;
    case "i" || "inventory": // inventory
      reply = buildInventoryBlurb();
      break;
    case "q" || "quit": // quit
      handleQuit();
      break;
    case "1" ||
      "magic 1" ||
      "2" ||
      "magic 2" ||
      "3" ||
      "magic 3" ||
      "4" ||
      "magic 4" ||
      "5" ||
      "magic 5": // magic item
      processMagic(parseInt(move.replace(/[^0-9]/g, "")));
      break;
    case "g" || "get": // get
      pickUpItem();
      break;
    case "a" || "attack": // attack
      processAttack();
      break;
    case "n" || "north" || "s" || "south" || "e" || "east" || "w" || "west": // move
      processMovement(move);
      break;
    case "verbose":
      reply = "Alas, this is not Zork, my friend.";
      break;
    default:
      isSwearWord(move)
        ? (reply = getProfanityReply())
        : (reply = getUnknownCommandReply());
      break;
  }
  return reply;
}

export function initialize() {
  // runs on landing page
  console.log("Initialized.");
}

function buildIntroBlurb() {
  return blurbs.intro;
}

function buildInventoryBlurb() {
  return "this will show the inventory";
}

function handleQuit() {}

function processMagic(which) {}

function pickUpItem() {}

function processAttack() {}

function isSwearWord(str) {
  let profane = false;
  badwordsArray.forEach((item) => {
    if (str.includes(item)) profane = true;
  });
  return profane;
}

function processMovement(str) {}

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
