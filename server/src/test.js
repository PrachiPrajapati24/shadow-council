const GAME_PHASES = require("./src/game/phases");
const { advancePhase } = require("./src/game/gameEngine");

const room = {
  phase: GAME_PHASES.NIGHT,
};

console.log("Before:", room.phase);

advancePhase(room);

console.log("After:", room.phase);