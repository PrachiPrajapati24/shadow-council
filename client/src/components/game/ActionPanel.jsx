import {
  useContext,
} from "react";

import {
  SocketContext,
} from "../../context/SocketContext";

import {
  GameContext,
} from "../../context/GameContext";

function ActionPanel() {
  const { socket } =
    useContext(
      SocketContext
    );

  const { room } =
    useContext(
      GameContext
    );

  const handleNextPhase =
    () => {
      console.log(
        "BUTTON CLICKED"
      );

      if (!room) {
        console.log(
          "NO ROOM FOUND"
        );
        return;
      }

      console.log(
        "EMITTING NEXT PHASE:",
        room.roomCode
      );

      socket.emit(
        "next-phase",
        room.roomCode
      );
    };

  return (
    <div
      className="
      bg-slate-800
      p-4
      m-4
      rounded-lg
      "
    >
      <button
        onClick={
          handleNextPhase
        }
        className="
        px-4
        py-2
        bg-green-600
        rounded
        hover:bg-green-700
        transition
        "
      >
        Next Phase
      </button>
    </div>
  );
}

export default ActionPanel;