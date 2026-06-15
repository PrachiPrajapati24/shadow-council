import {
  useState,
  useEffect,
} from "react";

import { SocketContext } from "./SocketContext";
import { socket } from "../services/socket";

function SocketProvider({ children }) {
  const [onlineCount,
    setOnlineCount] =
    useState(0);

  useEffect(() => {
    socket.connect();

    const handleConnect = () => {
      console.log(
        "Connected:",
        socket.id
      );
    };

    const handleDisconnect = () => {
      console.log("Disconnected");
    };

    const handleOnlineCount = (
      count
    ) => {
      setOnlineCount(count);
    };

    socket.on(
      "connect",
      handleConnect
    );

    socket.on(
      "disconnect",
      handleDisconnect
    );

    socket.on(
      "online-count",
      handleOnlineCount
    );

    return () => {
      socket.off(
        "connect",
        handleConnect
      );

      socket.off(
        "disconnect",
        handleDisconnect
      );

      socket.off(
        "online-count",
        handleOnlineCount
      );

      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket,
        onlineCount,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;