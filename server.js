const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const socketIO = require("socket.io");

const mongoDB = require("./src/config/mongoDB");

const { verifyAccessToken } = require("./src/utils/jwt");

const authRoutes = require("./src/routes/authRoutes");
const apiRoutes = require("./src/routes/apiRoutes");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(bodyParser.json());
app.use(cors());

// MongoDB 연결
mongoDB();

// 라우트 설정
app.use("/api", apiRoutes);
app.use("/auth", authRoutes);

// socket 채팅 테스트
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.use((socket, next) => {
  const token = socket.handshake.query.token;

  verifyAccessToken(token, (err, decoded) => {
    if (err) {
      return next(new Error("Authentication error"));
    }
    socket.user = decoded;
    next();
  });
});

// Socket.io 연결 처리
io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("joinRoom", async ({ code }) => {
    socket.join(code);
    socket.to(code).emit("message", {
      user: "admin",
      text: `${socket.user.username} has joined!`,
    });

    // Optionally, send chat history to the user
    const room = await Room.findOne({ code }).populate(
      "messages.user",
      "username"
    );
    if (room) {
      room.messages.forEach((message) => {
        socket.emit("message", {
          user: message.user.username,
          text: message.text,
        });
      });
    }
  });

  socket.on("sendMessage", async ({ code, message }) => {
    const room = await Room.findOne({ code });
    if (room) {
      const chatMessage = { user: socket.user._id, text: message };
      room.messages.push(chatMessage);
      await room.save();
      io.to(code).emit("message", {
        user: socket.user.username,
        text: message,
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
