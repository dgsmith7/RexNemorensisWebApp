export function processMove(move) {
  let reply = "";
  if (move == "start") {
    reply = "Game is reset.  This will print all of the instructions.";
  } else {
    reply = "This is the reply.";
  }
  return reply;
}

export function initialize() {
  console.log("Initialized.");
}
