const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const socketIO = require("socket.io");

const mongoDB = require("./src/config/mongoDB");

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
app.use("/", authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

