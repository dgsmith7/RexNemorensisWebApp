import * as blurbs from "./blurbs.js";
import * as maps from "./maps.js";
import * as player from "./player.js";
import * as bot from "./bot.js";
import badwordsArray from "badwords";

export function processMovePlayer(move, gameState) {
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
      break;
    case "1": // magic item - cloak of invisibility
    case "2": // magic item - gauntlet of strength
    case "3": // magic item - tincture of restoration
    case "4": // magic item - ring of protection
    case "5": // magic item - crown of speed
      rObj = player.processMagicPlayer(
        parseInt(move.replace(/[^0-9]/g, "")),
        gameState
      );
      reply = rObj.message;
      gameState = rObj.gameState;
      break;
    case "g": // get
      rObj = player.pickUpItem(gameState);
      reply = rObj.message;
      gameState = rObj.gameState;
      break;
    case "a": // attack
      rObj = player.processAttackPlayer(gameState);
      reply = rObj.message;
      gameState = rObj.gameState;
      gameState.player.justAttacked = true;
      break;
    case "n": // move
    case "s":
    case "e":
    case "w":
      rObj = player.processMovementPlayer(move, gameState);
      reply = rObj.message;
      gameState = rObj.gameState;
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
    case "r":
    case "rules":
      reply = blurbs.rules[0] + "<br/>";
      break;
    default:
      isSwearWord(move)
        ? (reply = blurbs.getBlurb(blurbs.profanityReply) + "<br/>")
        : (reply = blurbs.getBlurb(blurbs.unknownCommand) + "<br/>");
      gameState.advance = false;
      break;
  }
  return {
    message: `${reply}<br/>`,
    gameState: gameState,
  };
}

export function advancePlayer(gameState) {
  let reply = "";
  if (gameState.player.justAttacked) {
    gameState.player.justAttacked = false;
    let finalDamage = gameState.player.damage;
    let magicString = ` while using the following magic items: \n`;
    if (gameState.player.invisibilityTurnsRemain) {
      // invis player
      magicStuff += `   The Cloak of Invisibilty (${gameState.player.invisibility}) turns remaining.\n`;
    }
    if (gameState.bot.invisibilityTurnsRemain) {
      // invis bot
      finalDamage = 0;
    }
    if (gameState.player.strengthTurnsRemain) {
      // strength
      finalDamage += 5;
      magicStuff += `   The Gauntlet of Strength (${gameState.player.strength}) turns remaining.\n`;
    }
    if (gameState.player.restorationTurnsRemain) {
      // restoration
      magicStuff += `   The Tincture of Restoration (${gameState.player.restoration}) turns remaining.\n`;
      // restoration handled below
    }
    if (gameState.player.protectionTurnsRemain) {
      // protection
      magicStuff += `   The Ring of Protection (${gameState.player.protection}) turns remaining.\n`;
      // shield handled below
    }
    if (gameState.player.speedTurnsRemain) {
      // speed
      finalDamage *= 2;
      magicStuff += `   The Crown of Speed (${gameState.player.speed}) turns remaining.\n`;
    }
    if (magicString == ` while using the following magic items: \n`) {
      magicStuff += `   The loin cloth of fortitude (always on - well, almost always).\n`;
    }

    if (maps.nearEachOther()) {
      // if player are within strike range of one another calculate and apply damage
      finalDamage -= gameState.bot.shield; // adjust for receiver shield
      if (finalDamage < 0) {
        // constrain so we aren't adding points back on attacks
        finalDamage = 0;
      }
      gameState.bot.health -= finalDamage; // apply the damage
      // messaging
      reply += `You struck with the ${gameState.player.weapon} inflicting ${finalDamage} points damage, ${magicStuff}\n`;
      reply += `Your health is ${gameState.player.health}. The enemy's health is ${gameState.bot.health}\n`;
    }
  }
  player.depleteMagicPlayer();
  checkForVictor(gameState);
  return {
    message: "This is the narrative from the enemy move.<br/>",
    gameState: gameState,
  };
}

export function processMoveBot(gameState) {
  let move = bot.generateBotMove();
  let reply = "";
  let rObj = {};
  gameState.advance = true;
  switch (move.toString()) {
    case "1": // magic item - cloak of invisibility
    case "2": // magic item - gauntlet of strength
    case "3": // magic item - tincture of restoration
    case "4": // magic item - ring of protection
    case "5": // magic item - crown of speed
      rObj = player.processMagicBot(
        parseInt(move.replace(/[^0-9]/g, "")),
        gameState
      );
      reply = rObj.message;
      gameState = rObj.gameState;
      break;
    case "g": // get
      rObj = player.pickUpItemBot(gameState);
      reply = rObj.message;
      gameState = rObj.gameState;
      break;
    case "a": // attack
      rObj = player.processAttackBot(gameState);
      reply = rObj.message;
      gameState = rObj.gameState;
      gameState.bot.justAttacked = true;
      break;
    case "n": // move
    case "s":
    case "e":
    case "w":
      rObj = player.processMovementBoot(move, gameState);
      reply = rObj.message;
      gameState = rObj.gameState;
      break;
  }
  return {
    message: "This is the narrative from the enemy move.<br/>", //reply,
    gameState: gameState,
  };
}

