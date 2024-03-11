import React from "react";
import styles from "./MessengerPage.module.scss";
import Message from "components/Message";
import Input from "components/Input/";
import Button from "components/Button";
import { Container, Box } from "@mui/material";
import Header from "components/Header";

const MessengerPage = () => {
  return (
    <div className={styles.page}>
      <Header />
      <Container
        sx={{ width: "85vw", height: "100vh" }}
        className={styles.page__wrapper}
      >
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

        <Input placeholder="Введите сообщение..." mode="input__default" />
        <Button
          onClick={() => {
            console.log(111);
          }}
        >
          Отправить
        </Button>
      </Container>
    </div>
  );
};

export default MessengerPage;
