import PlayerCard from "./PlayerCard";

function PlayerList({
  players = [],
}) {
  if (players.length === 0) {
    return (
      <div>
        No Players Found
      </div>
    );
  }

  return (
    <div>
      <h2
        className="
        text-xl
        font-bold
        mb-4
        "
      >
        Players
      </h2>

      {players.map(
        (player) => (
          <PlayerCard
            key={player.socketId}
            player={player}
          />
        )
      )}
    </div>
  );
}

export default PlayerList;