export function advanceBot(gameState) {
  let reply = "";
  if (gameState.bot.justAttacked) {
    gameState.bot.justAttacked = false;
    let finalDamage = gameState.bot.damage;
    let magicString = ` while using the following magic items: \n`;
    if (gameState.bot.invisibilityTurnsRemain) {
      // invis player
      magicStuff += `   The Cloak of Invisibilty.\n`;
    }
    if (gameState.player.invisibilityTurnsRemain) {
      // invis bot
      finalDamage = 0;
    }
    if (gameState.bot.strengthTurnsRemain) {
      // strength
      finalDamage += 5;
      magicStuff += `   The Gauntlet of Strength.\n`;
    }
    if (gameState.bot.restorationTurnsRemain) {
      // restoration
      magicStuff += `   The Tincture of Restoration.\n`;
      // restoration handled below
    }
    if (gameState.bot.protectionTurnsRemain) {
      // protection
      magicStuff += `   The Ring of Protection.\n`;
      // shield handled below
    }
    if (gameState.bot.speedTurnsRemain) {
      // speed
      finalDamage *= 2;
      magicStuff += `   The Crown of Speed.\n`;
    }
    if (magicString == ` while using the following magic items: \n`) {
      magicStuff += "   none.\n";
    }

    if (maps.nearEachOther()) {
      // if player are within strike range of one another calculate and apply damage
      finalDamage -= gameState.player.shield; // adjust for receiver shield
      if (finalDamage < 0) {
        // constrain so we aren't adding points back on attacks
        finalDamage = 0;
      }
      gameState.player.health -= finalDamage; // apply the damage
      // messaging
      reply += `Your enemy struck with the ${gameState.bot.weapon} inflicting ${finalDamage} points damage, ${magicStuff}\n`;
      reply += `Your health is ${gameState.player.health}. The enemy's health is ${gameState.bot.health}\n`;
    }
  }
  bot.depleteMagicBot();
  checkForVictor(gameState);
  return {
    message: "This is the narrative from the enemy move.<br/>", //reply,
    gameState: gameState,
  };
}

export function initialize(gameState) {
  // runs on landing page
  gameState = {
    player: {
      position: [0, 0], // upper left; column, row
      health: 100, // int
      attack: 10, // fist-5 dagger-10 sword-15 axe-20
      shield: 0, // int
      hasShield: false,
      hasSword: false,
      hasDagger: false,
      hasMap: true, //false,
      weapon: "dagger", // fist-5 dagger-10 sword-15 axe-20
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
      justAttacked: false,
      wins: 0,
    },
    bot: {
      position: [12, 12], // lower right; column, row
      health: 100, // int
      attack: 10, // fist-5 dagger-10 sword-15 axe-20
      shield: 0, // int
      hasShield: false,
      hasSword: false,
      hasDagger: true,
      hasMap: false,
      weapon: "dagger", // fist-5 dagger-10 sword-15 axe-20
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
      justAttacked: false,
      wins: 0,
    },
    advance: true,
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
    gameState.gameOver = true;
    gameState.advance = false;
  }
  if (gameState.bot.health <= 0) {
    gameState.mode = "bot-died";
    gameState.gameOver = true;
    gameState.advance = false;
  }
  return gameState;
}

// handle game mode
function handleGameMode(gameState) {
  switch (gameState.mode) {
    case "player-died":
      reply += player.resetForDeadPlayer(gameState);
      gameState.gameOver = true;
      break;
    case "bot-died":
      reply += bot.resetForDeadBot(gameState);
      break;
    case "quit":
      reply += blurbs.getBlurb(blurbs.quitMessage) + "<br/>";
      break;
    case "active": // nobody died
      reply += maps.getLocationBlurb(gameState);
      reply += blurbs.getBlurb(blurbs.enterAMove);
      if (gameState.advance) {
        gameState.turnNumber++;
      }
      break;
    default: // quit
      break;
  }
  // maybe adjust history
}

function isSwearWord(str) {
  let profane = false;
  badwordsArray.forEach((item) => {
    if (str.includes(item)) profane = true;
  });
  return profane;
}
