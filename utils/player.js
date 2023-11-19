import * as blurbs from "./blurbs.js";
import * as maps from "./maps.js";

export async function processMagicPlayer(which, gameState) {
  console.log("---player.processMagicPlayer---");
  return new Promise((resolve, reject) => {
    // when player invokes magic item
    let reply = "";
    switch (which) {
      case 1:
        if (
          gameState.player.invisibility == 0 &&
          gameState.player.magicItems[0] != ""
        ) {
          gameState.player.magicItems[0] = "";
          gameState.player.invisibility = 4;
          gameState.player.invisTurnsRemain = true;
          reply += blurbs.getBlurb(blurbs.playerUsingCloak);
        } else {
          reply += blurbs.getBlurb(blurbs.playerNoHave);
        }
        break;
      case 2:
        if (
          gameState.player.strength == 0 &&
          gameState.player.magicItems[1] != ""
        ) {
          gameState.player.magicItems[1] = "";
          gameState.player.strength = 4;
          gameState.player.invisTurnsRemain = true;
          reply += blurbs.getBlurb(blurbs.playerUsingGauntlet);
        } else {
          reply += blurbs.getBlurb(blurbs.playerNoHave);
        }
        break;
      case 3:
        if (
          gameState.player.restoration == 0 &&
          gameState.player.magicItems[2] != ""
        ) {
          gameState.player.magicItems[2] = "";
          gameState.player.restoration = 4;
          gameState.player.restorationTurnsRemain = true;
          reply += blurbs.getBlurb(blurbs.playerUsingTincture);
        } else {
          reply += blurbs.getBlurb(blurbs.playerNoHave);
        }
        break;
      case 4:
        if (
          gameState.player.protection == 0 &&
          gameState.player.magicItems[3] != ""
        ) {
          gameState.player.magicItems[3] = "";
          gameState.player.protection = 4;
          gameState.player.shield += 5;
          gameState.player.protectionTurnsRemain = true;
          reply += blurbs.getBlurb(blurbs.playerUsingRing);
        } else {
          reply += blurbs.getBlurb(blurbs.playerNoHave);
        }
        break;
      case 5:
        if (
          gameState.player.speed == 0 &&
          gameState.player.magicItems[4] != ""
        ) {
          gameState.player.magicItems[4] = "";
          gameState.player.speed = 4;
          gameState.player.speedTurnsRemain = true;
          reply += blurbs.getBlurb(blurbs.playerUsingCrown);
        } else {
          reply += blurbs.getBlurb(blurbs.playerNoHave);
        }
        break;
    }
    reply += "<br/>";
    console.log("processed player magic - ", reply);
    resolve({ message: reply, gameState: gameState });
    //  return "Processing magic item " + which + ".";
  });
}

export async function pickUpItemPlayer(gameState) {
  console.log("---player.pickupItemPlayer---");
  // when player picks something up
  //determine which item using location
  // add to inventory
  return new Promise((resolve, reject) => {
    let reply = "";
    let item = "";
    let noItem = false;
    switch (
      gameState.map[gameState.player.position[1]].charAt(
        gameState.player.position[0]
      )
    ) {
      case "1":
        item = blurbs.magicItems[0];
        gameState.player.magicItems[0] = item;
        break;
      case "2":
        item = blurbs.magicItems[1];
        gameState.player.magicItems[1] = item;
        break;
      case "3":
        item = blurbs.magicItems[2];
        gameState.player.magicItems[2] = item;
        break;
      case "4":
        item = blurbs.magicItems[3];
        gameState.player.magicItems[3] = item;
        break;
      case "5":
        item = blurbs.magicItems[4];
        gameState.player.magicItems[4] = item;
        break;
      case "A":
        if (gameState.player.weapon == "axe") {
          // hero already has one
          noItem = true;
          reply += blurbs.getBlurb(blurbs.alreadyHasAxe);
          gameState.advance = false;
        } else {
          item = blurbs.axe[0];
          gameState.player.weapon = "axe";
          gameState.player.attack = 20;
        }
        break;
      case "S":
        if (gameState.player.weapon == "sword") {
          // hero already has one
          noItem = true;
          reply += blurbs.getBlurb(blurbs.swordForSword);
        } else if (gameState.player.weapon == "axe") {
          // hero already has a better weapon
          noItem = true;
          reply += blurbs.getBlurb(blurbs.swordForAxe) + "<br/>";
          gameState.advance = false;
        } else {
          // enemy or hero does not have one
          item = blurbs.sword[0];
          gameState.player.weapon = "sword";
          gameState.player.attack = 15;
        }
        break;
      case "D":
        if (gameState.player.hasShield) {
          // hero already has one
          noItem = true;
          reply += blurbs.getBlurb(blurbs.alreadyHasShield);
        } else {
          item = blurbs.shield[0];
          gameState.player.hasShield = true;
          gameState.player.shield = 5;
        }
        break;
      case "M":
        item = blurbs.map[0];
        gameState.player.hasMap = true;
        break;
      default: // user pressed g when there is nothing to pick up
        reply += blurbs.getBlurb(blurbs.nothingHere);
        noItem = true;
        break;
    }
    if (!noItem) {
      reply += "You picked up the " + item + "\nPress I for inventory.";

      gameState.advance = true;
      gameState.map[gameState.player.position[1]] = maps.replaceChar(
        gameState.player.position[0],
        gameState.map[gameState.player.position[1]],
        "B"
      );
    }
    console.log("player piced up item - ", reply);
    resolve({ message: reply, gameState: gameState });
  });
}

