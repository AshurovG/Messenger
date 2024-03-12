import express from "express";
import http from "http";
import WebSocket from "ws";
import axios from "axios";

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
app.use(express.json());

type MessageData = {
  sender: string;
  text: string;
  time: Date; // Также является идентификатором сообщения
  isError?: boolean;
};

type Connection = {
  id: number;
  ws: WebSocket;
};

type ConectionsData = {
  [key: string]: Connection;
};

let connections: ConectionsData = {};

// Отправка сообщения на транспортный уровень
const sendMessageToAnotherLevel = async (message: MessageData) => {
  try {
    await axios("http://localhost:3001/send", {
      method: "POST",
      data: message,
    });
  } catch (error) {
    console.log(error);
  }
};

const sendMessageToOtherUsers = (message: MessageData) => {
  for (const [key, value] of Object.entries(connections)) {
    if (key !== message.sender) {
      value.ws.send(JSON.stringify(message)); // Отправляем все пользователям кроме отправителя
    }
  }
};

//Метод для получения сообщений с транспортного уровня
app.post("/receive", (req, res) => {
  const message: MessageData = req.body;
  sendMessageToOtherUsers(message);
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
  } else {
    ws.close();
  }

  ws.on("message", (message) => {
    try {
      // Получение сообщения от отправителя с браузера отправителя
      const messageString = message.toString();
      const messageJSON = JSON.parse(messageString);
      console.log(messageJSON);

      sendMessageToAnotherLevel(messageJSON);
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
    // Удаляем закрытое подключение из объекта connections при закрытии о
    if (username && connections[username]) {
      delete connections[username];
    }
  });
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
