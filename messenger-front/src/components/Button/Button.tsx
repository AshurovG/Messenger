import React from "react";
import styles from "./Button.module.scss";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  onClick: () => void;
};

const Button: React.FC<ButtonProps> = ({ onClick, ...props }) => {
  return (
    <button onClick={onClick} className={styles.button}>
      Отправить
    </button>
  );
};

export default Button;
