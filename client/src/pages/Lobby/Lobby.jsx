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

  const [room,
    setRoom] =
    useState(null);

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

        setRoom(room);
      };

    const handleRoomUpdated =
      (room) => {
        console.log(
          "Room Updated:",
          room
        );

        setRoom(room);
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

      {room && (
        <div
          className="
          mt-6
          border
          rounded
          p-4
          w-96
          "
        >
          <h2
            className="
            text-xl
            font-bold
            mb-2
            "
          >
            Room Code:{" "}
            {room.roomCode}
          </h2>

          <h3
            className="
            mb-4
            "
          >
            Players:{" "}
            {room.players.length}
            /12
          </h3>

          <div
            className="
            flex
            flex-col
            gap-2
            "
          >
            {room.players.map(
              (player) => (
                <div
                  key={
                    player.socketId
                  }
                  className="
                  border
                  p-2
                  rounded
                  "
                >
                  {
                    player.socketId
                  }

                  {player.isHost &&
                    " 👑 Host"}
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Lobby;