import React from "react";
import cn from "classnames";
import styles from "./Header.module.scss";
import { AppBar, Container, Box, Typography } from "@mui/material";

type HeaderProps = {
  mode: "header__default" | "header__green" | "header__blue" | "header__dark";
};

const Header = () => {
  return (
    <AppBar className={styles.header}>
      <Container className={styles.header__wrapper}>
        <Box className={styles.header__item}>
          <Typography variant="h6">Username</Typography>
        </Box>

        <Box className={styles.header__item}></Box>
      </Container>
    </AppBar>
  );
};

export default Header;
