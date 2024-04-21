import React from "react";
import cn from "classnames";
import styles from "./SendButton.module.scss";
import { Send } from "@mui/icons-material";

type SendButtonProps = {
  mode: "button__default" | "button__green" | "button__blue" | "button__dark";
  onClick: () => void;
  className?: string;
};

const SendButton: React.FC<SendButtonProps> = ({
  mode,
  onClick,
  className,
}) => {
  return (
    <div
      className={cn(styles.button, className, styles[mode])}
      onClick={onClick}
    >
      <Send
        className={styles["button__default-icon"]}
        sx={
          mode === "button__default" || mode === "button__blue"
            ? { color: "#707070" }
            : { color: "#fff" }
        }
      />
    </div>
  );
};

export default SendButton;
