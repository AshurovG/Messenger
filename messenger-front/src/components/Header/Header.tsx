import React from "react";
import cn from "classnames";
import styles from "./Header.module.scss";
import { AppBar, Container, Box, Typography } from "@mui/material";
import { Search, Settings, PersonOutline } from "@mui/icons-material";

type HeaderProps = {
  mode: "header__default" | "header__green" | "header__blue" | "header__dark";
};

const Header: React.FC<HeaderProps> = ({ mode }) => {
  return (
    <AppBar className={cn(styles.header, styles[mode])}>
      <Container className={styles.header__wrapper}>
        <Box className={styles.header__item}>
          <Typography variant="h6">Username</Typography>
          <PersonOutline fontSize="large" />
        </Box>

        <Box className={styles.header__item}>
          <Search fontSize="large" />
          <Settings fontSize="large" />
        </Box>
      </Container>
    </AppBar>
  );
};

export default Header;
