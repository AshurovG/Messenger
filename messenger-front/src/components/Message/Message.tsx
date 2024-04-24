import React, { forwardRef } from "react";
import cn from "classnames";
import styles from "./Message.module.scss";
import { Typography, Box } from "@mui/material";
import { ErrorRounded } from "@mui/icons-material";

type MessageProps = {
  senderName: string;
  text: string;
  className?: string;
  isError?: boolean;
  onContextMenu?: React.MouseEventHandler<HTMLDivElement>; // Добавляем onContextMenu
  mode:
    | "rec__default"
    | "sen__default"
    | "sen__green"
    | "rec__green"
    | "sen__blue"
    | "rec__blue"
    | "sen__dark"
    | "rec__dark";
  forwardedRef?: React.Ref<HTMLDivElement>; // Добавляем forwardedRef
};

const Message = forwardRef<HTMLDivElement, MessageProps>(
  (
    {
      senderName,
      text,
      className,
      isError,
      mode,
      onContextMenu,
      forwardedRef, // Получаем forwardedRef
    },
    ref
  ) => {
    const isWhiteCaption = !["rec__default", "sen__default"].includes(mode);
    const messageType = mode.split("__")[0];

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
          ref={forwardedRef || ref}
          onContextMenu={onContextMenu}
          className={
            className
              ? isError
                ? cn(className, mode, styles.message, styles.message__error)
                : cn(className, mode, styles.message)
              : isError
              ? cn(styles.message, styles[mode], styles.message__error)
              : cn(styles.message, styles[mode])
          }
          // sx={isError ? { backgroundColor: "#D8D8DC" } : undefined}
        >
          <Typography
            variant="caption"
            style={
              isWhiteCaption || isError
                ? { color: "#fff" }
                : { color: "#9c9898" }
            }
            className={styles.message__caption}
          >
            {senderName}
          </Typography>
          <Typography className={styles.message__text}>{text}</Typography>
          {isError && <ErrorRounded className={styles.message__icon} />}
        </Box>
      </Box>
    );
  }
);

export default Message;
