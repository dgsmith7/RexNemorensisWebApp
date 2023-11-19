import * as blurbs from "./blurbs.js";
import * as maps from "./maps.js";

export async function generateBotMove(gameState) {
  console.log("---bot.generateBotMove---");
  return new Promise((resolve, reject) => {
    let dir = "";
    let move = "";
    console.log("generating move ");
    dir = getSafeDir(gameState);
    if (maps.nearEachOther(gameState)) {
      // if enemy in strike distance
      if (gameState.bot.health >= 50) {
        // attack if health above 50
        move = "a"; // attack
      } else if (gameState.bot.health >= 20) {
        // if between 20 and 50 use magic first then attack
        if (gameState.bot.magicItems[0] != null) {
          move = "1";
        } else if (gameState.bot.magicItems[1] != null) {
          move = "2";
        } else if (gameState.bot.magicItems[2] != null) {
          move = "3";
        } else if (gameState.bot.magicItems[3] != null) {
          move = "4";
        } else if (gameState.bot.magicItems[4] != null) {
          move = "5";
        } else {
          move = "a"; // no more magic to invoke - start attacking again
        }
      } else {
        // if lower than 20 run away
        move = dir;
      }
      // or if there is nobody to attack and there is something to pick up, do it
    } else if (
      "asd12345".includes(
        gameState.map[gameState.bot.position[1]].charAt(
          gameState.bot.position[0]
        )
      )
    ) {
      // something to get
      move = "g";
    } else {
      // otherwise just move
      move = dir;
    }
    console.log("move is ", move);
    resolve(move);
  });
}

function getSafeDir(gameState) {
  console.log("---bot.getSafeDir---");
  // bot getting direction to try and checking it out
  /*  psuedo code for algo
  get a random dir
  safe = false
  while not safe
      get a random dir
      if its on the edge
          check for a fall - probability under threshold? check if fall mark unsafe else dont check
          check for a wall - if wall mark unsafe
      else...not on an edge
          check for a wall - if wall mark unsafe
   */
  let col = gameState.bot.position[0];
  let row = gameState.bot.position[1];
  let dir = "n";
  //getRandomDir(dir);
  let safe = false;
  while (!safe) {
    dir = getRandomDir(dir);
    safe = true; // assume its a good direction unless proven otherwise below
    if (
      col == 0 ||
      col == gameState.map.length - 1 ||
      row == 0 ||
      row == gameState.map[0].length - 1
    ) {
      // on a cliff edge
      let probSure = Math.random() * 10; // determine if I should check if Im near a ledge
      if (probSure < 9.8) {
        // check for a potential fall only 98 % of the time - sometimes enemy falls off
        safe = !edgeFall(gameState, dir);
      }
      safe = safe && edgeWall(gameState, dir); // combine the two checks above without overriding one
    } else {
      // not on an edge

      safe = nonEdgeWall(gameState, dir);
    }
  }
  console.log("safe dir is ", dir);
  return dir;
}

function getRandomDir(dir) {
  // console.log("---bot.getRandomDir---");
  // bot getting initial direction during move process
  let randomDir = parseInt(Math.random() * 4);
  switch (randomDir) {
    case 0:
      dir = "n";
      break;
    case 1:
      dir = "e";
      break;
    case 2:
      dir = "s";
      break;
    case 3:
      dir = "w";
      break;
  }
  // console.log("random dir is ", dir);
  return dir;
}

