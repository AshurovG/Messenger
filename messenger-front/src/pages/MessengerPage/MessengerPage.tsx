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

const MessengerPage = () => {
  const dispatch = useDispatch();
  const username = useUsername();
  const [usernameValue, setUsernameValue] = useState("");
  const [messageValue, setMessageValue] = useState("");
  const [ws, setWs] = useState<WebSocket | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsernameValue(event.target.value);
  };

  const handleMessageInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMessageValue(event.target.value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    dispatch(setUsernameAction(usernameValue));

    const ws = new WebSocket("ws://localhost:3000");
    setWs(ws);
  };

  const sendMessage = () => {
    // if (ws) {
    //   ws.send(message);
    // }
    console.log(messageValue);
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
            <Message
              senderName="user1"
              text="Hello, how are you?"
              mode="sen__default"
            />
            <Message
              senderName="user1"
              text="Hello, how are you dfkldsjfkljksldjf?"
              mode="rec__default"
            />
            <Message
              senderName="user1"
              text="Hello, how are you?"
              mode="sen__default"
            />
            <Message
              senderName="user1"
              text="Hello, how are you?"
              mode="sen__default"
            />
            <Message
              senderName="user1"
              text="Hello, how are you?"
              mode="rec__default"
            />
            <Message
              senderName="user1"
              text="Hello, how are you?"
              mode="rec__default"
            />
            <Message
              senderName="user1"
              text="Hello, how are you?"
              mode="sen__default"
            />
            <Message
              senderName="user1"
              text="Hello, how are you?"
              mode="rec__default"
            />
            <Message
              senderName="user1"
              text="Hello, how are you?"
              mode="rec__default"
            />
            <Message
              senderName="user1"
              text="Hello, how are you?"
              mode="sen__default"
            />
            <Message
              senderName="user1"
              text="Hello, how are you?"
              mode="rec__default"
            />
            <Message
              senderName="user1"
              text="Hello, how are you?"
              mode="rec__default"
            />
            <Message
              senderName="user1"
              text="Hello, how are you?"
              mode="rec__default"
            />
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
