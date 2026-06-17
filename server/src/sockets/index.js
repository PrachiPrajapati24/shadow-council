const onlinePlayers = require("../game/onlinePlayers");

const {
  createRoom,
  joinRoom,
  toggleReady,
  startGame,
  startPhaseLoop,
  getRoom,
  nextPhase,
} = require("../services/roomService");

const setupSockets = (io) => {
  io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    onlinePlayers.set(socket.id, {
      socketId: socket.id,
    });

    io.emit("online-count", onlinePlayers.size);

    // ============================
    // CREATE ROOM
    // ============================
    socket.on("create-room", () => {
      try {
        const room = createRoom(socket.id);

        socket.join(room.roomCode);

        socket.emit("room-created", room);

        console.log(`Room Created: ${room.roomCode}`);
      } catch (error) {
        socket.emit("room-error", {
          message: error.message,
        });
      }
    });

    // ============================
    // JOIN ROOM
    // ============================
    socket.on("join-room", (roomCode) => {
      try {
        const room = joinRoom(roomCode, socket.id);

        socket.join(roomCode);

        io.to(roomCode).emit(
          "room-updated",
          room
        );

        console.log(
          `${socket.id} joined ${roomCode}`
        );
      } catch (error) {
        socket.emit("room-error", {
          message: error.message,
        });
      }
    });

    // ============================
    // GET ROOM
    // ============================
    socket.on("get-room", (roomCode) => {
      try {
        const room = getRoom(roomCode);

        socket.emit(
          "room-loaded",
          room
        );
      } catch (error) {
        socket.emit("room-error", {
          message: error.message,
        });
      }
    });

    // ============================
    // TOGGLE READY
    // ============================
    socket.on("toggle-ready", (roomCode) => {
      try {
        const room = toggleReady(
          roomCode,
          socket.id
        );

        io.to(roomCode).emit(
          "room-updated",
          room
        );

        console.log(
          `${socket.id} toggled ready in ${roomCode}`
        );
      } catch (error) {
        socket.emit("room-error", {
          message: error.message,
        });
      }
    });

    // ============================
    // START GAME
    // ============================
    socket.on("start-game", (roomCode) => {
      try {
        const room = startGame(
          roomCode,
          socket.id
        );

        // START AUTO PHASE LOOP
        startPhaseLoop(
          room,
          io
        );

        // Send private role to each player
        room.players.forEach((player) => {
          io.to(player.socketId).emit(
            "role-assigned",
            {
              role: player.role,
            }
          );
        });

        // Notify everyone game started
        io.to(roomCode).emit(
          "game-started",
          {
            roomCode: room.roomCode,
            gameStatus:
              room.gameStatus,
          }
        );

        // Sync room data
        io.to(roomCode).emit(
          "room-updated",
          room
        );

        console.log(
          `Game Started: ${roomCode}`
        );
      } catch (error) {
        socket.emit("room-error", {
          message: error.message,
        });
      }
    });

    // ============================
    // NEXT PHASE (DEBUG)
    // ============================
    socket.on(
      "next-phase",
      (roomCode) => {
        console.log(
          "NEXT PHASE RECEIVED:",
          roomCode
        );

        console.log(
          "SOCKET ID:",
          socket.id
        );

        try {
          const room =
            nextPhase(
              roomCode,
              socket.id
            );

          console.log(
            "NEW PHASE:",
            room.phase
          );

          io.to(roomCode).emit(
            "room-updated",
            room
          );

          console.log(
            `Phase Changed: ${roomCode} -> ${room.phase}`
          );
        } catch (error) {
          console.log(
            "NEXT PHASE ERROR:",
            error.message
          );

          socket.emit(
            "room-error",
            {
              message:
                error.message,
            }
          );
        }
      }
    );

    // ============================
    // DISCONNECT
    // ============================
    socket.on("disconnect", () => {
      console.log(
        `User Disconnected: ${socket.id}`
      );

      onlinePlayers.delete(
        socket.id
      );

      io.emit(
        "online-count",
        onlinePlayers.size
      );
    });
  });
};

module.exports = setupSockets;