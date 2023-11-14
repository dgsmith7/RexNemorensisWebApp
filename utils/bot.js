export function generateBotMove(gameState) {
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

export function depleteBotMagic(gameState) {
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

export function processBotMagic() {
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
        if (isPlayer) {
          reply += blurbs.getBlurb(blurbs.playerUsingCloak);
        } else {
          reply += blurbs.getBlurb(blurbs.botUsingCloak);
        }
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
        if (isPlayer) {
          reply += blurbs.getBlurb(blurbs.playerUsingGaunlet);
        } else {
          reply += blurbs.getBlurb(blurbs.botUsingGaunlet);
        }
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
        if (isPlayer) {
          reply += blurbs.getBlurb(blurbs.playerUsingTincture);
        } else {
          reply += blurbs.getBlurb(blurbs.botUsingTincture);
        }
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
        if (isPlayer) {
          reply += blurbs.getBlurb(blurbs.playerUsingRing);
        } else {
          reply += blurbs.getBlurb(blurbs.botUsingRing);
        }
      } else {
        reply += blurbs.getBlurb(blurbs.playerNoHave);
      }
      break;
    case 5:
      if (gameState.player.speed == 0 && gameState.player.magicItems[4] != "") {
        gameState.player.magicItems[4] = "";
        gameState.player.speed = 4;
        gameState.player.speedTurnsRemain = true;
        if (isPlayer) {
          reply += blurbs.getBlurb(blurbs.playerUsingCrown);
        } else {
          reply += blurbs.getBlurb(blurbs.botUsingCrown);
        }
      } else {
        reply += blurbs.getBlurb(blurbs.playerNoHave);
      }
      break;
  }
  return { message: reply, gameState: gameState };
  //  return "Processing magic item " + which + ".";
}
