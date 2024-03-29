import express from "express";
import http from "http";
import WebSocket from "ws";
import axios from "axios";

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
app.use(express.json());
const HOST = "172.20.10.3";

type MessageData = {
  sender: string;
  text: string;
  time: Number; // Также является идентификатором сообщения
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
    // await axios("http://localhost:3001/send", {
    //   method: "POST",
    //   data: message,
    // });
    await axios(`http://${HOST}:8000/transferMessage/`, {
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

const sendErrorMessage = (message: MessageData) => {
  const connection = connections[message.sender];
  if (connection) {
    connection.ws.send(JSON.stringify(message)); // Отправляем сообщение об ошибке пользователю, который отправил сообщение
  } else {
    console.log(`No connection found for sender: ${message.sender}`);
  }
};

//Метод для получения сообщений с транспортного уровня
app.post("/recieve", (req, res) => {
  // TODO: Сделать обработку ошибки
  const message: MessageData = req.body; // --
  console.log("BODY IS", req.body);
  if (req.body.isError) {
    sendErrorMessage(message);
    console.log("Произошла ошибка отправки сообщения");
  } else {
    sendMessageToOtherUsers(message); // --
  }
  res.sendStatus(200);
});

wss.on("connection", (ws, req: any) => {
  console.log("Client connected");
  const url = new URL(req.url, `http://${req.headers.host}`);
  const username = url.searchParams.get("username");
  console.log("connected", username);

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
      const date = new Date(messageJSON.time);
      const timeInSeconds = Math.floor(date.getTime() / 1000);
      messageJSON.time = timeInSeconds;
      console.log(messageJSON);
      // messageJSON.time = Math.floor(messageJSON.date.getTime() / 1000);

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
