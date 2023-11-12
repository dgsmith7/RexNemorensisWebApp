"use strict";
(() => {
  let init = true;
  let gameState = {};
  startGame();
  function startGame() {
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
              let node1 = document.createElement("div");
              node1.innerHTML = `> ${response.move}`;
              document.querySelector("#exchange-area").appendChild(node1);
              let node2 = document.createElement("div");
              node2.innerHTML = `${response.reply}`;
              document.querySelector("#exchange-area").appendChild(node2);
              window.scrollTo(0, document.body.scrollHeight);
              document.querySelector("#entry-box").focus();
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
