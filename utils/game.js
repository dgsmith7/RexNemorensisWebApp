import * as blurbs from "./blurbs.js";
import * as maps from "./maps.js";
import * as player from "./player.js";
import * as bot from "./bot.js";
import badwordsArray from "badwords";

export async function processMoveEntryPlayer(move, gameState) {
  console.log("---game.processMovePlayer---");
  return new Promise(async (resolve, reject) => {
    let reply = "";
    gameState.advance = true;
    move = move.toLowerCase();
    switch (move.toString()) {
      case "h": // help
        reply = blurbs.help + "<br/>";
        gameState.advance = false;
        break;
      case "i": // inventory
        await player.buildInventoryBlurb(gameState).then((data) => {
          reply += data + "<br/>";
          gameState.advance = false;
        });
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
        gameState.advance = true;
        await player
          .processMagicPlayer(parseInt(move.replace(/[^0-9]/g, "")), gameState)
          .then((data) => {
            reply = data.message;
            gameState = data.gameState;
          });
        break;
      case "g": // get
        gameState.advance = true;
        await player.pickUpItemPlayer(gameState).then((data) => {
          reply = data.message;
          gameState = data.gameState;
        });
        break;
      case "a": // attack
        gameState.advance = true;
        await player.processAttackPlayer(gameState).then((data) => {
          reply = data.message;
          gameState = data.gameState;
          gameState.player.justAttacked = true;
        });
        break;
      case "n": // move
      case "s":
      case "e":
      case "w":
        gameState.advance = true;
        await player.processMovementPlayer(move, gameState).then((data) => {
          reply = data.message;
          gameState = data.gameState;
          console.log("Player moved - ", reply);
        });
        break;
      case "m":
        gameState.advance = false;
        await maps.displayMap(gameState).then((data) => (reply = data));
        break;
      case "verbose":
        gameState.advance = false;
        reply = "Alas, this is not Zork, my friend.";
        break;
      case "sing":
        reply = blurbs.getBlurb(blurbs.song) + "<br/>";
        break;
      case "poem":
        gameState.advance = false;
        reply = blurbs.getBlurb(blurbs.poem) + "<br/>";
        break;
      case "remove loin cloth":
      case "doff loin cloth":
      case "get naked":
      case "strip":
        gameState.advance = false;
        reply = blurbs.getBlurb(blurbs.nakedness) + "<br/>";
        break;
      case "get dressed":
      case "wear loin cloth":
      case "put on loin cloth":
      case "don loin cloth":
        gameState.advance = false;
        reply = blurbs.getBlurb(blurbs.clothed) + "<br/>";
        break;
      case "r":
      case "rules":
        gameState.advance = false;
        reply = blurbs.rules[0] + "<br/>";
        break;
      default:
        gameState.advance = false;
        await isSwearWord(move).then((data) => {
          if (data == true) {
            reply = blurbs.getBlurb(blurbs.profanityReply) + "<br/><br/>";
          } else {
            reply = blurbs.getBlurb(blurbs.unknownCommand) + "<br/><br/>";
          }
        });
        break;
    }
    console.log(gameState.advance);
    if (gameState.advance) {
      await advancePlayer(gameState)
        .then((data) => {
          reply += data.message;
          gameState = data.gameState;
        })
        .then(() => player.depleteMagicPlayer(gameState))
        .then((data) => {
          reply += data.message;
          gameState = data.gameState;
        })
        .then(() => checkForVictor(gameState))
        .then((data) => {
          gameState = data;
        });
      gameState.turnNumber++;
      gameState.player.justAttacked = false;
    }
    await handleGameMode(gameState).then((data) => {
      reply += data.message;
      gameState = data.gameState;
      console.log("back from handle game mode ", data.message);
    });

    console.log("bot move processed - ", reply);
    resolve({
      message: reply,
      gameState: gameState,
    });
  });
}

