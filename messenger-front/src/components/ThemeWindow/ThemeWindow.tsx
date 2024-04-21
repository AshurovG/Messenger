import React from "react";
import styles from "./ThemeWindow.module.scss";
import cn from "classnames";
import { Box, Typography, Container } from "@mui/material";
import blueBackground from "assets/blue.png";
import greenBackground from "assets/green.jpeg";
import { useDispatch } from "react-redux";
import { setThemeAction } from "slices/MainSlice";

type MessageProps = {
  className?: string;
};

const ThemeWindow: React.FC<MessageProps> = ({ className }) => {
  const dispatch = useDispatch();

  const handleThemeSelect = (theme: "default" | "dark" | "green" | "blue") => {
    dispatch(setThemeAction(theme));
  };

  return (
    <Box className={cn(styles.theme, className)}>
      <Container maxWidth={"sm"} className={styles.theme__wrapper}>
        <Typography variant="h6" className={styles.theme__title}>
          Настройки оформления
        </Typography>
        <Typography className={styles.theme__subtitle}>
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
