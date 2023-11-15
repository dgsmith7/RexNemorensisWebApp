export function generateBotMove(gameState) {
  //return "g";

  let dir = getSafeDir(gameState);
  if (game.nearEachOther()) {
    // if enemy in strike distance
    if (gameState.bot.health >= 50) {
      // attack if health above 50
      return "A"; // attack
    } else if (gameState.bot.health >= 20) {
      // if between 20 and 50 use magic first then attack
      if (gameState.bot.magicItems[0] != null) {
        return "1";
      } else if (gameState.bot.magicItems[1] != null) {
        return "2";
      } else if (gameState.bot.magicItems[2] != null) {
        return "3";
      } else if (gameState.bot.magicItems[3] != null) {
        return "4";
      } else if (gameState.bot.magicItems[4] != null) {
        return "5";
      } else {
        return "A"; // no more magic to invoke - start attacking again
      }
    } else {
      // if lower than 20 run away
      return dir;
    }
    // or if there is nobody to attack and there is something to pick up, do it
  } else if (
    "ASD12345".contains(
      gameState.map[gameState.bot.positRow]
        .charAt(gameState.bot.positCol)
        .toString()
    )
  ) {
    // something to get
    return "G";
  } else {
    // otherwise just move
    return dir;
  }
}

function getSafeDir(gameState) {
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
  let col = gameState.player.position[0];
  let row = gameState.player.position[1];
  let dir = "N";
  dir = getRandomDir(gameState, dir);
  let safe = false;
  while (!safe) {
    safe = true; // assume its a good direction unless proven otherwise below
    dir = getRandomDir(gameState, dir);
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
  return dir;
}

function getRandomDir(gameState, dir) {
  // bot getting initial direction during move process
  switch (parseInt(Math.random() * 4)) {
    case 0:
      dir = "N";
      break;
    case 1:
      dir = "E";
      break;
    case 2:
      dir = "S";
      break;
    case 3:
      dir = "W";
      break;
  }
  return dir;
}

function edgeWall(gameState, dir) {
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
  let col = gameState.player.position[0];
  let row = gameState.player.position[1];
  let colMax = gameState.map.length - 1;
  let rowMax = gameState.map[0].length - 1;
  return (
    (col == colMax &&
      dir == "W" &&
      !gameState.map[row].charAt(col - 1).toString() == "W") ||
    (col == 0 &&
      dir == "E" &&
      !gameState.map[row].charAt(col + 1).toString() == "W") ||
    (row == rowMax &&
      dir == "N" &&
      !gameState.map[row - 1].charAt(col).toString() == "W") ||
    (row == 0 &&
      dir == "S" &&
      !gameState.map[row + 1].charAt(col).toString() == "W") ||
    (col != colMax &&
      dir == "E" &&
      !gameState.map[row].charAt(col + 1).toString() == "W") ||
    (col != 0 &&
      dir == "W" &&
      !gameState.map[row].charAt(col - 1).toString() == "W") ||
    (row != rowMax &&
      dir == "S" &&
      !gameState.map[row + 1].charAt(col).toString() == "W") ||
    (row != 0 &&
      dir == "N" &&
      !gameState.map[row - 1].charAt(col).toString() == "W")
  );
}

function nonEdgeWall(gameState, dir) {
  // bot checking for walls when not at edge of mesa
  let col = gameState.player.position[0];
  let row = gameState.player.position[1];
  let n = gameState.map[row - 1].charAt(col).toString();
  let e = gameState.map[row].charAt(col + 1).toString();
  let s = gameState.map[row + 1].charAt(col).toString();
  let w = gameState.map[row].charAt(col - 1).toString();
  return !(
    (n == "W" && dir == "N") ||
    (s == "W" && dir == "S") ||
    (e == "W" && dir == "E") ||
    (w == "W" && dir == "W")
  );
}

function edgeFall(gameState, dir) {
  // bot checking to see if it will fall off edge
  let col = gameState.player.position[0];
  let row = gameState.player.position[1];
  let colMax = gameState.map.length - 1;
  let rowMax = gameState.map[0].length - 1;
  return (
    (col == 0 && dir == "W") ||
    (col == colMax && dir == "E") ||
    (row == 0 && dir == "N") ||
    (row == rowMax && dir == "S")
  );
}

export function processMagicBot(which, gameState) {
  // when bot invokes magic item
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
      if (gameState.bot.restoration == 0 && gameState.bot.magicItems[2] != "") {
        gameState.bot.magicItems[2] = "";
        gameState.bot.restoration = 4;
        gameState.bot.restorationTurnsRemain = true;
        reply += blurbs.getBlurb(blurbs.botUsingTincture);
      } else {
        // reply += blurbs.getBlurb(blurbs.playerNoHave);
      }
      break;
    case 4:
      if (gameState.bot.protection == 0 && gameState.bot.magicItems[3] != "") {
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
  reply += "<br/>";
  return { message: reply, gameState: gameState };
  //  return "Processing magic item " + which + ".";
}

export function pickUpItemBot(gameState) {
  // when bot picks something up
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
    reply += "Your enemy picked up the " + item + ".  Ohhhh, snap!";

    gameState.advance = true;
    gameState.map[gameState.bot.position[1]] = maps.replaceChar(
      gameState.bot.position[0],
      gameState.map[gameState.bot.position[1]],
      "B"
    );
  }
  return { message: reply, gameState: gameState };
}

export function processAttackBot(gameState) {
  // adjust bot and player
  let reply = "";
  let damage = 0;
  let damStr = ""; // damage message
  let prob = Math.floor(Math.random() * 10); // dice roll
  if (prob < 1.2) {
    // 12% chance of a clean miss
    damage = 0;
    damStr = blurbs.getBlurb(blurbs.botMisses);
  } else if (prob < 3.8) {
    // 26% chance of a glancing blow
    damage = gameState.bot.attack - 5;
    damStr = blurbs.getBlurb(blurbs.botGlancingBlow);
  } else {
    // 62% chance direct hit at full strength
    damage = gameState.bot.attack;
    damStr = blurbs.getBlurb(blurbs.botDirectHits);
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
  return { message: reply, gameState: gameState };
}

export function processMovementBot(str, gameState) {
  let reply = "";
  let colMax = gameState.map.length - 1;
  let rowMax = gameState.map[0].length - 1;
  reply += "The enemy is moving ";
  switch (str) {
    case "n": {
      if (
        notWall(
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
        notWall(
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
        notWall(
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
        notWall(
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
    gameState.mode = "game-over";
    gameState.advance = false;
  }
  // if you're on a hole, fall
  else if (
    gameState.map[gameState.bot.position[1]].charAt(
      gameState.bot.position[0]
    ) == "H"
  ) {
    reply += blurbs.getBlurb(blurbs.botFallsHole);
    gameState.mode = "game-over";
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
      gameState.mode = "game-over";
      gameState.advance = false;
    } else if (Math.random() <= dropProb) {
      let rObj = {};
      rObj = dropWeaponBot(gameState);
      reply += rObj.message;
      gameState = rObj.gameState;
    }
  }
  return { message: reply, gameState: gameState };
}

function dropWeaponBot(gameState) {
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
  return { message: reply, gameState: gameState };
}

export function depleteMagicBot(gameState) {
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
  return gameState;
}

export function resetForDeadBot(gameState) {
  // reset map, reset bot progressive, plus-up player, show continue story message
  // drop map - use to keep warm.  new blurb.  Time progresses, walls become rubble, the ground shifts, trees grow.  Its as if you are in a new place altogether, but still hauntingly familiar.
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
  /*
               setState("active");
        protagonist.positRow = 0;
        protagonist.positCol = 0;
        protagonist.health += 25;
        System.out.println("You make your way back to your camp to sharpen your weapons, grab some grub, and get cleaned up.\n");
        System.out.println("You clean your loin cloth and your health improves by 25 points.\n");
        System.out.println("Another soul has been exiled to the Grove to challenge your reign.\n");
        System.out.println("You almost feel sorry for them, then you remember that poem.\n");
        System.out.println(Game.poem);
        enemy = new Player("enemy", true);
        enemy.health += (5 * protagonist.wins);  // plussed up enemy health the more you win
        enemy.shield += protagonist.wins;  // plussed up enemy shield the more you win
        System.out.println("The more newly exiled souls you slaughter, the stronger they get, eh?\n");
        System.out.println("Enemy health: " + enemy.health);
        System.out.println("Enemy shield: " + enemy.shield);
        System.out.println();
        getReturn(); */
  gameState.player.wins++;
  let reply = "";
  reply += getBlurb(blurbs.gameOver);
  reply += getBlurb(blurbs.playerWins);
  reply += `You have defeated ${gameState.player.wins} challengers.`;
  reply += getBlurb(blurbs.regenerate);
  reply += getBlurb(blurbs.gameResetAfterWin);
  reply += getBlurb(blurbs.strongerEnemyTaunt);
  return "Everything handled here for dead player";
}