function edgeWall(gameState, dir) {
  // console.log("---bot.edgeWall---");
  // bot checking for walls when at edge of mesa - good Gawd!
  // the edges of the map will never have walls, BTW
  /*   Explanations for hairy booleans created to keep nesting hell down
  if col is eastmost and dir is west and w != wall then move is safe
  if col is westmost and dir is east and e != wall then move is safe
  if row is southmost and dir is north and n != wall then move is safe
  if row is northmost and dir is south and s != wall then move is safe
   and
  if you are not on east edge and (dir is e and the string is not Wall) then move is safe
  or if you are not on west edge and (dir is w and the string in not wall) then move is safe
  or if you are not on the south edge and (dir is s and the string is not wall) then move is safe
  or if you are not on the north edge and (dir is n and the string is not wall) then move is safe
   */
  let col = gameState.bot.position[0];
  let row = gameState.bot.position[1];
  let colMax = gameState.map.length - 1;
  let rowMax = gameState.map[0].length - 1;
  let isEdgeWall =
    (col == colMax && // east edge
      dir == "w" && // moving w
      gameState.map[row].charAt(col - 1) != "W") || //next west not wall
    (col == 0 && dir == "e" && gameState.map[row].charAt(col + 1) != "W") ||
    (row == rowMax &&
      dir == "n" &&
      gameState.map[row - 1].charAt(col) != "W") ||
    (row == 0 && dir == "s" && gameState.map[row + 1].charAt(col) != "W") ||
    (col != colMax &&
      dir == "e" &&
      gameState.map[row].charAt(col + 1) != "W") ||
    (col != 0 && dir == "w" && gameState.map[row].charAt(col - 1) != "W") ||
    (row != rowMax &&
      dir == "s" &&
      gameState.map[row + 1].charAt(col) != "W") ||
    (row != 0 && dir == "n" && gameState.map[row - 1].charAt(col) != "W");
  // console.log("is edgeWall - ", isEdgeWall);
  return isEdgeWall;
}

function nonEdgeWall(gameState, dir) {
  // console.log("---bot.nonEdgeWall---");
  // bot checking for walls when not at edge of mesa
  let col = gameState.bot.position[0];
  let row = gameState.bot.position[1];
  let n = gameState.map[row - 1].charAt(col);
  let e = gameState.map[row].charAt(col + 1);
  let s = gameState.map[row + 1].charAt(col);
  let w = gameState.map[row].charAt(col - 1);
  // console.log("replying");
  return !(
    (n == "w" && dir == "n") ||
    (s == "w" && dir == "s") ||
    (e == "w" && dir == "e") ||
    (w == "w" && dir == "w")
  );
}

function edgeFall(gameState, dir) {
  // console.log("---bot.edgeFall---");
  // bot checking to see if it will fall off edge
  let col = gameState.bot.position[0];
  let row = gameState.bot.position[1];
  let colMax = gameState.map.length - 1;
  let rowMax = gameState.map[0].length - 1;
  // console.log("replying");
  return (
    (col == 0 && dir == "w") ||
    (col == colMax && dir == "e") ||
    (row == 0 && dir == "n") ||
    (row == rowMax && dir == "s")
  );
}

export async function processMagicBot(which, gameState) {
  console.log("---bot.processMagicBot---");
  // when bot invokes magic item
  return new Promise((resolve, reject) => {
    let reply = "";
    switch (which) {
      case 1:
        if (
          gameState.bot.invisibility == 0 &&
          gameState.bot.magicItems[0] != ""
        ) {
          gameState.bot.magicItems[0] = "";
          gameState.bot.invisibility = 4;
          gameState.bot.invisTurnsRemain = true;
          reply += blurbs.getBlurb(blurbs.botUsingCloak);
        } else {
          //  reply += blurbs.getBlurb(blurbs.playerNoHave);
        }
        break;
      case 2:
        if (gameState.bot.strength == 0 && gameState.bot.magicItems[1] != "") {
          gameState.bot.magicItems[1] = "";
          gameState.bot.strength = 4;
          gameState.bot.invisTurnsRemain = true;
          reply += blurbs.getBlurb(blurbs.botUsingGauntlet);
        } else {
          //  reply += blurbs.getBlurb(blurbs.playerNoHave);
        }
        break;
      case 3:
        if (
          gameState.bot.restoration == 0 &&
          gameState.bot.magicItems[2] != ""
        ) {
          gameState.bot.magicItems[2] = "";
          gameState.bot.restoration = 4;
          gameState.bot.restorationTurnsRemain = true;
          reply += blurbs.getBlurb(blurbs.botUsingTincture);
        } else {
          // reply += blurbs.getBlurb(blurbs.playerNoHave);
        }
        break;
      case 4:
        if (
          gameState.bot.protection == 0 &&
          gameState.bot.magicItems[3] != ""
        ) {
          gameState.bot.magicItems[3] = "";
          gameState.bot.protection = 4;
          gameState.bot.shield += 5;
          gameState.bot.protectionTurnsRemain = true;
          reply += blurbs.getBlurb(blurbs.botUsingRing);
        } else {
          //  reply += blurbs.getBlurb(blurbs.playerNoHave);
        }
        break;
      case 5:
        if (gameState.bot.speed == 0 && gameState.bot.magicItems[4] != "") {
          gameState.bot.magicItems[4] = "";
          gameState.bot.speed = 4;
          gameState.bot.speedTurnsRemain = true;
          reply += blurbs.getBlurb(blurbs.botUsingCrown);
        } else {
          //  reply += blurbs.getBlurb(blurbs.playerNoHave);
        }
        break;
    }
    // console.log("bot magic processed - ", reply);
    resolve({ message: reply, gameState: gameState });
    //  return "Processing magic item " + which + ".";
  });
}

