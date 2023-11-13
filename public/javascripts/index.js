"use strict";
(() => {
  let init = true;
  let gameState = {};
  startGame();
  function startGame() {
    window.scrollTo(0, document.body.scrollHeight);

    document.querySelector("body").addEventListener("click", () => {
      document.querySelector("#entry-box").focus();
    });

    document
      .querySelector("#entry-box")
      .addEventListener("keydown", (event) => {
        let obj = {
          reply: "",
          move: document.querySelector("#entry-box").value,
          gameState: gameState,
        };
        if (event.key == "Escape") {
          console.log("pull up main menu screen");
        }
        if (event.key === "Enter") {
          manageViewLength();
          document.getElementById("entry-box").value = "";
          if (init) {
            obj.move = "start";
            init = false;
          }
          fetch("/entry", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(obj),
          })
            .then((r) => r.json())
            .then((response) => {
              gameState = response.gameState;
              let append = "";
              if (gameState.gameOver == true) {
                init = true;
                append = `
Press ENTER for a new game.`;
              }
              let node1 = document.createElement("div");
              node1.innerHTML = `> ${response.move}`;
              document.querySelector("#exchange-area").appendChild(node1);
              let node2 = document.createElement("div");
              node2.className = "response-area";
              node2.innerHTML = `${response.reply}${append}`;
              document.querySelector("#exchange-area").appendChild(node2);
              window.scrollTo(0, document.body.scrollHeight);
              document.querySelector("#entry-box").focus();
              if (gameState.gameOver == true) {
                init = true;
                console.log(gameState.mode);
              }
            });
        }
      });
  }

  function manageViewLength() {
    let elem = document.querySelector("#exchange-area");
    let children = elem.children;
    if (elem.children.length >= 250) {
      for (let i = 0; i < 4; i++) {
        document.querySelector("#exchange-area").removeChild(children[i]);
      }
    }
  }
})();
