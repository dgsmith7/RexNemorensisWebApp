import * as blurbs from "./blurbs.js";
import * as maps from "./maps.js";
import * as player from "./player.js";
import * as bot from "./bot.js";
import badwordsArray from "badwords";

export function processMove(move, gameState) {
  let reply = "";
  let rObj = {};
  gameState.advance = true;
  move = move.toLowerCase();
  switch (move.toString()) {
    case "start": // initial startup
      gameState = initialize(gameState);
      gameState = maps.loadWeaponsAndMagic(gameState);
      reply = blurbs.intro;
      gameState.advance = false; // don't count as a turn
      break;
    case "h": // help
      reply = blurbs.help;
      gameState.advance = false;
      break;
    case "i": // inventory
      reply = player.buildInventoryBlurb(gameState);
      gameState.advance = false;
      break;
    case "q": // quit
      gameState.mode = "quit";
      gameState.gameOver = true;
      gameState.advance = false;
      reply = handleQuit();
      break;
    case "1": // magic item - cloak of invisibility
    case "2": // magic item - gauntlet of strength
    case "3": // magic item - tincture of restoration
    case "4": // magic item - ring of protection
    case "5": // magic item - crown of speed
      rObj = player.processMagic(
        parseInt(move.replace(/[^0-9]/g, "")),
        gameState
      );
      reply = rObj.message;
      gameState = rObj.gameState;
      break;
    case "g": // get
      reply = player.pickUpItem(gameState);
      break;
    case "a": // attack
      reply = player.processAttack(gameState);
      break;
    case "n": // move
    case "s":
    case "e":
    case "w":
      reply = player.processMovement(move, gameState);
      break;
    case "m":
      reply = maps.displayMap(gameState);
      gameState.advance = false;
      break;
    case "verbose":
      reply = "Alas, this is not Zork, my friend.";
      gameState.advance = false;
      break;
    case "sing":
      reply = blurbs.getBlurb(blurbs.song) + "<br/>";
      break;
    case "poem":
      reply = blurbs.getBlurb(blurbs.poem) + "<br/>";
      break;
    case "remove loin cloth":
    case "doff loin cloth":
    case "get naked":
    case "strip":
      reply = blurbs.getBlurb(blurbs.nakedness) + "<br/>";
      break;
    case "get dressed":
    case "wear loin cloth":
    case "put on loin cloth":
    case "don loin cloth":
      reply = blurbs.getBlurb(blurbs.clothed) + "<br/>";
      break;
    default:
      isSwearWord(move)
        ? (reply = blurbs.getBlurb(blurbs.profanityReply) + "<br/>")
        : (reply = blurbs.getBlurb(blurbs.unknownCommand) + "<br/>");
      gameState.advance = false;
      break;
  }
  if (gameState.advance) reply += advance(gameState);
  checkForVictor(gameState);
  switch (gameState.mode) {
    case "player-died":
      reply += player.resetForDeadPlayer(gameState);
      gameState.gameOver = true;
      break;
    case "bot-died":
      reply += bot.resetForDeadBot(gameState);
      break;
    case "active": // nobody died
      reply += maps.getLocationBlurb(gameState);
      reply += blurbs.getBlurb(blurbs.enterAMove);
      gameState.turnNumber++;
      break;
    default: // quit
      break;
  }

  return {
    message: `${reply}<br/>`,
    gameState: gameState,
  };
}

export function processBotMove(gameState) {
  return {
    message: "This is the narrative from the enemy move.<br/>",
    gameState: gameState,
  };
}

export function initialize(gameState) {
  // runs on landing page
  gameState = {
    player: {
      position: [0, 0], // upper left; column, row
      health: 100, // int
      attack: 10, // fists-5 dagger-10 sword-15 axe-20
      damage: 0, // int
      shield: 0, // int
      hasMap: true, //false,
      weapon: "dagger", // fists-5 dagger-10 sword-15 axe-20
      magicItems: ["Cloak of Invisibility", "", "", "", ""],
      invisibility: 0,
      invisTurnsRemain: true,
      strength: 0,
      strengthTurnsRemain: false,
      protection: 0,
      protectionTurnsRemain: false,
      restoration: 0,
      restorationTurnsRemain: false,
      speed: 0,
      speedTurnsRemain: false,
      advance: false,
      wins: 0,
    },
    bot: {
      position: [12, 12], // lower right; column, row
      health: 100, // int
      attack: 10, // fists-5 dagger-10 sword-15 axe-20
      damage: 10, // int
      shield: 0, // int
      hasMap: false,
      weapon: "dagger", // fists-5 dagger-10 sword-15 axe-20
      magicItems: ["", "", "", "", ""],
      invisibility: 0,
      invisTurnsRemain: 0,
      strength: 0,
      strengthTurnsRemain: 0,
      protection: 0,
      protectionTurnsRemain: 0,
      restoration: 0,
      restorationTurnsRemain: 0,
      speed: 0,
      speedTurnsRemain: 0,
      advance: false,
      wins: 0,
    },
    map: maps.testMap[0], //layouts[0], //maps[parseInt(Math.random(maps.length))],
    mode: "active", // active, bot-died, player-died, quit
    replay: true,
    history: [], // array of last 50 moves and replies for refresh
    menuVisible: false, // maybe for quit - we'll see
    turnNumber: 0,
    gameOver: false,
  };
  console.log("Initialized!");
  return gameState;
}

export function checkForVictor(gameState) {
  if (gameState.player.health <= 0) {
    gameState.mode = "player-died";
  }
  if (gameState.bot.health <= 0) {
    gameState.mode = "bot-died";
  }
  return gameState;
}

function advance(gameState) {
  let reply = "";
  let rObj = {};
  rObj = player.depletePlayerMagic(gameState);
  reply += rObj.message;
  gameState = rObj.gameState;
  rObj = processBotMove(gameState);
  reply += rObj.message;
  gameState = rObj.gameState;
  gameState = bot.depleteBotMagic(gameState);
  // rObj = bot.depleteBotMagic(gameState);
  // reply += rObj.message;
  // gameState = rObj.gameState;
  // adjust gameState and stats
  // maybe adjust history
  // tick off active magic and make calls
  return reply;
}

function handleQuit(gameState) {
  // save to sql or file when able
  // show message and flash title
  return blurbs.getBlurb(blurbs.quitMessage) + "<br/>";
}

function isSwearWord(str) {
  let profane = false;
  badwordsArray.forEach((item) => {
    if (str.includes(item)) profane = true;
  });
  return profane;
}
