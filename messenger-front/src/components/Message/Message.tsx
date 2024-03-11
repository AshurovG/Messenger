import React from "react";
import cn from "classnames";
import styles from "./Message.module.scss";
import { Typography, Box } from "@mui/material";

type MessageProps = {
  senderName: string;
  text: string;
  className?: string;
  mode: "rec__default" | "sen__default";
};

const Message: React.FC<MessageProps> = ({
  senderName,
  text,
  className,
  mode,
}) => {
  const isWhiteCaption = !["rec__default", "sen__default"].includes(mode);
  const messageType = mode.split("__")[0];
  console.log(messageType);

  return (
    <Box
      className={styles.message__wrapper}
      sx={
        messageType === "sen"
          ? { display: "flex", justifyContent: "flex-end" }
          : { display: "flex", justifyContent: "flex-start" }
      }
    >
      <Box
        className={
          className
            ? cn(className, mode, styles.message)
            : cn(styles.message, styles[mode])
        }
      >
        <Typography
          variant="caption"
          style={isWhiteCaption ? { color: "#fff" } : { color: "#9c9898" }}
          className={styles.message__caption}
        >
          {senderName}
        </Typography>
        <Typography className={styles.message__text}>{text}</Typography>
      </Box>
    </Box>
  );
};

export default Message;
