import express from "express";
import http from "http";
import WebSocket from "ws";

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
app.use(express.json());

type ReceivedMessageData = {
  senderName: string;
  text: string;
  date: Date; // Также является идентификатором сообщения
  isError?: boolean;
};

type ConectionsData = {
  [key: string]: {
    id: Number;
    ws: WebSocket;
  }[];
};

app.post("/receive", (req, res) => {
  const message: ReceivedMessageData = req.body;
  console.log(message);
  res.sendStatus(200);
});

let connections = {};

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", (message) => {
    try {
      // Получение сообщения от отправителя с браузера
      const messageString = message.toString();
      const data = JSON.parse(messageString);
      console.log(`Received message:`, data);
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
