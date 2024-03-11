import React from "react";
import styles from "./Button.module.scss";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {};

const Button: React.FC<ButtonProps> = ({ ...props }) => {
  return (
    <button {...props} className={styles.button}>
      Отправить
    </button>
  );
};

export default Button;