export async function pickUpItemBot(gameState) {
  console.log("---bot.pickupItemBot---");
  // when bot picks something up
  return new Promise((resolve, reject) => {
    let reply = "";
    let item = "";
    let noItem = false;
    switch (
      gameState.map[gameState.bot.position[1]].charAt(gameState.bot.position[0])
    ) {
      case "1":
        item = blurbs.magicItems[0];
        gameState.bot.magicItems[0] = item;
        break;
      case "2":
        item = blurbs.magicItems[1];
        gameState.bot.magicItems[1] = item;
        break;
      case "3":
        item = blurbs.magicItems[2];
        gameState.bot.magicItems[2] = item;
        break;
      case "4":
        item = blurbs.magicItems[3];
        gameState.bot.magicItems[3] = item;
        break;
      case "5":
        item = blurbs.magicItems[4];
        gameState.bot.magicItems[4] = item;
        break;
      case "A":
        if (gameState.bot.weapon == "axe") {
          // hero already has one
          noItem = true;
          //  reply += blurbs.getBlurb(blurbs.alreadyHasAxe);
          gameState.advance = false;
        } else {
          //    item = blurbs.axe[0];
          gameState.bot.weapon = "axe";
          gameState.bot.attack = 20;
        }
        break;
      case "S":
        if (gameState.bot.weapon == "sword") {
          // bot already has one
          noItem = true;
          //  reply += blurbs.getBlurb(blurbs.swordForSword);
        } else if (gameState.bot.weapon == "axe") {
          // bot already has a better weapon
          noItem = true;
          //  reply += blurbs.getBlurb(blurbs.swordForAxe) + "<br/>";
          gameState.advance = false;
        } else {
          // bot does not have one
          //    item = blurbs.sword[0];
          gameState.bot.weapon = "sword";
          gameState.bot.attack = 15;
        }
        break;
      case "D":
        if (gameState.bot.hasShield) {
          // bot already has one
          noItem = true;
          //  reply += blurbs.getBlurb(blurbs.alreadyHasShield);
        } else {
          //    item = blurbs.shield[0];
          gameState.bot.hasShield = true;
          gameState.bot.shield = 5;
        }
        break;
      case "M":
        // item = blurbs.map[0];
        gameState.bot.hasMap = true;
        break;
      default: // user pressed g when there is nothing to pick up
        //  reply += blurbs.getBlurb(blurbs.nothingHere);
        noItem = true;
        break;
    }
    if (!noItem) {
      reply += "Your enemy picked up the " + item + ".  Ohhhh, snap!<br/>";

      gameState.advance = true;
      gameState.map[gameState.bot.position[1]] = maps.replaceChar(
        gameState.bot.position[0],
        gameState.map[gameState.bot.position[1]],
        "B"
      );
    }
    console.log("bot picked up item - ", reply);
    resolve({ message: reply, gameState: gameState });
  });
}

