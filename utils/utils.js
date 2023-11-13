import * as blurbs from "./components/blurbs.js";
import * as maps from "./components/maps.js";
import badwordsArray from "../node_modules/badwords/array.js";

export function processMove(move, gameState) {
  let reply = "";
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
      reply = maps.displayMap(gameState);
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
      hasMap: true, //false,
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
    map: maps.layouts[0], //maps[parseInt(Math.random(maps.length))],
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
  return getBlurb(blurbs.quitMessage) + "<br/>";
}

function processMagic(which, gameState) {
  // when player invokes magic item
  // adjust powers
  // start countdown
  /*
          switch (s) {
            case "1":
                if (this.invisibility == 0 && this.magicItems[0] != null) {
                    this.magicItems[0] = null;
                    this.invisibility = 4;
                    this.turnCodes[1] = true;
                    if (this.name.equals("hero")) {
                        System.out.println("You slide the cloak over your shoulders and suddenly disappear (too bad 'cuz your coiffure looks great today). You are safe from attack for now.");
                    } else {
                        System.out.println("The enemy vanished into thin air.");
                    }
                } else {
                    System.out.println("Good try, Rockstar, but you don't own that item.");
                }
                break;
            case "2":
                if (this.strength == 0 && this.magicItems[1] != null) {
                    this.magicItems[1] = null;
                    this.strength = 4;
                    this.turnCodes[2] = true;
                    if (this.name.equals("hero")) {
                        System.out.println("The gauntlet fits your hand like a.....uhhh - gauntlet, and you feel strong enough to pull the ears of a Gundark.");
                    } else {
                        System.out.println("The enemy donned the Gauntlet of Strength.");
                    }
                } else {
                    System.out.println("I don't think so, mate. You don't own that item.");
                }
                break;
            case "3":
                if (this.restoration == 0 && this.magicItems[2] != null) {
                    this.magicItems[2] = null;
                    this.restoration = 4;
                    this.turnCodes[3] = true;
                    if (this.name.equals("hero")) {
                        System.out.println("You drink deeply. This is better than the immuno-boost at Jamba Juice. You health begins to build.");
                    } else {
                        System.out.println("The enemy chugged a vile of The Tincture of Restoration.");
                    }
                } else {
                    System.out.println("As if you own that item or something.");
                }
                break;
            case "4":
                if (this.protection == 0 && this.magicItems[3] != null) {
                    this.magicItems[3] = null;
                    this.protection = 4;
                    this.shield += 5;
                    this.turnCodes[4] = true;
                    if (this.name.equals("hero")) {
                        System.out.println("The ring slides easily onto your hand and you are surrounded by a strange protective aura.");
                    } else {
                        System.out.println("The enemy said 'I do' to the Ring of Protection. I bet that honeymoon 'll suck!");
                    }
                } else {
                    System.out.println("Uhhhhh, you need to get one to wear one, Dufus.");
                }
                break;
            case "5":
                if (this.speed == 0 && this.magicItems[4] != null) {
                    this.magicItems[4] = null;
                    this.speed = 4;
                    this.turnCodes[5] = true;
                    if (this.name.equals("hero")) {
                        System.out.println("As you carefully place the crown atop your head, careful not to mess up your elaborate hairdo, you noticed it is adorned with jeweled wings.  Your hands seem twice as fast as before.  Hmmmmm, you ponder, I wonder if I could attack twice in the same amount of time it takes to attack once.");
                    } else {
                        System.out.println("The enemy messed up their do while donning the Crown of Speed.");
                    }
                } else {
                    System.out.println("Negative, Ghost-rider, the pattern is full.  You don't own that item.");
                }
                break;
        }
  */
  return "Processing magic item " + which + ".";
}

