import GameHeader from "../../components/game/GameHeader";
import StatusBanner from "../../components/game/StatusBanner";
import PlayerList from "../../components/game/PlayerList";
import GameArea from "../../components/game/GameArea";
import ActionPanel from "../../components/game/ActionPanel";
import ChatPanel from "../../components/game/ChatPanel";

function Game() {
  const mockPlayers = [
    {
      socketId: "Host123",
      isHost: true,
      isReady: true,
    },
    {
      socketId: "Player456",
      isHost: false,
      isReady: false,
    },
    {
      socketId: "Player789",
      isHost: false,
      isReady: true,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">

      {/* HEADER */}
      <GameHeader />

      {/* STATUS */}
      <StatusBanner />

      {/* MAIN GAME AREA */}
      <div className="flex-1 grid grid-cols-4 gap-4 p-4">

        {/* PLAYER LIST */}
        <div className="col-span-1 bg-slate-800 rounded-lg p-4 overflow-y-auto">
          <PlayerList players={mockPlayers} />
        </div>

        {/* GAME AREA */}
        <div className="col-span-3 bg-slate-800 rounded-lg p-4">
          <GameArea />
        </div>

      </div>

      {/* ACTION PANEL */}
      <div className="bg-slate-800 border-t border-slate-700">
        <ActionPanel />
      </div>

      {/* CHAT PANEL */}
      <div className="bg-slate-950 border-t border-slate-700">
        <ChatPanel />
      </div>

    </div>
  );
}

export default Game;