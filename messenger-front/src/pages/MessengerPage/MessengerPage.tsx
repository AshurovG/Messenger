import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useUsername, setUsernameAction } from "slices/MainSlice";
import styles from "./MessengerPage.module.scss";
import Message from "components/Message";
import Input from "components/Input/";
import { Container, Box, Typography } from "@mui/material";
import Header from "components/Header";
import EnterForm from "components/EnterForm";

const MessengerPage = () => {
  const dispatch = useDispatch();
  const username = useUsername();
  const [usernameValue, setUsernameValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsernameValue(event.target.value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    dispatch(setUsernameAction(usernameValue));
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
          <Input placeholder="Введите сообщение..." mode="input__default" />
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
