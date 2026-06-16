const GAME_PHASES = require("./phases");

// ======================
// GET NEXT PHASE
// ======================
const getNextPhase = (currentPhase) => {
  switch (currentPhase) {
    case GAME_PHASES.NIGHT:
      return GAME_PHASES.DAY;

    case GAME_PHASES.DAY:
      return GAME_PHASES.VOTING;

    case GAME_PHASES.VOTING:
      return GAME_PHASES.NIGHT;

    default:
      return currentPhase;
  }
};

// ======================
// ADVANCE PHASE
// ======================
const advancePhase = (room) => {
  room.phase = getNextPhase(room.phase);

  return room;
};

// ======================
// EXPORTS
// ======================
module.exports = {
  advancePhase,
};
