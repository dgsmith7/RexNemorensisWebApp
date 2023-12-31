import * as blurbs from "./blurbs.js";

export async function loadWeaponsAndMagic(gameState) {
  console.log("---maps.loadWeaponsAndMagic---");
  return new Promise((resolve, reject) => {
    // map codes for item pass: A - axe, S - sword, D - shield, M - Map. 12345 - magical items
    for (let i = 0; i < 8; i++) {
      // add 7 items
      let col = parseInt(Math.random() * gameState.map[0].length);
      let row = parseInt(Math.random() * gameState.map.length);
      while (gameState.map[row].charAt(col) != "B") {
        //  find a bare spot on map - no hole, no wall, no items
        col = parseInt(Math.random() * gameState.map[0].length);
        row = parseInt(Math.random() * gameState.map.length);
      }
      if (i == 0) {
        // axe
        gameState.map[row] = replaceChar(col, gameState.map[row], "A");
      } else if (i == 1 || i == 2) {
        // 2 swords
        gameState.map[row] = replaceChar(col, gameState.map[row], "S");
      } else if (i == 3) {
        // 1 shield
        gameState.map[row] = replaceChar(col, gameState.map[row], "D");
      } else if (i == 4) {
        // 1 map
        gameState.map[row] = replaceChar(col, gameState.map[row], "M");
      } else {
        // 3 random magic items
        gameState.map[row] = replaceChar(
          col,
          gameState.map[row],
          Math.floor(Math.random() * 5 + 1)
        );
      }
    }
    console.log("weapons and magic items now on mesa");
    resolve({ gameState: gameState });
  });
}

export function replaceChar(index, str, char) {
  console.log("---maps.replaceChar---");
  let newStr = "";
  for (let i = 0; i < str.length; i++) {
    if (i == index) {
      newStr += char;
    } else {
      newStr += str.charAt(i);
    }
  }
  console.log("replaced with ", newStr);
  return newStr;
}

export async function displayMap(gameState) {
  console.log("---maps.displayMap---");
  // This will be the map if it is in inventory
  return new Promise((resolve, reject) => {
    let reply = "";
    reply += blurbs.getBlurb(blurbs.raggedMap) + "<br/><br/>";
    if (gameState.player.hasMap == true) {
      gameState.map.forEach((element) => {
        reply += `     ${element}<br/>`;
      });
      reply += "<br/>";
    } else {
      reply = blurbs.getBlurb(blurbs.playerNoHave) + "<br/>";
    }
    console.log("map displayed - ", reply);
    resolve(reply);
  });
}

export function notWall(col, row, maxCol, maxRow, gameState) {
  console.log("---maps.notWall---");
  console.log("replying");
  // check to make sure there is no wall at passed cords
  if (col < 0 || row < 0 || col > maxCol || row > maxRow) {
    // no wall, but ledge
    return true;
  } else {
    return gameState.map[row].charAt(col) != "W";
  }
}

