import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useUsername, setUsernameAction } from "slices/MainSlice";
import styles from "./MessengerPage.module.scss";
import Message from "components/Message";
import Input from "components/Input/";
import { Container, Box, Typography } from "@mui/material";
import Header from "components/Header";
import EnterForm from "components/EnterForm";
import SendButton from "components/SendButton";
import { useTheme } from "slices/MainSlice";

type MessageData = {
  sender: string;
  time?: any;
  text: string;
  isError?: boolean;
  type: "rec" | "sen";
};

const MessengerPage = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const username = useUsername();
  const [usernameValue, setUsernameValue] = useState("");
  const [messageValue, setMessageValue] = useState("");
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [deleteMenuPosition, setDeleteMenuPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [deletedMessageId, setDeletedMessageId] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  const messageRefs = useRef<(HTMLDivElement | null)[]>([]);

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
        console.log("REC");

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
    const currentTime = new Date().toISOString();
    if (ws) {
      console.log("SEND", messageValue);
      ws.send(
        JSON.stringify({
          sender: username,
          time: currentTime,
          text: messageValue,
        })
      );

      setMessages([
        {
          sender: username,
          text: messageValue,
          time: currentTime,
          type: "sen",
        },
        ...messages,
      ]);

      setMessageValue("");
    }
  };

  const handleLogoutButtonClick = () => {
    if (ws) {
      ws.close();
      setWs(null);
      dispatch(setUsernameAction(""));
      setUsernameValue("");
    }
  };

  const handleMessageRightClick = (
    event: React.MouseEvent<HTMLDivElement>,
    id: number
  ) => {
    event.preventDefault();
    setDeleteMenuPosition({ x: event.clientX - 150, y: event.clientY - 70 });
    setDeletedMessageId(id);
    console.log(messages);
    console.log(id);
  };

  const handleDeleteClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    const newMessages = messages.filter(
      (message) => message.time !== deletedMessageId
    );
    setMessages(newMessages);
    setDeleteMenuPosition(null);
  };

  const onSearchValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    // const foundMessageIndex = messages.findIndex((message) =>
    //   message.text.includes(event.target.value)
    // );

    // if (foundMessageIndex !== -1) {
    //   const messageElement = messageRefs.current[foundMessageIndex];
    //   if (messageElement) {
    //     messageElement.scrollIntoView({ behavior: "smooth" });
    //   }
    // }
  };

  useEffect(() => {
    if (searchValue) {
      const foundMessageIndex = messages.findIndex((message) =>
        message.text.includes(searchValue)
      );

      if (foundMessageIndex !== -1) {
        const messageElement = messageRefs.current[foundMessageIndex];
        if (messageElement) {
          messageElement.scrollIntoView({ behavior: "smooth" });
          messageElement.classList.add(`${styles.highlighted}`);

          setTimeout(() => {
            messageElement.classList.remove(`${styles.highlighted}`);
          }, 2000);
        }
      }
    }
  }, [searchValue, messages]);

  return (
    <div
      onClick={
        deleteMenuPosition == null
          ? () => {}
          : () => setDeleteMenuPosition(null)
      }
      className={styles.page}
    >
      <Header
        searchValue={searchValue}
        onSearchValueChange={onSearchValueChange}
        mode={`header__${theme}`}
        handleLogoutButtonClick={handleLogoutButtonClick}
      />
      <Container
        sx={{ width: "85vw", height: "100vh" }}
        className={styles.page__wrapper}
      >
        {username !== "" && (
          <Box className={styles.page__messages}>
            {messages.map((message, index) => (
              <Message
                ref={(el) => (messageRefs.current[index] = el)}
                key={message.text}
                senderName={message.sender}
                text={message.text}
                isError={message.isError}
                mode={`${message.type}__${theme}`}
                onContextMenu={(event: React.MouseEvent<HTMLDivElement>) =>
                  handleMessageRightClick(event, message.time)
                }
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
              mode={`input__${theme}`}
            />
            <SendButton mode={`button__${theme}`} onClick={sendMessage} />
          </Box>
        )}
        {username === "" && (
          <Box>
            <Typography
              textAlign={"center"}
              marginBottom={1}
              marginTop={5}
              variant="h5"
              sx={
                theme === "default" || theme === "blue"
                  ? { color: "#000" }
                  : { color: "#fff" }
              }
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
        {deleteMenuPosition && (
          <Box
            onClick={handleDeleteClick}
            className={styles.page__delete}
            sx={
              theme === "default" || theme === "blue"
                ? {
                    position: "absolute",
                    top: deleteMenuPosition.y,
                    left: deleteMenuPosition.x,
                    // backgroundColor: "#e9e9e9",
                  }
                : {
                    position: "absolute",
                    top: deleteMenuPosition.y,
                    left: deleteMenuPosition.x,
                    // backgroundColor: "#939393",
                    color: "#fff",
                  }
            }
          >
            <Typography>Удалить сообщение</Typography>
          </Box>
        )}
      </Container>
    </div>
  );
};

export default MessengerPage;
