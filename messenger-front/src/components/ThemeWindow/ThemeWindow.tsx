import React from "react";
import styles from "./ThemeWindow.module.scss";
import cn from "classnames";
import { Box, Typography, Container, colors } from "@mui/material";
import blueBackground from "assets/blue.png";
import greenBackground from "assets/green.jpeg";
import { useDispatch } from "react-redux";
import { setThemeAction } from "slices/MainSlice";

type MessageProps = {
  className?: string;
  mode: "theme__default" | "theme__secondary";
};

const ThemeWindow: React.FC<MessageProps> = ({ className, mode }) => {
  const dispatch = useDispatch();

  const handleThemeSelect = (theme: "default" | "dark" | "green" | "blue") => {
    dispatch(setThemeAction(theme));
    localStorage.setItem("theme", theme);
  };

  return (
    <Box
      className={cn(styles.theme, className)}
      sx={
        mode === "theme__default"
          ? { backgroundColor: "#e9e9e9" }
          : { backgroundColor: "#939393", color: "#fff" }
      }
    >
      <Container maxWidth={"sm"} className={styles.theme__wrapper}>
        <Typography variant="h6" className={styles.theme__title}>
          Настройки оформления
        </Typography>
        <Typography
          sx={
            mode === "theme__default"
              ? { color: "#636367" }
              : { color: "#d8d8d8" }
          }
          className={styles.theme__subtitle}
        >
          Доступные темы
        </Typography>
        <Box className={styles.theme__items}>
          <Box
            onClick={() => {
              handleThemeSelect("dark");
            }}
            className={styles.theme__item}
            sx={{ backgroundColor: "#000" }}
          ></Box>
          <Box
            onClick={() => {
              handleThemeSelect("default");
            }}
            className={styles.theme__item}
            sx={{ backgroundColor: "#fff" }}
          ></Box>
          <img
            onClick={() => {
              handleThemeSelect("green");
            }}
            className={styles.theme__item}
            src={greenBackground}
            alt="theme"
          />
          <img
            onClick={() => {
              handleThemeSelect("blue");
            }}
            className={styles.theme__item}
            src={blueBackground}
            alt="theme"
          />
        </Box>
      </Container>
    </Box>
  );
};

export default ThemeWindow;
