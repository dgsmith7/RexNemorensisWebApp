export function loadWeaponsAndMagic(gameState) {
  // map codes for item pass: A - axe, S - sword, D - shield, 12345 - magical items
  for (let i = 0; i < 6; i++) {
    // add 6 items
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
    } else if (i <= 2) {
      // 2 swords
      gameState.map[row] = replaceChar(col, gameState.map[row], "S");
    } else if (i == 3) {
      // shield
      gameState.map[row] = replaceChar(col, gameState.map[row], "D");
    } else {
      // 2 random magic items
      gameState.map[row] = replaceChar(
        col,
        gameState.map[row],
        Math.floor(Math.random() * 5 + 1)
      );
    }
  }
  console.log("Dropped weapons and magic onto mesa.");
  return gameState;
}

function replaceChar(index, str, char) {
  let newStr = "";
  for (let i = 0; i < str.length; i++) {
    if (i == index) {
      newStr += char;
    } else {
      newStr += str.charAt(i);
    }
  }
  console.log("new - ", newStr);
  return newStr;
}

export function displayMap(gameState) {
  // This will be the map if it is in inventory
  let reply = "";
  if (gameState.player.hasMap == true) {
    gameState.map.forEach((element) => {
      reply += `     ${element}<br/>`;
    });
    reply += "<br/>";
  } else {
    reply = getBlurb(blurbs.playerNoHave) + "<br/>";
  }
  return reply;
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
