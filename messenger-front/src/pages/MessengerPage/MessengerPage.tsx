import React from "react";
import styles from "./MessengerPage.module.scss";
import Message from "components/Message";
import Input from "components/Input/";
import Button from "components/Button";

const MessengerPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.page__chat}>
        <Message
          senderName="user1"
          text="Hello, how are you?"
          mode="sen__default"
        />

        <Input placeholder="Введите сообщение..." mode="input__dark" />
        <Button
          onClick={() => {
            console.log(111);
          }}
        >
          Отправить
        </Button>
      </div>
    </div>
  );
};

export default MessengerPage;