export async function advancePlayer(gameState) {
  console.log("---game.advancePlayer---");
  return new Promise(async (resolve, reject) => {
    console.log("advancing player");
    let reply = "";
    let magicStuff = "";
    if (gameState.player.justAttacked) {
      gameState.player.justAttacked = false;
      let finalDamage = gameState.player.damage;
      magicStuff = ` while using the following magic items: \n`;
      if (gameState.player.invisibilityTurnsRemain) {
        // invis player
        magicStuff += `   The Cloak of Invisibilty (${gameState.player.invisibility}) turns remaining.\n`;
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
      if (gameState.bot.invisibilityTurnsRemain) {
        // invis bot
        finalDamage = 0;
      }
      if (magicStuff == ` while using the following magic items: \n`) {
        magicStuff += `   The loin cloth of fortitude (always on - well, almost always).\n`;
      }

      if (maps.nearEachOther(gameState)) {
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
    console.log("end of advancement of player - ", reply);
    resolve({
      message: reply,
      gameState: gameState,
    });
  });
}

export async function processMoveEntryBot(gameState) {
  console.log("---game.processMoveBot---");
  return new Promise(async (resolve, reject) => {
    let reply = "";
    if (gameState.advance) {
      let move = "";
      await bot.generateBotMove(gameState).then((data) => {
        move = data;
        console.log("Bot move is ", move);
      });
      //    gameState.advance = true;
      switch (move.toString()) {
        case "1": // magic item - cloak of invisibility
        case "2": // magic item - gauntlet of strength
        case "3": // magic item - tincture of restoration
        case "4": // magic item - ring of protection
        case "5": // magic item - crown of speed
          //        gameState.advance = true;
          await bot
            .processMagicBot(parseInt(move.replace(/[^0-9]/g, "")), gameState)
            .then((data) => {
              reply = data.message;
              gameState = data.gameState;
            });
          break;
        case "g": // get
          //        gameState.advance = true;
          await bot.pickUpItemBot(gameState).then((data) => {
            reply = data.message;
            gameState = data.gameState;
          });
          break;
        case "a": // attack
          //        gameState.advance = true;
          await bot.processAttackBot(gameState).then((data) => {
            reply = data.message;
            gameState = data.gameState;
            gameState.bot.justAttacked = true;
          });
          break;
        case "n": // move
        case "s":
        case "e":
        case "w":
          //      gameState.advance = true;
          await bot.processMovementBot(move, gameState).then((data) => {
            reply = data.message;
            gameState = data.gameState;
            console.log("Bot moved - ", reply);
          });
          break;
      }

      await advanceBot(gameState)
        .then((data) => {
          reply += data.message;
          gameState = data.gameState;
        })

        .then(() => bot.depleteMagicBot(gameState))
        .then((data) => {
          gameState = data;
        })

        .then(() => checkForVictor(gameState))
        .then((data) => {
          gameState = data;
        });
    }
    await handleGameMode(gameState).then((data) => {
      reply += data.message;
      gameState = data.gameState;
    });

    console.log("bot move processed - ", reply);
    resolve({
      message: reply,
      gameState: gameState,
    });
  });
}

export async function advanceBot(gameState) {
  console.log("---game.advanceBot---");
  return new Promise((resolve, reject) => {
    console.log("advancing bot");
    let reply = "";
    if (gameState.bot.justAttacked) {
      gameState.bot.justAttacked = false;
      let finalDamage = gameState.bot.damage;
      let magicStuff = ` while using the following magic items: \n`;
      if (gameState.bot.invisibilityTurnsRemain) {
        // invis player
        magicStuff += `   The Cloak of Invisibilty.\n`;
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
      if (gameState.player.invisibilityTurnsRemain) {
        // invis player so cant strike
        finalDamage = 0;
      }
      if (magicStuff == ` while using the following magic items: \n`) {
        magicStuff += "   none.\n";
      }

      if (maps.nearEachOther(gameState)) {
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
    console.log("end of advancement of bot - ", reply);
    resolve({
      message: reply,
      gameState: gameState,
    });
  });
}

export async function initialize(gameState) {
  console.log("---game.initialize---");
  return new Promise((resolve, reject) => {
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
        hasMap: false, //false,
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
      advance: false,
      map: maps[parseInt(Math.random(maps.length))], //maps.testMap[0], //layouts[0], //maps[parseInt(Math.random(maps.length))],
      mode: "active", //active, bot-died, player-died, quit
      replay: true,
      history: [], // array of last 50 moves and replies for refresh
      menuVisible: false, // maybe for quit - we'll see
      turnNumber: 0,
      gameOver: false,
      waitOne: false,
    };
    console.log("Initialized!");
    resolve(gameState);
  });
}

export async function checkForVictor(gameState) {
  console.log("---game.checkForVictor---");
  return new Promise((resolve, reject) => {
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
    console.log("checked for victor");
    resolve(gameState);
  });
}

export async function handleGameMode(gameState) {
  console.log("---game.handleGameMode---");
  return new Promise(async (resolve, reject) => {
    let reply = "";
    switch (gameState.mode) {
      case "player-died":
        await player.resetForDeadPlayer(gameState).then((data) => {
          reply += data.message;
          gameState = data.gameState;
          gameState.gameOver = true;
          console.log("after reset for dead player ", data.message);
        });
        break;
      case "bot-died":
        await bot.resetForDeadBot(gameState).then((data) => {
          reply += data.message;
          gameState = data.gameState;
        });
        break;
      case "quit":
        reply += blurbs.getBlurb(blurbs.quitMessage) + "<br/>";
        gameState.gameOver = true;
        break;
      // case "active": // nobody died
      //   await maps.getLocationBlurb(gameState).then((data) => {
      //     reply += data;
      //     // gameState.turnNumber++;
      //   });
      //   break;
    }

    // maybe adjust history
    console.log("game mode handled");
    resolve({ message: reply, gameState: gameState });
  });
}

export function isSwearWord(str) {
  console.log("---game.isSwearWord---");
  return new Promise((resolve, reject) => {
    let profane = false;
    badwordsArray.forEach((item) => {
      if (str.includes(item)) profane = true;
    });
    console.log("profane? - ", profane);
    resolve(profane);
  });
}
