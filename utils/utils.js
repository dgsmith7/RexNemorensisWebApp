import * as blurbs from "./components/blurbs.js";
import { maps } from "./components/maps.js";
import badwordsArray from "../node_modules/badwords/array.js";

export function processMove(move, gameState) {
  let reply = "";
  gameState.advance = true;
  move = move.toLowerCase();
  switch (move.toString()) {
    case "start": // initial startup
      gameState = initialize(gameState);
      reply = blurbs.intro;
      gameState.advance = false; // don't count as a turn
      break;
    case "h": // help
      reply = blurbs.help;
      gameState.advance = false;
      break;
    case "i": // inventory
      reply = buildInventoryBlurb(gameState);
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
      reply = processMagic(parseInt(move.replace(/[^0-9]/g, "")), gameState);
      break;
    case "g": // get
      reply = pickUpItem(gameState);
      break;
    case "a": // attack
      reply = processAttack(gameState);
      break;
    case "n": // move
    case "s":
    case "e":
    case "w":
      reply = processMovement(move, gameState);
      break;
    case "m":
      reply = displayMap(gameState);
      gameState.advance = false;
      break;
    case "verbose":
      reply = "Alas, this is not Zork, my friend.";
      gameState.advance = false;
      break;
    case "sing":
      reply = getBlurb(blurbs.song) + "<br/>";
      break;
    case "poem":
      reply = getBlurb(blurbs.poem) + "<br/>";
      break;
    case "remove loin cloth":
    case "doff loin cloth":
    case "get naked":
    case "strip":
      reply = getBlurb(blurbs.nakedness) + "<br/>";
      break;
    case "get dressed":
    case "wear loin cloth":
    case "put on loin cloth":
    case "don loin cloth":
      reply = getBlurb(blurbs.clothed) + "<br/>";
      break;
    default:
      isSwearWord(move)
        ? (reply = getBlurb(blurbs.profanityReply) + "<br/>")
        : (reply = getBlurb(blurbs.unknownCommand) + "<br/>");
      gameState.advance = false;
      break;
  }
  if (gameState.advance) advance(gameState);
  checkForVictor(gameState);
  switch (gameState.mode) {
    case "player-died":
      reply += resetForDeadPlayer(gameState);
      gameState.gameOver = true;
      break;
    case "bot-died":
      reply += resetForDeadBot(gameState);
      break;
    case "active": // nobody died
      reply += getBlurb(blurbs.enterAMove);
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

export function initialize(gameState) {
  // runs on landing page
  gameState = {
    player: {
      position: [0, 0], // upper left; column, row
      health: 100, // int
      attack: 10, // fists-5 dagger-10 sword-15 axe-20
      damage: 0, // int
      shield: 0, // int
      hasMap: false,
      weapon: "dagger", // fists-5 dagger-10 sword-15 axe-20
      magicItems: ["", "", "", "", ""],
      invisibility: 0,
      invisTurnsRemain: 0,
      strengthTurnsRemain: 0,
      strength: 0,
      protection: 0,
      protectionTurnsRemain: 0,
      restoration: 0,
      restorationTurnsRemain: 0,
      speed: 0,
      speedTurnsRemain: 0,
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
    map: maps[parseInt(Math.random(maps.length))],
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

export function processBotMove(gameState) {
  return {
    message: "This is the narrative from the enemy move.<br/>",
    gameState: gameState,
  };
}

export function getBlurb(blurbArray) {
  // tested
  let which = parseInt(Math.random(3) * blurbArray.length);
  return blurbArray[which];
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
  reply += processBotMove(gameState);
  reply += processMagic(gameState);
  reply += getLocationBlurb(gameState);
  // adjust gameState and stats
  // maybe adjust history
  // tick off active magic and make calls
  return reply;
}

function buildInventoryBlurb(gameState) {
  // tested
  // this will show the inventory and staus
  let reply = `INVENTORY AND STATUS:
  You have ${gameState.player.health} health points.
  Your strongest weapon is a ${gameState.player.weapon}. - each direct hit lands ${gameState.player.attack} damage.
  Your shield (or lack thereof) provides ${gameState.player.shield} protection from any attack.
  You `;
  if (gameState.player.hasMap == false) {
    reply += `do not `;
  }
  reply += `have a map.
  These are your magic items: 
`;
  let none = true;
  gameState.player.magicItems.forEach((element, index) => {
    if (element !== "") {
      reply += `   Press ${index + 1} to activate ${element}
`;
      none = false;
    }
  });
  if (none) {
    reply += `   none
`;
  }
  reply += `  Active magic Items:
`;
  if (gameState.player.invisibility > 0)
    reply += `   Cloak of invisibility
`;
  if (gameState.player.strength > 0)
    reply += `   Gauntlet of strength
`;
  if (gameState.player.restoration > 0)
    reply += `   Tincture of restoration
`;
  if (gameState.player.protection > 0)
    reply += `   Ring of protection
`;
  if (gameState.player.speed > 0)
    reply += `   Crown of speed
`;
  if (
    gameState.player.invisibility +
      gameState.player.strength +
      gameState.player.restoration +
      gameState.player.protection +
      gameState.player.speed ==
    0
  ) {
    reply += `   ${getBlurb(blurbs.loin)}

`;
  }
  reply += `You have defeated ${gameState.player.wins} challengers.
`;
  if (Math.random() < 0.5) {
    reply += `Your loin cloth flaps with the wind...You blush.
`;
  }
  return reply;
}

function handleQuit(gameState) {
  // save to sql or file when able
  // show message and flash title
  return "Thanks for playing.";
}

function processMagic(which, gameState) {
  // when player invokes magic item
  // adjust powers
  // start countdown
  return "Processing magic item " + which + ".";
}

function pickUpItem() {
  // when player picks something up
  //determine which item using location
  // add to inventory
  return "Picked up the ...";
}

function dropWeapon() {
  // when a play accidentally drops a weapon
}

function processAttack() {
  // adjust bot and player
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
  // move player around board
  return "Moving in the direction of " + str;
}

function generateBotMove(gameState) {
  // "AI" bot
}

function getLocationBlurb(gameState) {
  //r eport on current location and stuff in sight
  return "This will report on current location and stuff in sight.";
}

function displayMap(gameState) {
  // This will be the map if it is in inventory
  let reply = "";
  if (gameState.map == true) {
    gameState.map.forEach((element) => {
      reply += `     ${element}<br/>`;
    });
  } else {
    reply = getBlurb(blurbs.playerNoHave) + "<br/>";
  }
  return reply;
}

function resetForDeadBot(gameState) {
  // reset map, reset bot progressive, plus-up player, show continue story message
  /*
              System.out.println(this.continueStory);
            protagonist.showStatus();
  */
  /*if (enemy.health <= 0) {  // enemy died
            endName = "enemy";// mechanism for control flow at end-game
            System.out.println("You hear the tolling of a death knell.");
            setState("game-over");
        }  */
  /*if (n.equals("enemy")) {
            System.out.println("You are victorious. ");
            protagonist.wins++;
            System.out.println("You have defeated " + protagonist.wins + " challengers.");
            System.out.println();
            getReturn();
            return 0;
        } */
  let reply = "";
  reply += getBlurb(blurbs.gameOver);
  reply += getBlurb(blurbs.playerWins);
  reply += getBlurb(blurbs.regenerate);
  reply += getBlurb(blurbs.gameResetAfterWin);
  reply += getBlurb(blurbs.strongerEnemyTaunt);
  return "Everything handled here for dead player";
}

function resetForDeadPlayer(gameState) {
  let reply = "";
  reply += getBlurb(blurbs.gameOver);
  reply += getBlurb(blurbs.playerLoses);
  // initialize, send appropriate reply
  /*
      if (protagonist.wins == 0) {
            System.out.println(this.title);
            Game.getReturn();
            System.out.println(this.backStory);
            showHelpReport();
            protagonist.showStatus(); */

  /*    if (protagonist.health <= 0) {  // hero died
            endName = "hero"; // mechanism for control flow at end-game
            System.out.println("You hear the tolling of a death knell.");
            setState("game-over");
        } */
  /*if (n.equals("hero")) {
            System.out.println("You are defeated. A haloed child touches your head. You hear their whisper from behind, 'All glory is fleeting...'");
            System.out.println();
            RexNemorensis.replay = checkReplay().startsWith("Y");
            return 1;
        }  */
  return "Everything handled here for dead player.";
}
