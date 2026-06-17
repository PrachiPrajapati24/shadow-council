import {
  useContext,
} from "react";

import {
  GameContext,
} from "../../context/GameContext";

function StatusBanner() {
  const { room } =
    useContext(
      GameContext
    );

  return (
    <div
      className="
      bg-indigo-600
      text-center
      py-3
      font-semibold
      "
    >
      Current Phase:
      {" "}
      {room?.phase ||
        "Loading"}
    </div>
  );
}

export default StatusBanner;