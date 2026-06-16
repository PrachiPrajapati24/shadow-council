function PlayerCard({
  player,
}) {
  return (
    <div
      className="
      bg-slate-700
      border
      border-slate-600
      rounded-lg
      p-3
      mb-3
      "
    >
      <div
        className="
        font-semibold
        flex
        justify-between
        "
      >
        <span>
          {player.isHost
            ? "👑 Host"
            : "Player"}
        </span>

        <span>
          {player.isReady
            ? "✅"
            : "⏳"}
        </span>
      </div>

      <div
        className="
        text-sm
        text-slate-300
        break-all
        mt-2
        "
      >
        {player.socketId}
      </div>

      <div
        className="
        mt-2
        text-sm
        "
      >
        {player.isReady
          ? "Ready"
          : "Not Ready"}
      </div>
    </div>
  );
}

export default PlayerCard;