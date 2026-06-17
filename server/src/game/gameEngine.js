const GAME_PHASES = require("./phases");

const PHASE_TIMERS =
  require("./timers");

// ======================
// GET NEXT PHASE
// ======================
const getNextPhase = (
  currentPhase
) => {
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
const advancePhase = (
  room
) => {
  room.phase =
    getNextPhase(
      room.phase
    );

  return room;
};

// ======================
// GET PHASE DURATION
// ======================
const getPhaseDuration =
  (phase) => {
    switch (phase) {
      case GAME_PHASES.NIGHT:
        return (
          PHASE_TIMERS.NIGHT
        );

      case GAME_PHASES.DAY:
        return (
          PHASE_TIMERS.DAY
        );

      case GAME_PHASES.VOTING:
        return (
          PHASE_TIMERS.VOTING
        );

      default:
        return 0;
    }
  };

// ======================
// EXPORTS
// ======================
module.exports = {
  advancePhase,
  getPhaseDuration,
};