export function getLocationBlurb(gameState) {
  console.log("---maps.getLocationBlurb---");
  return new Promise((resolve, reject) => {
    let reply = "";
    reply += `You are located in a grove on a mesa on row ${
      gameState.player.position[1] + 1
    } - column ${gameState.player.position[0] + 1}\n`;
    if (gameState.bot.invisibility == 0) {
      reply += `You spot your enemy on row ${
        gameState.bot.position[1] + 1
      } - column ${gameState.bot.position[0] + 1}\n`;
    } else {
      reply += `The enemy is invisible at the moment.  Sneaky!\n`;
    }
    let nChar = "L";
    let sChar = "L";
    let wChar = "L";
    let eChar = "L";
    let signif = false;
    // look in each direction for reportable info
    let col = gameState.player.position[0];
    let row = gameState.player.position[1];
    let colMax = gameState.map.length - 1;
    let rowMax = gameState.map[0].length - 1;
    if (col > 0) {
      wChar = gameState.map[row].charAt(col - 1);
    }
    if (col < colMax) {
      eChar = gameState.map[row].charAt(col + 1);
    }
    if (row > 0) {
      nChar = gameState.map[row - 1].charAt(col);
    }
    if (row < rowMax) {
      sChar = gameState.map[row + 1].charAt(col);
    }
    // holes
    if (nChar == "H" || sChar == "H" || wChar == "H" || eChar == "H") {
      reply += blurbs.getBlurb(blurbs.hole) + "<br/>";
    }
    // walls
    if (nChar == "W") reply += blurbs.getBlurb(blurbs.wallNorth) + "<br/>";
    if (sChar == "W") reply += blurbs.getBlurb(blurbs.wallSouth) + "<br/>";
    if (wChar == "W") reply += blurbs.getBlurb(blurbs.wallWest) + "<br/>";
    if (eChar == "W") reply += blurbs.getBlurb(blurbs.wallEast) + "<br/>";
    // edges
    if (row == 0) {
      reply += blurbs.getBlurb(blurbs.edgeNorth) + "<br/>";
    }
    if (row == rowMax) {
      reply += blurbs.getBlurb(blurbs.edgeSouth) + "<br/>";
    }
    if (col == 0) {
      reply += blurbs.getBlurb(blurbs.edgeWest) + "<br/>";
    }
    if (col == colMax) {
      reply += blurbs.getBlurb(blurbs.edgeEast) + "<br/>";
    }
    // magic items
    if (gameState.map[row].charAt(col) == "1") {
      reply += blurbs.getBlurb(blurbs.cloakInView) + "<br/>";
      signif = true;
    }
    if (gameState.map[row].charAt(col) == "2") {
      reply += blurbs.getBlurb(blurbs.gauntletInView) + "<br/>";
      signif = true;
    }
    if (gameState.map[row].charAt(col) == "3") {
      reply += blurbs.getBlurb(blurbs.tinctureInView) + "<br/>";
      signif = true;
    }
    if (gameState.map[row].charAt(col) == "4") {
      reply += blurbs.getBlurb(blurbs.ringInView) + "<br/>";
      signif = true;
    }
    if (gameState.map[row].charAt(col) == "5") {
      reply += blurbs.getBlurb(blurbs.crownInView) + "<br/>";
      signif = true;
    }
    // weapons
    if (gameState.map[row].charAt(col) == "A") {
      reply += blurbs.getBlurb(blurbs.axeInView) + "<br/>";
      signif = true;
    }
    if (gameState.map[row].charAt(col) == "S") {
      reply += blurbs.getBlurb(blurbs.swordInView) + "<br/>";
      signif = true;
    }
    if (gameState.map[row].charAt(col) == "D") {
      reply += blurbs.getBlurb(blurbs.shieldInView) + "<br/>";
      signif = true;
    }
    if (gameState.map[row].charAt(col) == "M") {
      reply += blurbs.getBlurb(blurbs.mapInView) + "<br/>";
      signif = true;
    }
    if (signif) reply += `Press 'g' to get this item.\n`;
    // enemy
    if (nearEachOther(gameState)) {
      reply += blurbs.getBlurb(blurbs.enemyNear) + "<br/>";
      signif = true;
    }
    if (!signif) {
      reply += blurbs.getBlurb(blurbs.nothingInView) + "<br/>";
    }
    console.log("generated location blurb - ", reply);
    resolve(reply);
  });
}

export function nearEachOther(gameState) {
  console.log("---maps.nearEachOther---");
  console.log("replying");
  return (
    Math.abs(gameState.player.position[0] - gameState.bot.position[0]) <= 1 &&
    Math.abs(gameState.player.position[1] - gameState.bot.position[1]) <= 1
  );
}

