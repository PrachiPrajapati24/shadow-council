import PlayerCard from "./PlayerCard";

function PlayerList({
  players = [],
}) {
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
            key={
              player.socketId
            }
            player={player}
          />
        )
      )}
    </div>
  );
}

export default PlayerList;