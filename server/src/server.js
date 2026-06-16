const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const setupSockets = require("./sockets");

// ✅ ROOM SERVICE IMPORTS (UPDATED)
const {
  createRoom,
  joinRoom,
  startGame,
} = require("./services/roomService");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Shadow Council API Running",
  });
});

// ============================
// TEST JOIN ROOM ROUTE
// ============================
app.get("/test-join", (req, res) => {
  try {
    const room = createRoom("host-socket");

    const updatedRoom = joinRoom(
      room.roomCode,
      "guest-socket"
    );

    res.json(updatedRoom);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Create HTTP server
const server = http.createServer(app);

// Create Socket.IO server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Initialize sockets
setupSockets(io);

const PORT = process.env.PORT || 5000;

// Start server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});