import { Outlet } from "react-router-dom";

function GameLayout() {
  return (
    <div className="min-h-screen">
      <Outlet />
    </div>
  );
}

export default GameLayout;