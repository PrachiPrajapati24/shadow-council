const activeRooms =
  require("../game/activeRooms");

const generateRoomCode =
  require("../utils/generateRoomCode");

const createRoom = (
  hostSocketId
) => {
  let roomCode;

  do {
    roomCode =
      generateRoomCode();
  } while (
    activeRooms.has(roomCode)
  );

  const room = {
    roomCode,

    hostId: hostSocketId,

    players: [
      {
        socketId: hostSocketId,
        isHost: true,
      },
    ],

    gameStatus: "waiting",

    createdAt: Date.now(),
  };

  activeRooms.set(
    roomCode,
    room
  );

  return room;
};

const joinRoom = (
  roomCode,
  socketId
) => {
  const room =
    activeRooms.get(roomCode);

  if (!room) {
    throw new Error(
      "Room not found"
    );
  }

  if (
    room.gameStatus !==
    "waiting"
  ) {
    throw new Error(
      "Game already started"
    );
  }

  const existingPlayer =
    room.players.find(
      (player) =>
        player.socketId ===
        socketId
    );

  if (existingPlayer) {
    throw new Error(
      "Player already in room"
    );
  }

  if (
    room.players.length >= 12
  ) {
    throw new Error(
      "Room is full"
    );
  }

  room.players.push({
    socketId,
    isHost: false,
  });

  return room;
};

module.exports = {
  createRoom,
  joinRoom,
};