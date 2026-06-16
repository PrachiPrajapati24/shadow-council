import {
  useContext,
  useState,
  useEffect,
} from "react";

import { SocketContext } from "../../context/SocketContext";

function Lobby() {
  const { socket, onlineCount } = useContext(SocketContext);

  const [room, setRoom] = useState(null);
  const [joinCode, setJoinCode] = useState("");
  const [role, setRole] = useState(null);

  const createRoom = () => {
    socket.emit("create-room");
  };

  const joinRoom = () => {
    if (!joinCode.trim()) return;
    socket.emit("join-room", joinCode);
  };

  const toggleReady = () => {
    if (!room) return;
    socket.emit("toggle-ready", room.roomCode);
  };

  const startGame = () => {
    if (!room) return;
    socket.emit("start-game", room.roomCode);
  };

  useEffect(() => {
    const handleRoomCreated = (room) => {
      console.log("Room Created:", room);
      setRoom(room);
    };

    const handleRoomUpdated = (room) => {
      console.log("Room Updated:", room);
      setRoom(room);
    };

    const handleRoomError = (error) => {
      alert(error.message);
    };

    const handleRoleAssigned = (data) => {
      setRole(data.role);
    };

    socket.on("room-created", handleRoomCreated);
    socket.on("room-updated", handleRoomUpdated);
    socket.on("room-error", handleRoomError);
    socket.on("role-assigned", handleRoleAssigned);

    return () => {
      socket.off("room-created", handleRoomCreated);
      socket.off("room-updated", handleRoomUpdated);
      socket.off("room-error", handleRoomError);
      socket.off("role-assigned", handleRoleAssigned);
    };
  }, [socket]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">

      <h1 className="text-3xl font-bold">
        Online Players: {onlineCount}
      </h1>

      <button
        onClick={createRoom}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Create Room
      </button>

      <input
        type="text"
        placeholder="Enter Room Code"
        value={joinCode}
        onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
        className="border p-2 rounded w-60 text-center uppercase"
      />

      <button
        onClick={joinRoom}
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        Join Room
      </button>

      {role && (
        <div className="text-xl font-bold text-purple-600">
          Your Role: {role}
        </div>
      )}

      {room && (
        <div className="mt-6 border rounded p-4 w-96">

          <h2 className="text-xl font-bold mb-2">
            Room Code: {room.roomCode}
          </h2>

          <h3 className="mb-4">
            Players: {room.players.length}/12
          </h3>

          <div className="flex flex-col gap-2">
            {room.players.map((player) => (
              <div
                key={player.socketId}
                className="border p-2 rounded"
              >
                {player.socketId}

                {player.isHost && " 👑 Host"}

                {" "}

                {player.isReady
                  ? "✅ Ready"
                  : "⏳ Not Ready"}
              </div>
            ))}
          </div>

          {/* Toggle Ready */}
          <button
            onClick={toggleReady}
            className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded w-full"
          >
            Toggle Ready
          </button>

          {/* Start Game (TEST ONLY) */}
          <button
            onClick={startGame}
            className="mt-3 px-4 py-2 bg-red-500 text-white rounded w-full"
          >
            Start Game
          </button>

        </div>
      )}
    </div>
  );
}

export default Lobby;