export async function processAttackPlayer(gameState) {
  console.log("---player.processAttackPlayer---");
  // adjust bot and player
  return new Promise((resolve, reject) => {
    let reply = "";
    let damage = 0;
    let damStr = ""; // damage message
    let prob = Math.floor(Math.random() * 10); // dice roll
    if (prob < 1.2) {
      // 12% chance of a clean miss
      damage = 0;
      damStr = blurbs.getBlurb(blurbs.playerMisses);
    } else if (prob < 3.8) {
      // 26% chance of a glancing blow
      damage = gameState.player.attack - 5;
      damStr = blurbs.getBlurb(blurbs.playerGlancingBlow);
    } else {
      // 62% chance direct hit at full strength
      damage = gameState.player.attack;
      damStr = blurbs.getBlurb(blurbs.playerDirectHits);
    }
    if (maps.nearEachOther(gameState)) {
      reply += damStr;
    } else {
      damage = 0;
      reply += blurbs.getBlurb(blurbs.playerNoEnemy);
    }
    gameState.advance = true;
    gameState.player.damage = damage;
    reply += `<br/>`;
    console.log("player attacked - ", reply);
    resolve({ message: reply, gameState: gameState });
  });
}

export async function processMovementPlayer(str, gameState) {
  console.log("---player.processMovementPlayer---");
  return new Promise(async (resolve, reject) => {
    let reply = "";
    let colMax = gameState.map.length - 1;
    let rowMax = gameState.map[0].length - 1;
    reply += "You are moving ";
    switch (str) {
      case "n": {
        if (
          maps.notWall(
            gameState.player.position[0],
            gameState.player.position[1] - 1,
            colMax,
            rowMax,
            gameState
          )
        ) {
          gameState.player.position[1]--;
          reply += "North.<br/>";
        } else {
          reply += "but something blocks the path.";
        }
        break;
      }
      case "s": {
        if (
          maps.notWall(
            gameState.player.position[0],
            gameState.player.position[1] + 1,
            colMax,
            rowMax,
            gameState
          )
        ) {
          gameState.player.position[1]++;
          reply += "South.<br/>";
        } else {
          reply += "but something blocks the path.";
        }
        break;
      }
      case "w": {
        if (
          maps.notWall(
            gameState.player.position[0] - 1,
            gameState.player.position[1],
            colMax,
            rowMax,
            gameState
          )
        ) {
          gameState.player.position[0]--;
          reply += "West.<br/>";
        } else {
          reply += "but something blocks the path.";
        }
        break;
      }
      case "e": {
        if (
          maps.notWall(
            gameState.player.position[0] + 1,
            gameState.player.position[1],
            colMax,
            rowMax,
            gameState
          )
        ) {
          gameState.player.position[0]++;
          reply += "East.<br/>";
        } else {
          reply += "but something blocks the path.";
        }
        break;
      }
    }

    // if you're off the edge, fall
    if (
      gameState.player.position[1] < 0 ||
      gameState.player.position[1] > rowMax ||
      gameState.player.position[0] < 0 ||
      gameState.player.position[0] > colMax
    ) {
      reply += blurbs.getBlurb(blurbs.playerFallsEdge) + "<br/>";
      console.log("Player fell from edge ", reply);
      gameState.mode = "player-died";
      gameState.advance = false;
      gameState.gameOver = true;
    }
    // if you're on a hole, fall
    else if (
      gameState.map[gameState.player.position[1]].charAt(
        gameState.player.position[0]
      ) == "H"
    ) {
      reply += blurbs.getBlurb(blurbs.playerFallsHole);
      gameState.mode = "player-died";
      gameState.advance = false;
      gameState.gameOver = true;
    }

    // if you are along an edge, maybe fall off, maybe drop weapon
    else if (
      gameState.player.position[0] == 0 ||
      gameState.player.position[0] == colMax ||
      gameState.player.position[1] == 0 ||
      gameState.player.position[1] == rowMax
    ) {
      let fallProb = 0.03; // 3% chance of falling
      let dropProb = 0.05; // 5% chance of falling
      if (Math.random() <= fallProb) {
        //fall
        reply += blurbs.getBlurb(blurbs.playerFallsEdge) + "<br/>";
        reply += `There is a ${parseInt(
          fallProb * 100
        )}% chance of this when transiting the cliff edge. `;
        console.log("Player fell from edge by chance ", reply);
        gameState.mode = "player-died";
        gameState.advance = false;
        gameState.gameOver = true;
      } else if (Math.random() <= dropProb) {
        await dropWeaponPlayer(gameState).then((data) => {
          reply += data.message + "<br/>";
          reply += `There is a ${parseInt(
            dropProb * 100
          )}% chance of dropping your weapon when moving along the mesa's edge. `;
          gameState = data.gameState;
        });
      }
    }
    console.log("player movement processed - ", reply);
    resolve({ message: reply, gameState: gameState });
  });
}