function pickUpItem() {
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

function dropWeapon() {
  // when a play accidentally drops a weapon
}

function processAttack() {
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

function isSwearWord(str) {
  let profane = false;
  badwordsArray.forEach((item) => {
    if (str.includes(item)) profane = true;
  });
  return profane;
}

function processMovement(str) {
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

function generateBotMove(gameState) {
  // "AI" bot
  /*
         String dir = getSafeDir();
        if (Game.nearEachOther()) {  // if enemy in strike distance
            if (this.health >= 50) { // attack if health above 50
                return "A";  // attack
            } else if (this.health >= 20) { // if between 20 and 50 use magic first then attack
                if (this.magicItems[0] != null) {
                    return "1";
                } else if (this.magicItems[1] != null) {
                    return "2";
                } else if (this.magicItems[2] != null) {
                    return "3";
                } else if (this.magicItems[3] != null) {
                    return "4";
                } else if (this.magicItems[4] != null) {
                    return "5";
                } else {
                    return "A";  // no more magic to invoke - start attacking again
                }
            } else { // if lower than 20 run away
                return dir;
            }
            // or if there is nobody to attack and there is something to pick up, do it
        } else if ("ASD12345".contains(String.valueOf(GameMap.layout[this.positRow].charAt(this.positCol)))) { // something to get
            return "G";
        } else { // otherwise just move
            return dir;
        }

        public boolean edgeFall(String dir) {  // bot checking to see if it will fall off edge
        return (this.positCol == 0 && (dir.equals("W")) ||
                (this.positCol == GameMap.mapCol - 1 && dir.equals("E")) ||
                (this.positRow == 0 && dir.equals("N")) ||
                (this.positRow == GameMap.mapRow - 1 && dir.equals("S")));
    }

    public boolean edgeWall(String dir) {  // bot checking for walls when at edge of mesa - good Gawd!
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
  /*
        return (((this.positCol == GameMap.mapCol - 1 && (dir.equals("W") && !String.valueOf(GameMap.layout[positRow].charAt(positCol - 1)).equals("W"))) ||
                (this.positCol == 0 && (dir.equals("E") && !String.valueOf(GameMap.layout[positRow].charAt(positCol + 1)).equals("W"))) ||
                (this.positRow == GameMap.mapRow - 1 && (dir.equals("N") && !String.valueOf(GameMap.layout[positRow - 1].charAt(positCol)).equals("W"))) ||
                (this.positRow == 0 && (dir.equals("S") && !String.valueOf(GameMap.layout[positRow + 1].charAt(positCol)).equals("W")))))
                ||
                (((this.positCol != GameMap.mapCol - 1 && (dir.equals("E") && !String.valueOf(GameMap.layout[positRow].charAt(positCol + 1)).equals("W"))) ||
                        (this.positCol != 0 && (dir.equals("W") && !String.valueOf(GameMap.layout[positRow].charAt(positCol - 1)).equals("W"))) ||
                        (this.positRow != GameMap.mapRow - 1 && (dir.equals("S") && !String.valueOf(GameMap.layout[positRow + 1].charAt(positCol)).equals("W"))) ||
                        (this.positRow != 0 && (dir.equals("N") && !String.valueOf(GameMap.layout[positRow - 1].charAt(positCol)).equals("W")))));
    }

    public boolean nonEdgeWall(String dir) {  // bot checking for walls when not at edge of mesa
        String n = String.valueOf(GameMap.layout[positRow - 1].charAt(positCol));
        String e = String.valueOf(GameMap.layout[positRow].charAt(positCol + 1));
        String s = String.valueOf(GameMap.layout[positRow + 1].charAt(positCol));
        String w = String.valueOf(GameMap.layout[positRow].charAt(positCol - 1));
        return !((n.equals("W") && dir.equals("N")) ||
                (s.equals("W") && dir.equals("S")) ||
                (e.equals("W") && dir.equals("E")) ||
                (w.equals("W") && dir.equals("W")));

    }

    public String getSafeDir() {  // bot getting direction to try and checking it out
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
  /*
        String dir = "N";
        dir = getRandomDir(dir);
        boolean safe = false;
        while (!safe) {
            safe = true;  // assume its a good direction unless proven otherwise below
            dir = getRandomDir(dir);
            if (positCol == 0 || positCol == (GameMap.mapCol - 1) || positRow == 0 || (positRow == GameMap.mapRow - 1)) {// on a cliff edge
                float probSure = (float) (Math.random() * 10);  // determine if I should check if Im near a ledge
                if (probSure < 9.8) {// check for a potential fall only 98 % of the time - sometimes enemy falls off
                    safe = (!edgeFall(dir));
                }
                safe = safe && edgeWall(dir);  // combine the two checks above without overriding one
            } else { // not on an edge
                safe = nonEdgeWall(dir);
            }
        }
        return dir;
    }

    public String getRandomDir(String dir) {  // bot getting initial direction during move process
        switch ((int) (Math.random() * 4)) {
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
}
  */
}

function getLocationBlurb(gameState) {
  /*
          String report = "You are located in a grove on a mesa on row " + Game.protagonist.positRow + " - column " + Game.protagonist.positCol + "\n";
        if (Game.enemy.invisibility == 0) {
            report += "You spot your enemy on row " + Game.enemy.positRow + " - column " + Game.enemy.positCol + "\n";
        } else {
            report += "The enemy is invisible at the moment.  Sneaky!\n";
        }
        char nChar = 'L';
        char sChar = 'L';
        char wChar = 'L';
        char eChar = 'L';
        boolean signif = false;
        // look in each direction for reportable info
        if (col != 0) {
            wChar = layout[row].charAt(col - 1);
        }
        if (col != 7) {
            eChar = layout[row].charAt(col + 1);
        }
        if (row != 0) {
            nChar = layout[row - 1].charAt(col);
        }
        if (row != 7) {
            sChar = layout[row + 1].charAt(col);
        }
        // holes
        if (nChar == 'H' || sChar == 'H' || wChar == 'H' || eChar == 'H') {
            report += "A foul, hot stench rises from a nearby hole in the ground.\n";
        }
        // walls
        if (nChar == 'W') report += "A raven circles high above the wall of a ruin to the North.\n";
        if (sChar == 'W') report += "You feel the cool moisture of a stone wall to your South.\n";
        if (wChar == 'W') report += "A granite boulder to the West blocks out the light.\n";
        if (eChar == 'W') report += "The east is impassable due to a barrier.\n";
        // edges
        if (row == 0) {
            report += "The view is great, but you feel your stomach tighten as you slip on some gravel near the Northern precipice.\n";
        }
        if (row == 7) {
            report += "Something deep below your guts begins to pucker because your are near the high Southern rim.\n";
        }
        if (col == 0) {
            report += "Your head feels light and your vision grows dim near the Western cliff-edge of the grove.\n";
        }
        if (col == 7) {
            report += "Your knees tremble as you peer over the Eastern ledge at the gorgeous vista of Lake Nemi.\n";
        }
        // magic items
        if (layout[row].charAt(col) == '1') {
            report += "You see a scarlet cloak among a pile of bones here.\n";
            signif = true;
        }
        if (layout[row].charAt(col) == '2') {
            report += "A metal glove hangs from a golden bough of a nearby dead tree.\n";
            signif = true;
        }
        if (layout[row].charAt(col) == '3') {
            report += "There is a delicate clay bottle containing an iridescent liquid atop an altar.\n";
            signif = true;
        }
        if (layout[row].charAt(col) == '4') {
            report += "A ring with an inscription, smelt of rare metal, that is laying at your feet, begins to vibrate.\n";
            signif = true;
        }
        if (layout[row].charAt(col) == '5') {
            report += "An ornate crown fit for a king glows brightly as you approach.\n";
            signif = true;
        }
        // weapons
        if (layout[row].charAt(col) == 'A') {
            report += "A heavy axe with a keen edge is stuck in a nearby stump.\n";
            signif = true;
        }
        if (layout[row].charAt(col) == 'S') {
            report += "You hear a low hum coming from a well-crafted sword on the ground.\n";
            signif = true;
        }
        if (layout[row].charAt(col) == 'D') {
            report += "You see a sturdy shield propped on a rock.\n";
            signif = true;
        }
        if (signif) report += "Press 'g' to get this item.\n";
        // enemy
        if ((Math.abs(Game.protagonist.positCol - Game.enemy.positCol) <= 1) && (Math.abs(Game.protagonist.positRow - Game.enemy.positRow) <= 1)) {
            report += "Your adreneline surges as you sense the closeness of your enemy.\n";
            signif = true;
        }
        if (!signif) {
            report += "There is nothing else to see here.\n";
        }
        System.out.println(report);
    }
  */
  //r eport on current location and stuff in sight
  return "This will report on current location and stuff in sight.";
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

function depletePlayerMagic(gameState) {
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
  return gameState;
}

function depleteBotMagic() {
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

function nearEachOther() {
  return (
    Math.abs(gameState.player.position[0] - gameState.bot.position[0]) <= 1 &&
    Math.abs(gameState.player.postion[1] - gameState.bot.postion[1]) <= 1
  );
}
