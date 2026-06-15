const onlinePlayers =
  require("../game/onlinePlayers");

const {
  createRoom,
  joinRoom,
} = require("../services/roomService");

const setupSockets = (io) => {
  io.on("connection", (socket) => {
    console.log(
      `User Connected: ${socket.id}`
    );

    onlinePlayers.set(
      socket.id,
      {
        socketId: socket.id,
      }
    );

    io.emit(
      "online-count",
      onlinePlayers.size
    );

    // Create Room Event
    socket.on(
      "create-room",
      () => {
        try {
          const room =
            createRoom(
              socket.id
            );

          // Join Socket.io room
          socket.join(
            room.roomCode
          );

          socket.emit(
            "room-created",
            room
          );

          console.log(
            `Room Created: ${room.roomCode}`
          );
        } catch (error) {
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

    // Join Room Event
    socket.on(
      "join-room",
      (roomCode) => {
        try {
          const room =
            joinRoom(
              roomCode,
              socket.id
            );

          // Join Socket.io room
          socket.join(
            roomCode
          );

          // Notify everyone in room
          io.to(
            roomCode
          ).emit(
            "room-updated",
            room
          );

          console.log(
            `${socket.id} joined ${roomCode}`
          );
        } catch (error) {
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

    socket.on(
      "disconnect",
      () => {
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
      }
    );
  });
};

module.exports =
  setupSockets;