function dropWeaponPlayer(gameState) {
  console.log("---player.dropWeaponPlayer---");
  return new Promise((resolve, reject) => {
    let reply = "";
    reply += blurbs.getBlurb(blurbs.playerDropsWeapon) + "\n";
    switch (
      gameState.player.weapon // using fall-through behavior
    ) {
      case "axe":
        if (gameState.player.hasSword) {
          gameState.player.weapon = "sword";
          gameState.player.attack = 15;
          break; // using fall-through behavior
        } // using fall-through behavior
      case "sword":
        gameState.player.hasSword = false;
        if (gameState.player.hasDagger) {
          gameState.player.weapon = "dagger";
          gameState.player.attack = 10;
          break; // using fall-through behavior
        } // using fall-through behavior
      case "dagger":
        gameState.player.hasDagger = false;
        gameState.player.weapon = "fist";
        gameState.player.attack = 5;
        break;
      default: // fists cannot be dropped
        break;
    }
    reply += `You are now using your ${gameState.player.weapon}.  You deal ${gameState.player.attack} damage with each direct hit.`;
    console.log("player dropped weapon - ", reply);
    resolve({ message: reply, gameState: gameState });
  });
}

export async function depleteMagicPlayer(gameState) {
  console.log("---player.depleteMagicPlayer---");
  return new Promise((resolve, reject) => {
    console.log("adjusting magic items");
    let reply = "";
    if (gameState.player.invisibility > 0) {
      gameState.player.invisibility--;
      if (gameState.player.invisibility == 0) {
        gameState.player.invisibilityTurnsRemain = false;
        reply += blurbs.getBlurb(blurbs.cloakFade);
        gameState.player.magicItems[0] = "";
      } else {
        reply += `Your magic invisibility will be gone in ${gameState.player.invisibility} turns.`;
      }
    }
    if (gameState.player.strength > 0) {
      gameState.player.strength--;
      if (gameState.player.strength == 0) {
        gameState.player.strengthTurnsRemain = false;
        reply += blurbs.getBlurb(blurbs.gauntletFade);
        gameState.player.magicItems[1] = "";
      } else {
        reply += `Your magic strength will be gone in ${gameState.player.strength} turns.`;
      }
    }
    if (gameState.player.restoration > 0) {
      gameState.player.restoration--;
      gameState.player.health += 5;
      reply += `Ahhhhh! The tincture kicked in, increasing your health is now ${gameState.player.health}\n`;
      if (gameState.player.restoration == 0) {
        gameState.player.restorationTurnsRemain = false;
        reply += blurbs.getBlurb(blurbs.tinctureFade);
        gameState.player.magicItems[2] = "";
      } else {
        reply += `Your magic restoration will be gone in ${gameState.player.restoration} turns.`;
      }
    }
    if (gameState.player.protection > 0) {
      gameState.player.protection--;
      if (gameState.player.protection == 0) {
        gameState.player.shield -= 5;
        gameState.player.protectionTurnsRemain = false;
        reply += blurbs.getBlurb(blurbs.ringFade);
        gameState.player.magicItems[3] = "";
      } else {
        reply += `Your magic protection will be gone in ${gameState.player.protection} turns.`;
      }
    }
    if (gameState.player.speed > 0) {
      gameState.player.speed--;
      if (gameState.player.speed == 0) {
        gameState.player.speedTurnsRemain = false;
        reply += blurbs.getBlurb(blurbs.crownFade);
        gameState.player.magicItems[4] = "";
      } else {
        reply += `Your magic speed will be gone in ${gameState.player.speed} turns.`;
      }
    }
    reply += "<br/>";
    console.log("Magic items adjusted.  reply = ", reply);
    resolve({ message: reply, gameState: gameState });
  });
}

export async function buildInventoryBlurb(gameState) {
  console.log("---player.buildInventoryBlurb---");
  // tested
  // this will show the inventory and staus
  return new Promise((resolve, reject) => {
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
        reply += blurbs.magicInventory[index] + "<br/>";
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
      reply += `   ${blurbs.getBlurb(blurbs.loin)}

`;
    }
    reply += `You have defeated ${gameState.player.wins} challengers.
`;
    if (Math.random() < 0.5) {
      reply += blurbs.getBlurb(blurbs.extraQuip) + "<br/>";
    }
    console.log("built inventory blurb - ", reply);
    resolve(reply);
  });
}

export function resetForDeadPlayer(gameState) {
  console.log("---player.resetForDeadPlayer---");
  return new Promise((resolve, reject) => {
    let reply = "";
    reply += blurbs.getBlurb(blurbs.gameOver) + "<br/>";
    reply += blurbs.getBlurb(blurbs.playerLoses);
    console.log("handled dead player ", reply);
    resolve({ message: reply, gameState: gameState });
  });
}
