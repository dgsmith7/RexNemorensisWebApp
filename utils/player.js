import * as blurbs from "./blurbs.js";

export function processMagic(which, gameState) {
  // when player invokes magic item
  // adjust powers
  // start countdown
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
        reply += blurbs.getBlurb(blurbs.playerUsingGaunlet);
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
      if (gameState.player.speed == 0 && gameState.player.magicItems[4] != "") {
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
  return { message: reply, gameState: gameState };
  //  return "Processing magic item " + which + ".";
}

export function pickUpItem(gameState) {
  // when player picks something up
  //determine which item using location
  // add to inventory
  /*
          String item = "";
        boolean noItem = false;
        switch (GameMap.layout[this.positRow].charAt(this.positCol)) {
            case '1':
                item = "Cloak of invisibility: Incoming attack 0 damage for 3 turns when used.  Press '1' to use.";
                this.magicItems[0] = item;
                break;
            case '2':
                item = "Gauntlet of strength: Attack force +5 for 3 turns when used.  Press '2' to use.";
                this.magicItems[1] = item;
                break;
            case '3':
                item = "Tincture of restoration: Health +5 for 3 turns when used.  Press '3' to use.";
                this.magicItems[2] = item;
                break;
            case '4':
                item = "Ring of protection: Shield +5 for 3 turns when used.  Press '4' to use.";
                this.magicItems[3] = item;
                break;
            case '5':
                item = "Crown of speed: 2x attack for three turns when used.  Press '5' to use.";
                this.magicItems[4] = item;
                break;
            case 'A':
                item = "axe. Direct hits will henceforth inflict 20 damage.";
                this.weapon = "axe";
                this.attack = 20;
                break;
            case 'S':
                if (weapon.equals("sword") && name.equals("hero")) {  // hero already has one
                    System.out.println("You already have a sword, Greed-o.");
                } else if (!weapon.equals("axe")) {  // enemy or hero does not have one
                    item = "sword. Direct hits will henceforth inflict 15 damage.";
                    this.weapon = "sword";
                    this.attack = 15;
                } else {  // hero already has a better weapon
                    noItem = true;
                    if (name.equals("hero")) {
                            System.out.println("You decide to forgo the sword for the superior axe in hand.");
                        }
                    turnCodes[0] = false;
                }
                break;
            case 'D':
                item = "shield. All hits from enemies will henceforth be reduced by 5 damage.";
                this.shield = 5;
                break;
            default:  // user pressed g when there is nothing to pick up
                System.out.println("There is nothing to get here, pal.");
                noItem = true;
                break;
        }
        if (!noItem) {
            if (name.equals("hero")) {
                System.out.println("You picked up the " + item + " Press I for inventory.");
            } else {
                System.out.println("The enemy picked up the " + item + ".  Oh, snap!");
            }
            this.turnCodes[0] = true;
            GameMap.layout[this.positRow] = GameMap.replaceChar(this.positCol, GameMap.layout[this.positRow], 'B');
        }
  */
  return "Picked up the ...";
}

export function dropWeapon(gameState) {
  // when a play accidentally drops a weapon
}

export function processAttack(gameState) {
  // adjust bot and player
  /*
          String damStr = ""; // damage message
        String missStr = ""; // you missed message
        float prob = (float) Math.floor(Math.random() * 10); // dice?
        if (prob < 1.2) { // 12% chance of a clean miss
            this.damage = 0;
            damStr = "A swing and a miss!  Your enemy grins.  Hey batter, batter, batter, sssssswingggggg, batterrrrrrr!!";
            missStr = "You swing at nothing and miss - and also manage to look like a total jackass.";
        } else if (prob < 3.8) { // 26% chance of a glancing blow
            this.damage = this.attack - 5;
            damStr = "You struck a glancing blow! Your enemy grunts and furrows their brow a bit.";
            missStr = "You attack the thin air vigorously, making it even thinner - not your best look but at least you got in a quick workout.";
        } else {  // 62% chance direct hit at full strength
            this.damage = this.attack;
            damStr = "A direct hit! The smile leaves your enemy's eyes as they stumble back.";
            missStr = "You swing at what appears to be your own shadow.  Your form was perfect and you looked like a complete badass, except that there is nobody to attack.";
        }
        if (this.name.equals("hero")) {  // only show hit messages if its hero and enemy not "invisible"
            if (Game.nearEachOther() && Game.enemy.invisibility == 0) {
                System.out.println(damStr);
            } else {
                System.out.println(missStr);
            }
            this.turnCodes[0] = true;
        }
  */
  return "You attacked and did x damage.";
}

export function processMovement(str, gameState) {
  /*
          if (name.equals("hero")) {
            System.out.print("You are moving ");
        } else {
            if (Game.enemy.invisibility == 0) System.out.print("The enemy is moving ");
        }
        if (s.equals("N")) {
            if (Game.gameMap.notWall(this.positCol, this.positRow - 1)) {
                this.positRow--;
                if (Game.enemy.invisibility == 0 || name.equals("hero")) System.out.println("North.");
            } else {
                if (Game.enemy.invisibility == 0 || name.equals("hero"))
                    System.out.println("but something blocks the path.");
            }
        }
        if (s.equals("S")) {
            if (Game.gameMap.notWall(this.positCol, this.positRow + 1)) {
                this.positRow++;
                if (Game.enemy.invisibility == 0 || name.equals("hero")) System.out.println("South.");
            } else {
                if (Game.enemy.invisibility == 0 || name.equals("hero"))
                    System.out.println("but something blocks the path.");
            }
        }
        if (s.equals("W")) {
            if (Game.gameMap.notWall(this.positCol - 1, this.positRow)) {
                this.positCol--;
                if (Game.enemy.invisibility == 0 || name.equals("hero")) System.out.println("West.");
            } else {
                if (Game.enemy.invisibility == 0 || name.equals("hero"))
                    System.out.println("but something blocks the path.");
            }
        }
        if (s.equals("E")) {
            if (Game.gameMap.notWall(this.positCol + 1, this.positRow)) {
                this.positCol++;
                if (Game.enemy.invisibility == 0 || name.equals("hero")) System.out.println("East.");
            } else {
                if (Game.enemy.invisibility == 0 || name.equals("hero"))
                    System.out.println("but something blocks the path.");
            }
        }
        // if you're off the edge, fall
        if (this.positRow < 0 || this.positRow > 7 || this.positCol < 0 || this.positCol > 7) {
            if (name.equals("hero")) {
                System.out.println("You fell to your death, you clumsy fool!\n");
            } else {
                System.out.println("You hear sliding gravel, see a blur in the corner of your eye and realize that the enemy fell to their death.  Clumsy fool!\n");
            }
            Game.setState("game-over");
            Game.endName = name;
        } else {
            // if your on a hole, fall
            if (GameMap.layout[this.positRow].charAt(this.positCol) == 'H') {
                if (name.equals("hero")) {
                    System.out.println("You fell a great distance down a hot, smelly hole and died a horrible, hot, smelly death!\n");
                } else {
                    System.out.println("You hear the enemy scream as they fall to their hot, smelly death down a hot, smelly hole!\n");
                }
                Game.setState("game-over");
                Game.endName = name;
            }
        }
        System.out.println();
  */
  // move player around board
  return "Moving in the direction of " + str;
}

export function depletePlayerMagic(gameState) {
  let reply = "";
  if (gameState.player.invisibility > 0) {
    gameState.player.invisibility--;
    if (gameState.player.invisibility == 0) {
      gameState.player.invisibilityTurnsRemain = false;
      reply += getBlurb(blurbs.cloakFade);
      gameState.player.magicItems[0] = "";
    } else {
      reply += `Your magic invisibility will be gone in ${gameState.player.invisibility} turns.`;
    }
  }
  if (gameState.player.strength > 0) {
    gameState.player.strength--;
    if (gameState.player.strength == 0) {
      gameState.player.strengthTurnsRemain = false;
      reply += getBlurb(blurbs.gauntletFade);
      gameState.player.magicItems[1] = "";
    } else {
      reply += `Your magic strength will be gone in ${gameState.player.strength} turns.`;
    }
  }
  if (gameState.player.restoration > 0) {
    gameState.player.restoration--;
    gameState.player.health += 5;
    reply += `Ahhhhh! The tincture kicked in, increasing your health is now ${gameState.player.health}`;
    if (gameState.player.restoration == 0) {
      gameState.player.restorationTurnsRemain = false;
      reply += getBlurb(blurbs.tinctureFade);
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
      reply += getBlurb(blurbs.ringFade);
      gameState.player.magicItems[3] = "";
    } else {
      reply += `Your magic protection will be gone in ${gameState.player.protection} turns.`;
    }
  }
  if (gameState.player.speed > 0) {
    gameState.player.speed--;
    if (gameState.player.speed == 0) {
      gameState.player.speedTurnsRemain = false;
      reply += getBlurb(blurbs.crownFade);
      gameState.player.magicItems[4] = "";
    } else {
      reply += `Your magic speed will be gone in ${gameState.player.speed} turns.`;
    }
  }
  reply += "<br/>";
  return { message: reply, gameState: gameState };
}

export function buildInventoryBlurb(gameState) {
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
    reply += `Your loin cloth flaps with the wind...You blush.
`;
  }
  return reply;
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
