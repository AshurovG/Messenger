import React from "react";
import styles from "./Input.module.scss";
import { TextField } from "@mui/material";
import { TextFieldProps } from "@mui/material/TextField";
import cn from "classnames";

type InputProps = TextFieldProps & {
  mode: "input__default" | "input__green" | "input__blue" | "input__dark";
};

const Input: React.FC<InputProps> = ({ mode, ...props }) => {
  return (
    <TextField
      className={cn(styles.input, styles[mode])}
      {...props}
      fullWidth
      sx={{
        "& fieldset": { border: "none" },
      }}
    />
  );
};

export default Input;