export let layouts = [
  [
    `BBBBBBBBBBBBB`,
    `BWWWWWWWWWWWB`,
    `BBBBBBBBBBBWB`,
    `BWWWWWWWWWBWB`,
    `BWBBBBBBBWBWB`,
    `BWBWWWWWBWBWB`,
    `BWBWBBHWBWBWB`,
    `BWBWBWWWBWBWB`,
    `BWBWBBBBBWBWB`,
    `BWBWWWWWWWBWB`,
    `BWBBBBBBBBBWB`,
    `BWWWWWWWWWWWB`,
    `BBBBBBBBBBBBB`,
  ],
  [
    `BBBBBBBBBBBBB`,
    `BWBBHBBBBWBBB`,
    `BWBBBBBBBWBBB`,
    `BWWWWWWBBWBHB`,
    `BWBBBBWBBWBBB`,
    `BBBHBBWWWWBBB`,
    `BBBBBBWBBBBBB`,
    `BWWWWWWBWWWBB`,
    `BBWBBBWBBBWBB`,
    `BBWBBBWBBBWBB`,
    `BBWBBBBBBBBBB`,
    `BBWWWWWHWWWBB`,
    `BBBBBBBBBBBBB`,
  ],
  [
    `BBBBBBBBBBBBB`,
    `BWBBBWWWWWWBB`,
    `BWBWBBBBWBBBB`,
    `BWBWBWBBWBBBB`,
    `BWBWBWBBWBBBB`,
    `BWBBBWBBWBBHB`,
    `BWBWBWBBBBBHB`,
    `BWBWHWBBWBBHB`,
    `BWBBBWBBWBBBB`,
    `BWBWBWHBWBBBB`,
    `BWBWBWBBWBBBB`,
    `BWBWBBBBWWWBB`,
    `BBBBBBBBBBBBB`,
  ],
  [
    `BBBBBBBBBBBBB`,
    `BBHBBBBBBBHBB`,
    `BBBBBBHBBBHBB`,
    `BBBBBBBBBBHBB`,
    `BBBBHBBBHBBBB`,
    `BBBBBBBBBBBBB`,
    `BBBHBBBBBHBBB`,
    `BBBBBBBHBBBBB`,
    `BBBBBBBBBBBBB`,
    `BBBBHBBBBBBHB`,
    `BBBBBBBHBBBBB`,
    `BHBBBHBBBBBBB`,
    `BBBBBBBBBBBBB`,
  ],
  [
    `BBBBBBBBBBBBB`,
    `BBWWWWWWWWWBB`,
    `BBBBWBBBBBBBB`,
    `BBHBWBBBBBBBB`,
    `BBBBWWWWWWBBB`,
    `BBBBWBBBBWBBB`,
    `BBBBWBBHBWBBB`,
    `BBBBBBBBBWBBB`,
    `BBWWWWWBBWBBB`,
    `BBBBWBBBBWBBB`,
    `BBBBWBBBBWBBB`,
    `BBWWWBBBBHBBB`,
    `BBBBBBBBBBBBB`,
  ],
  [
    `BBBBBBBBBBBBB`,
    `BBBHBBBHBBBWB`,
    `BBBBBBBBBBBWB`,
    `BBBWWWWWWBBWB`,
    `BBBWBBBBWBBWB`,
    `BBBWBBBBWBBBB`,
    `BBBBBBBBWBBBB`,
    `BBBWBBBBWBBBB`,
    `BBBWHBBBWBBWB`,
    `BBBWWWWWWHBWB`,
    `BBBBBBBBBBBWB`,
    `BWWWWWWWWWWWB`,
    `BBBBBBBBBBBBB`,
  ],
  [
    `BBBBBBBBBBBBB`,
    `BWWWWWWWWWWBB`,
    `BBBBBBBBBBWBB`,
    `BWWWWWWWBBWBB`,
    `BBBBBBBWBBWBB`,
    `BBBHBBBWBBWBB`,
    `BWWWWWBWBBWWB`,
    `BWBBBBBWHBBWB`,
    `BWBBWBBWWWBWB`,
    `BWBBWBBBBWBWB`,
    `BBBBWBBBBBBWB`,
    `BHWWWWWWWWBWB`,
    `BBBBBBBBBBBBB`,
  ],
  [
    `BBBBBBBBBBBBB`,
    `BWWWWBBBBBBBB`,
    `BBBWBBBBBBBBB`,
    `BHBWBBBBBHBBB`,
    `BBBWBBBBBBBBB`,
    `BBBWWWWWWBBBB`,
    `BBBWBBBWBBBBB`,
    `BBBWBBBWBBBBB`,
    `BBBBBBBWBBBBB`,
    `BWWWWWBWBBBBB`,
    `BBBHBBBWBBBBB`,
    `BBBBBBBBBBBBB`,
    `BBBBBBBBBBBBB`,
  ],
  [
    `BBBBBBBBBBBBB`,
    `BWWWWWBWWWWWB`,
    `BWBBBBBBBBBWB`,
    `BWWWWWWWWBWWB`,
    `BWBBBBBBBBBWB`,
    `BWWWWWBBBBBWB`,
    `BBBBBWBHBWWWB`,
    `BBBWBBBBBBBBB`,
    `BBBWBWWWWBBBB`,
    `BBBWBBBWBBHBB`,
    `BBBWBBBWBBBBB`,
    `BBBHBBBWWWWBB`,
    `BBBBBBBBBBBBB`,
  ],
  [
    `BBBBBBBBBBBBB`,
    `BWWBWWWWWWWWB`,
    `BWBBBBBBBBWWB`,
    `BWBWWWWWWBWWB`,
    `BWBWBBBBWBWWB`,
    `BWBWBHBBWBWWB`,
    `BWBWBWBBWBWWB`,
    `BWBWBWHBBBWWB`,
    `BWBWBBBBWBWWB`,
    `BWBWWWWWWBWWB`,
    `BWBBHBBBBBWWB`,
    `BWWWWWWBWWWWB`,
    `BBBBBBBBBBBBB`,
  ],
];

export let testMap = [
  [
    `1ASDMBBBBBBBB`,
    `2WBWHWWBWWWWB`,
    `3WWBBBBBBBBBB`,
    `4BBBBBBBBBBBB`,
    `5WBBBBBBBBBWB`,
    `BWWWWWBBBBBWB`,
    `BBBBBWBBBBWWB`,
    `BBBWBBBBBBBBB`,
    `BBBWBWWWWBBBB`,
    `BBBWBBBWBBBBB`,
    `BBBWBBBBBBBBB`,
    `BBBBBBBWWBWBB`,
    `BBBBBBBBBBBBB`,
  ],
];