export async function processAttackBot(gameState) {
  console.log("---bot.processAttackBot---");
  // adjust bot and player
  return new Promise((resolve, reject) => {
    let reply = "";
    let damage = 0;
    let damStr = ""; // damage message
    let prob = Math.floor(Math.random() * 10); // dice roll
    if (prob < 1.2) {
      // 12% chance of a clean miss
      damage = 0;
      //damStr = blurbs.getBlurb(blurbs.botMisses);
    } else if (prob < 3.8) {
      // 26% chance of a glancing blow
      damage = gameState.bot.attack - 5;
      //damStr = blurbs.getBlurb(blurbs.botGlancingBlow);
    } else {
      // 62% chance direct hit at full strength
      damage = gameState.bot.attack;
      //damStr = blurbs.getBlurb(blurbs.botDirectHits);
    }
    if (maps.nearEachOther(gameState)) {
      reply += damStr;
    } else {
      damage = 0;
      //reply += blurbs.getBlurb(blurbs.playerNoEnemy);
    }
    gameState.advance = true;
    gameState.bot.damage = damage;
    reply += `<br/>Your enemy attacked and did ${damage} damage.<br/>`;
    console.log("bot attacked - ", reply);
    resolve({ message: reply, gameState: gameState });
  });
}

export async function processMovementBot(str, gameState) {
  console.log("---bot.processMovementBot---");
  return new Promise(async (resolve, reject) => {
    let reply = "";
    let colMax = gameState.map.length - 1;
    let rowMax = gameState.map[0].length - 1;
    reply += "The enemy is moving ";
    switch (str) {
      case "n": {
        if (
          maps.notWall(
            gameState.bot.position[0],
            gameState.bot.position[1] - 1,
            colMax,
            rowMax,
            gameState
          )
        ) {
          gameState.bot.position[1]--;
          reply += "North.\n";
        } //else {
        //   reply += "but something blocks the path.\n";
        // }
        break;
      }
      case "s": {
        if (
          maps.notWall(
            gameState.bot.position[0],
            gameState.bot.position[1] + 1,
            colMax,
            rowMax,
            gameState
          )
        ) {
          gameState.bot.position[1]++;
          reply += "South.\n";
        } //else {
        //   reply += "but something blocks the path.\n";
        // }
        break;
      }
      case "w": {
        if (
          maps.notWall(
            gameState.bot.position[0] - 1,
            gameState.bot.position[1],
            colMax,
            rowMax,
            gameState
          )
        ) {
          gameState.bot.position[0]--;
          reply += "West.\n";
        } //else {
        //   reply += "but something blocks the path.\n";
        // }
        break;
      }
      case "e": {
        if (
          maps.notWall(
            gameState.bot.position[0] + 1,
            gameState.bot.position[1],
            colMax,
            rowMax,
            gameState
          )
        ) {
          gameState.bot.position[0]++;
          reply += "East.\n";
        } //else {
        //   reply += "but something blocks the path.\n";
        // }
        break;
      }
    }

    // if you're off the edge, fall
    if (
      gameState.bot.position[1] < 0 ||
      gameState.bot.position[1] > rowMax ||
      gameState.bot.position[0] < 0 ||
      gameState.bot.position[0] > colMax
    ) {
      reply += blurbs.getBlurb(blurbs.botFallsEdge);
      gameState.mode = "bot-died";
      gameState.advance = false;
    }
    // if you're on a hole, fall
    else if (
      gameState.map[gameState.bot.position[1]].charAt(
        gameState.bot.position[0]
      ) == "H"
    ) {
      reply += blurbs.getBlurb(blurbs.botFallsHole);
      gameState.mode = "bot-died";
      gameState.advance = false;
    }

    // if you are along an edge, maybe fall off, maybe drop weapon
    else if (
      gameState.bot.position[0] == 0 ||
      gameState.bot.position[0] == colMax ||
      gameState.bot.position[1] == 0 ||
      gameState.bot.position[1] == rowMax
    ) {
      let fallProb = 0.03; // 3% chance of falling
      let dropProb = 0.05; // 5% chance of falling
      if (Math.random() <= fallProb) {
        //fall
        reply += blurbs.getBlurb(blurbs.botFallsEdge);
        gameState.mode = "bot-died";
        gameState.advance = false;
      } else if (Math.random() <= dropProb) {
        await dropWeaponBot(gameState).then((data) => {
          reply += data.message;
          gameState = data.gameState;
        });
      }
    }
    reply += "<br/>";
    console.log("bot movement processed - ", reply);
    resolve({ message: reply, gameState: gameState });
  });
}

