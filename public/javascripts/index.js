document.querySelector("body").addEventListener("click", () => {
  document.querySelector("#entry-box").focus();
});

document.querySelector("#entry-box").addEventListener("keydown", (event) => {
  let obj = { reply: "", move: document.querySelector("#entry-box").value };
  if (event.key === "Enter") {
    document.getElementById("entry-box").value = "";

    console.log("You pressed enter");
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
        node1.innerHTML = `${response.move}`;
        document.querySelector("#exchange-area").appendChild(node1);
        let node2 = document.createElement("div");
        node2.innerHTML = `${response.reply}`;
        console.log("node 2 - ", node2);
        document.querySelector("#exchange-area").appendChild(node2);
        window.scrollTo(0, document.body.scrollHeight);
        document.querySelector("#entry-box").focus();
      });
  }
});
