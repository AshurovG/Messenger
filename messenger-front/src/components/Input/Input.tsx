import React from "react";
import styles from "./Input.module.scss";
import { TextField } from "@mui/material";
import { TextFieldProps } from "@mui/material/TextField";
import cn from "classnames";

type InputProps = TextFieldProps & {
  mode: "input__default" | "input__green" | "input__blue" | "input__dark";
  className?: string;
};

const Input: React.FC<InputProps> = ({ mode, className, ...props }) => {
  return (
    <TextField
      className={cn(styles.input, styles[mode], className)}
      {...props}
      fullWidth
      sx={{
        "& fieldset": { border: "none" },
      }}
    />
  );
};

export default Input;
