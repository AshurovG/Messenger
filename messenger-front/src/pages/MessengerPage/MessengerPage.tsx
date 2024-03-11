import React from "react";
import styles from "./MessengerPage.module.scss";
import Message from "components/Message";
import Input from "components/Input/";
import Button from "components/Button";
import { Container, Box, Typography } from "@mui/material";
import Header from "components/Header";
import EnterForm from "components/EnterForm";

const MessengerPage = () => {
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    console.log("Форма отправлена");
  };

  return (
    <div className={styles.page}>
      <Header mode="header__default" />
      <Container
        sx={{ width: "85vw", height: "100vh" }}
        className={styles.page__wrapper}
      >
        {/* <Box className={styles.page__messages}>
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

        <Input placeholder="Введите сообщение..." mode="input__default" /> */}
        <Box>
          <Typography
            textAlign={"center"}
            marginBottom={1}
            marginTop={5}
            variant="h5"
          >
            Для входа в чат введите имя пользователя
          </Typography>
          <EnterForm className={styles.page__form} onSumbit={handleSubmit} />
        </Box>
      </Container>
    </div>
  );
};

export default MessengerPage;
