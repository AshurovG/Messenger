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

// type ConectionsData = {
//   [key: string]: {
//     id: Number;
//     ws: WebSocket;
//   }[];
// };

type Connection = {
  id: number;
  ws: WebSocket;
};

type ConectionsData = {
  [key: string]: Connection;
};

let connections: ConectionsData = {};

app.post("/receive", (req, res) => {
  const message: ReceivedMessageData = req.body;
  console.log(message);
  res.sendStatus(200);
});

wss.on("connection", (ws, req: any) => {
  console.log("Client connected");
  const url = new URL(req.url, `http://${req.headers.host}`);
  const username = url.searchParams.get("username");

  if (username) {
    // Проверяем, есть ли уже подключение для данного пользователя
    if (connections[username]) {
      // Если подключение уже существует, закрываем его
      connections[username].ws.close();
    }
    // Добавляем новое подключение
    connections[username] = { id: Date.now(), ws: ws };
    console.log(connections);
  } else {
    console.error("Username not provided");
    ws.close();
  }

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
