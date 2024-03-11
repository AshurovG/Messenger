import React from "react";
import { Button, ButtonProps as MuiButtonProps } from "@mui/material";
import styles from "./Button.module.scss";
import cn from "classnames";

interface CustomButtonProps extends MuiButtonProps {
  className?: string;
  mode: "button__default" | "button__green" | "button__blue" | "button__dark";
}

const CustomButton: React.FC<CustomButtonProps> = ({
  className,
  mode,
  ...props
}) => {
  return (
    <Button
      {...props}
      variant="contained"
      className={cn(styles.button, className, styles[mode])}
      color="primary"
    >
      Подключиться
    </Button>
  );
};

export default CustomButton;
