import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useUsername, setUsernameAction } from "slices/MainSlice";
import styles from "./MessengerPage.module.scss";
import Message from "components/Message";
import Input from "components/Input/";
import { Container, Box, Typography } from "@mui/material";
import Header from "components/Header";
import EnterForm from "components/EnterForm";
import SendButton from "components/SendButton";

type MessageData = {
  sender: string;
  time?: any;
  text: string;
  isError?: boolean;
  type: "rec" | "sen";
};

const MessengerPage = () => {
  const dispatch = useDispatch();
  const username = useUsername();
  const [usernameValue, setUsernameValue] = useState("");
  const [messageValue, setMessageValue] = useState("");
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<MessageData[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsernameValue(event.target.value);
  };

  const handleMessageInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMessageValue(event.target.value);
  };

  if (ws) {
    ws.onmessage = (event) => {
      const messageData = JSON.parse(event.data);
      if (event.data.isError) {
        // messages[messages.length - 1].isError = true;
        setMessages((prevMessages) => {
          const newMessages = [...prevMessages]; // Создаем копию массива
          newMessages[newMessages.length - 1].isError = true; // Изменяем нужный элемент
          return newMessages; // Возвращаем новый массив
        });
        console.log("error!!!");
      } else {
        setMessages((prevMessages) => [
          {
            sender: messageData.sender,
            text: messageData.text,
            time: messageData.time,
            type: "rec",
          },
          ...prevMessages,
        ]);
      }

      console.log(messageData);
    };
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const ws = new WebSocket(`ws://localhost:3000?username=${usernameValue}`);
    ws.onclose = (event) => {
      console.log("WebSocket соединение закрыто:", event.code, event.reason);
    };

    ws.onopen = () => {
      console.log("WebSocket соединение открыто");
      dispatch(setUsernameAction(usernameValue));
    };
    setWs(ws);
  };

  const sendMessage = () => {
    if (ws) {
      ws.send(
        JSON.stringify({
          sender: username,
          time: new Date().toISOString(),
          text: messageValue,
        })
      );

      setMessages([
        {
          sender: username,
          text: messageValue,
          type: "sen",
        },
        ...messages,
      ]);

      setMessageValue("");
    }
  };

  return (
    <div className={styles.page}>
      <Header mode="header__default" />
      <Container
        sx={{ width: "85vw", height: "100vh" }}
        className={styles.page__wrapper}
      >
        {username !== "" && (
          <Box className={styles.page__messages}>
            {messages.map((message) => (
              <Message
                senderName={message.sender}
                text={message.text}
                isError={message.isError}
                mode={`${message.type}__default`}
              />
            ))}
          </Box>
        )}

        {username !== "" && (
          <Box display={"flex"} gap={2}>
            <Input
              value={messageValue}
              onChange={handleMessageInputChange}
              placeholder="Введите сообщение..."
              mode="input__default"
            />
            <SendButton mode="button__default" onClick={sendMessage} />
          </Box>
        )}
        {username === "" && (
          <Box>
            <Typography
              textAlign={"center"}
              marginBottom={1}
              marginTop={5}
              variant="h5"
            >
              Для входа в чат введите имя пользователя
            </Typography>
            <EnterForm
              className={styles.page__form}
              onSumbit={handleSubmit}
              onChange={handleInputChange}
              value={usernameValue}
            />
          </Box>
        )}
      </Container>
    </div>
  );
};

export default MessengerPage;
