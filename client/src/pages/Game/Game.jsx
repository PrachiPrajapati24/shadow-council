import {
  useContext,
  useEffect,
} from "react";

import {
  useParams,
} from "react-router-dom";

import {
  GameContext,
} from "../../context/GameContext";

import {
  SocketContext,
} from "../../context/SocketContext";

import GameHeader from "../../components/game/GameHeader";
import StatusBanner from "../../components/game/StatusBanner";
import PlayerList from "../../components/game/PlayerList";
import GameArea from "../../components/game/GameArea";
import ActionPanel from "../../components/game/ActionPanel";
import ChatPanel from "../../components/game/ChatPanel";

function Game() {
  const { roomCode } =
    useParams();

  const { socket } =
    useContext(
      SocketContext
    );

  const {
    room,
    setRoom,
  } = useContext(
    GameContext
  );

  useEffect(() => {
    socket.emit(
      "get-room",
      roomCode
    );

    const handleRoomLoaded =
      (roomData) => {
        console.log(
          "ROOM LOADED",
          roomData.phase
        );

        setRoom(roomData);
      };

    const handleRoomUpdated =
      (updatedRoom) => {
        console.log(
          "ROOM UPDATED:",
          updatedRoom.phase
        );

        setRoom(updatedRoom);
      };

    socket.on(
      "room-loaded",
      handleRoomLoaded
    );

    socket.on(
      "room-updated",
      handleRoomUpdated
    );

    return () => {
      socket.off(
        "room-loaded",
        handleRoomLoaded
      );

      socket.off(
        "room-updated",
        handleRoomUpdated
      );
    };
  }, [
    socket,
    roomCode,
    setRoom,
  ]);

  if (!room) {
    return (
      <div
        className="
        min-h-screen
        flex
        items-center
        justify-center
        text-white
        bg-slate-900
        "
      >
        Loading Room...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">

      <GameHeader />

      <StatusBanner />

      <div className="flex-1 grid grid-cols-4 gap-4 p-4">

        <div className="col-span-1 bg-slate-800 rounded-lg p-4 overflow-y-auto">
          <PlayerList
            players={
              room.players
            }
          />
        </div>

        <div className="col-span-3 bg-slate-800 rounded-lg p-4">
          <GameArea />
        </div>

      </div>

      <div className="bg-slate-800 border-t border-slate-700">
        <ActionPanel />
      </div>

      <div className="bg-slate-950 border-t border-slate-700">
        <ChatPanel />
      </div>

    </div>
  );
}

export default Game;