function dropWeaponBot(gameState) {
  console.log("---bot.dropWeaponBot---");
  return new Promise((resolve, reject) => {
    let reply = "";
    reply += blurbs.getBlurb(blurbs.botDropsWeapon) + "\n";
    switch (
      gameState.bot.weapon // using fall-through behavior
    ) {
      case "axe":
        if (gameState.bot.hasSword) {
          gameState.bot.weapon = "sword";
          gameState.bot.attack = 15;
          break; // using fall-through behavior
        } // using fall-through behavior
      case "sword":
        gameState.bot.hasSword = false;
        if (gameState.bot.hasDagger) {
          gameState.bot.weapon = "dagger";
          gameState.bot.attack = 10;
          break; // using fall-through behavior
        } // using fall-through behavior
      case "dagger":
        gameState.bot.hasDagger = false;
        gameState.bot.weapon = "fist";
        gameState.bot.attack = 5;
        break;
      default: // fists cannot be dropped
        break;
    }
    //reply += `You are now using your ${gameState.player.weapon}.  You deal ${gameState.player.attack} damage with each direct hit.`;
    console.log("bot weapon drop -", reply);
    resolve({ message: reply, gameState: gameState });
  });
}

export async function depleteMagicBot(gameState) {
  console.log("---bot.depleteMagicBot---");
  return new Promise((resolve, reject) => {
    if (gameState.bot.invisibility > 0) {
      gameState.bot.invisibility--;
      if (gameState.bot.invisibility == 0) {
        gameState.bot.invisTurnsRemain = false;
      }
    }
    if (gameState.bot.strength > 0) {
      gameState.bot.strength--;
      if (gameState.bot.strength == 0) {
        gameState.bot.strengthTurnsRemain = false;
      }
    }
    if (gameState.bot.restoration > 0) {
      gameState.bot.restoration--;
      if (gameState.bot.restoration == 0) {
        gameState.bot.restorationTurnsRemain = false;
      }
    }
    if (gameState.bot.protection > 0) {
      gameState.bot.protection--;
      if (gameState.bot.protection == 0) {
        gameState.bot.protectionTurnsRemain = false;
      }
    }
    if (gameState.bot.speed > 0) {
      gameState.bot.speed--;
      if (gameState.bot.speed == 0) {
        gameState.bot.speedTurnsRemain = false;
      }
    }

    console.log("Magic items adjusted.");
    resolve(gameState);
  });
}

export function resetForDeadBot(gameState) {
  console.log("---bot.resetForDeadBot---");
  return new Promise((resolve, reject) => {
    let reply = "";
    gameState.player.wins++;
    reply += blurbs.getBlurb(blurbs.gameOver) + "<br/>";
    reply += blurbs.getBlurb(blurbs.playerWins) + "<br/>";
    gameState.player.wins++;
    reply += `You have defeated ${gameState.player.wins} challengers.<br/>`;
    reply += blurbs.getBlurb(blurbs.regenerate) + "<br/>";
    reply += blurbs.getBlurb(blurbs.poem) + "<br/>";
    gameState.player.position = [0, 0];
    gameState.player.health += 25;
    gameState.player.hasMap = false;
    gameState.map = maps.testMap[0]; //maps[parseInt(Math.random(maps.length))];
    gameState.gameOver = false;
    gameState.bot = {
      position: [12, 12], // lower right; column, row
      health: 100 + 5 * gameState.player.wins, // int
      attack: 10, // fist-5 dagger-10 sword-15 axe-20
      shield: gameState.player.wins, // int
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
    };
    gameState.mode = "active";
    reply += blurbs.getBlurb(blurbs.strongerEnemyTaunt) + "<br/>";
    reply += `New challenger health: ${gameState.bot.health}.  New challenger shield: ${gameState.bot.shield}<br/>`;
    reply += blurbs.getBlurb(blurbs.gameResetAfterWin) + "<br/>";
    resolve({ message: reply, gameState: gameState });
  });
}
