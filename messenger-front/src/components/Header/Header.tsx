import React, { useState } from "react";
import cn from "classnames";
import styles from "./Header.module.scss";
import { AppBar, Container, Box, Typography } from "@mui/material";
import { Search, Settings, PersonOutline } from "@mui/icons-material";
import { useUsername } from "slices/MainSlice";
import ThemeWindow from "components/ThemeWindow";
import Input from "components/Input";
import { useTheme } from "slices/MainSlice";

type HeaderProps = {
  mode: "header__default" | "header__green" | "header__blue" | "header__dark";
};

const Header: React.FC<HeaderProps> = ({ mode }) => {
  const username = useUsername();
  const theme = useTheme();
  const [isThemeWindowOpened, setIsThemeWindowOpened] = useState(false);
  const [isSearchInput, setIsSearchInput] = useState(false);

  const handleSettingsButtonClick = () => {
    if (!isThemeWindowOpened && isSearchInput) {
      setIsSearchInput(false);
    }
    setIsThemeWindowOpened(!isThemeWindowOpened);
  };

  const handleSearchButtonClick = () => {
    if (!isSearchInput && isThemeWindowOpened) {
      setIsThemeWindowOpened(false);
    }
    setIsSearchInput(!isSearchInput);
  };

  return (
    <AppBar className={cn(styles.header, styles[mode])}>
      <Container className={styles.header__wrapper}>
        <Box className={styles.header__nav}>
          <Box className={styles.header__item}>
            <Typography variant="h6">{username}</Typography>
            <PersonOutline fontSize="large" />
          </Box>

          <Box className={styles.header__item}>
            <Search
              onClick={handleSearchButtonClick}
              fontSize="large"
              sx={{ cursor: "pointer" }}
            />
            <Settings
              onClick={handleSettingsButtonClick}
              fontSize="large"
              sx={{ cursor: "pointer" }}
            />
          </Box>
        </Box>

        {isSearchInput && (
          <Input
            placeholder="Поиск сообщения"
            className={styles.header__input}
            mode={`input__${theme}`}
          />
        )}
        {isThemeWindowOpened && (
          <div>
            <ThemeWindow className={styles.header__theme} />
          </div>
        )}
      </Container>
    </AppBar>
  );
};

export default Header;
