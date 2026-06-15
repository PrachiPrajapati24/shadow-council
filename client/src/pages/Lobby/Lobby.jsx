import {
  useContext,
  useState,
  useEffect,
} from "react";

import {
  SocketContext,
} from "../../context/SocketContext";

function Lobby() {
  const {
    socket,
    onlineCount,
  } = useContext(
    SocketContext
  );

  const [roomCode,
    setRoomCode] =
    useState("");

  const [joinCode,
    setJoinCode] =
    useState("");

  const createRoom =
    () => {
      socket.emit(
        "create-room"
      );
    };

  const joinRoom =
    () => {
      if (!joinCode.trim())
        return;

      socket.emit(
        "join-room",
        joinCode
      );
    };

  useEffect(() => {
    const handleRoomCreated =
      (room) => {
        console.log(
          "Room Created:",
          room
        );

        setRoomCode(
          room.roomCode
        );
      };

    const handleRoomUpdated =
      (room) => {
        console.log(
          "Room Updated:",
          room
        );

        setRoomCode(
          room.roomCode
        );
      };

    const handleRoomError =
      (error) => {
        alert(
          error.message
        );
      };

    socket.on(
      "room-created",
      handleRoomCreated
    );

    socket.on(
      "room-updated",
      handleRoomUpdated
    );

    socket.on(
      "room-error",
      handleRoomError
    );

    return () => {
      socket.off(
        "room-created",
        handleRoomCreated
      );

      socket.off(
        "room-updated",
        handleRoomUpdated
      );

      socket.off(
        "room-error",
        handleRoomError
      );
    };
  }, [socket]);

  return (
    <div
      className="
      min-h-screen
      flex
      flex-col
      items-center
      justify-center
      gap-4
      "
    >
      <h1
        className="
        text-3xl
        font-bold
        "
      >
        Online Players:{" "}
        {onlineCount}
      </h1>

      <button
        onClick={
          createRoom
        }
        className="
        px-4
        py-2
        bg-blue-500
        text-white
        rounded
        "
      >
        Create Room
      </button>

      <input
        type="text"
        placeholder="Enter Room Code"
        value={joinCode}
        onChange={(e) =>
          setJoinCode(
            e.target.value.toUpperCase()
          )
        }
        className="
        border
        p-2
        rounded
        w-60
        text-center
        uppercase
        "
      />

      <button
        onClick={
          joinRoom
        }
        className="
        px-4
        py-2
        bg-green-500
        text-white
        rounded
        "
      >
        Join Room
      </button>

      {roomCode && (
        <div
          className="
          text-lg
          font-semibold
          "
        >
          Room:{" "}
          {roomCode}
        </div>
      )}
    </div>
  );
}

export default Lobby;