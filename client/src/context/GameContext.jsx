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

  return (
    <GameContext.Provider
      value={{
        room,
        setRoom,

        role,
        setRole,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export default GameProvider;