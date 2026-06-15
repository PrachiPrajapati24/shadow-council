import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Lobby from "../pages/Lobby/Lobby";
import Room from "../pages/Room/Room";
import Game from "../pages/Game/Game";
import Profile from "../pages/Profile/Profile";
import Leaderboard from "../pages/Leaderboard/Leaderboard";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route
          path="/leaderboard"
          element={<Leaderboard />}
        />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route
          path="/register"
          element={<Register />}
        />
      </Route>

      <Route path="/lobby" element={<Lobby />} />

      <Route
        path="/room/:roomCode"
        element={<Room />}
      />

      <Route
        path="/game/:roomCode"
        element={<Game />}
      />

      <Route
        path="/profile"
        element={<Profile />}
      />
    </Routes>
  );
}

export default AppRoutes;