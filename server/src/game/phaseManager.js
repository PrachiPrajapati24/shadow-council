const activeTimers =
  new Map();

const setRoomTimer = (
  roomCode,
  timerId
) => {
  activeTimers.set(
    roomCode,
    timerId
  );
};

const clearRoomTimer = (
  roomCode
) => {
  const timer =
    activeTimers.get(
      roomCode
    );

  if (timer) {
    clearTimeout(timer);

    activeTimers.delete(
      roomCode
    );
  }
};

module.exports = {
  activeTimers,
  setRoomTimer,
  clearRoomTimer,
};