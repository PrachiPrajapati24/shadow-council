import {
  createContext,
  useState,
} from "react";

export const GameContext =
  createContext();

function GameProvider({
  children,
}) {
  const [room, setRoom] =
    useState(null);

  const [role, setRole] =
    useState(null);

  // NEW
  const [
    timeRemaining,
    setTimeRemaining,
  ] = useState(0);

  return (
    <GameContext.Provider
      value={{
        room,
        setRoom,

        role,
        setRole,

        timeRemaining,
        setTimeRemaining,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export default GameProvider;