const activeRooms = require("../game/activeRooms");
const generateRoomCode = require("../utils/generateRoomCode");

const { assignRoles } = require("../game/roleAssignment");

// ======================
// CREATE ROOM
// ======================
const createRoom = (hostSocketId) => {
  let roomCode;

  do {
    roomCode = generateRoomCode();
  } while (activeRooms.has(roomCode));

  const room = {
    roomCode,
    hostId: hostSocketId,

    players: [
      {
        socketId: hostSocketId,
        isHost: true,
        isReady: false,
      },
    ],

    gameStatus: "waiting",
    createdAt: Date.now(),
  };

  activeRooms.set(roomCode, room);

  return room;
};

// ======================
// JOIN ROOM
// ======================
const joinRoom = (roomCode, socketId) => {
  const room = activeRooms.get(roomCode);

  if (!room) {
    throw new Error("Room not found");
  }

  if (room.gameStatus !== "waiting") {
    throw new Error("Game already started");
  }

  const existingPlayer = room.players.find(
    (player) => player.socketId === socketId
  );

  if (existingPlayer) {
    throw new Error("Player already in room");
  }

  if (room.players.length >= 12) {
    throw new Error("Room is full");
  }

  room.players.push({
    socketId,
    isHost: false,
    isReady: false,
  });

  return room;
};

// ======================
// TOGGLE READY
// ======================
const toggleReady = (roomCode, socketId) => {
  const room = activeRooms.get(roomCode);

  if (!room) {
    throw new Error("Room not found");
  }

  const player = room.players.find(
    (p) => p.socketId === socketId
  );

  if (!player) {
    throw new Error("Player not found");
  }

  player.isReady = !player.isReady;

  return room;
};

// ======================
// VALIDATION
// ======================
const canStartGame = (roomCode, socketId) => {
  const room = activeRooms.get(roomCode);

  if (!room) {
    throw new Error("Room not found");
  }

  if (room.hostId !== socketId) {
    throw new Error("Only host can start the game");
  }

  if (room.players.length < 5) {
    throw new Error("Minimum 5 players required");
  }

  const allReady = room.players.every(
    (player) => player.isReady
  );

  if (!allReady) {
    throw new Error("All players must be ready");
  }

  return true;
};

// ======================
// START GAME (NEW)
// ======================
const startGame = (roomCode, socketId) => {
  canStartGame(roomCode, socketId);

  const room = activeRooms.get(roomCode);

  room.players = assignRoles(room.players);

  room.gameStatus = "in-progress";

  return room;
};

// ======================
// EXPORTS
// ======================
module.exports = {
  createRoom,
  joinRoom,
  toggleReady,
  canStartGame,
  startGame,
};