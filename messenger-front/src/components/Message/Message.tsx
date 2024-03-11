import React from "react";
import cn from "classnames";
import styles from "./Message.module.scss";

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
  console.log(mode);

  return (
    <div
      className={
        className
          ? cn(className, mode, styles.message)
          : cn(styles.message, styles[mode])
      }
    >
      <div className={styles.message__container}>
        <p
          style={isWhiteCaption ? { color: "#fff" } : { color: "#9c9898" }}
          className={styles.message__caption}
        >
          {senderName}
        </p>
        <p className={styles.message__text}>{text}</p>
      </div>
    </div>
  );
};

export default Message;
