import React, { useEffect, useState } from "react";
import cn from "classnames";
import styles from "./Header.module.scss";
import { AppBar, Container, Box, Typography } from "@mui/material";
import { Search, Settings, PersonOutline, Logout } from "@mui/icons-material";
import ThemeWindow from "components/ThemeWindow";
import Input from "components/Input";
import { useTheme, useUsername } from "slices/MainSlice";

type HeaderProps = {
  mode: "header__default" | "header__green" | "header__blue" | "header__dark";
  handleLogoutButtonClick: () => void;
  searchValue: string;
  onSearchValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Header: React.FC<HeaderProps> = ({
  mode,
  handleLogoutButtonClick,
  searchValue,
  onSearchValueChange,
}) => {
  const username = useUsername();
  const theme = useTheme();
  const [isThemeWindowOpened, setIsThemeWindowOpened] = useState(false);
  const [isSearchInput, setIsSearchInput] = useState(false);

  useEffect(() => {
    if (isSearchInput) {
      setIsSearchInput(false);
    }
    if (isThemeWindowOpened) {
      setIsThemeWindowOpened(false);
    }
  }, [username]);

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
        {username ? (
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
              <Logout
                onClick={handleLogoutButtonClick}
                fontSize="large"
                sx={{ cursor: "pointer" }}
              />
            </Box>
          </Box>
        ) : (
          <Box className={styles.header__container}>
            <Typography
              textAlign={"center"}
              variant="h5"
              sx={
                theme === "default" || theme === "blue"
                  ? { color: "#000" }
                  : { color: "#fff" }
              }
            >
              Вход в чат
            </Typography>
            <Settings
              onClick={handleSettingsButtonClick}
              fontSize="large"
              sx={{ cursor: "pointer" }}
              className={styles.header__icon}
            />
          </Box>
        )}

        {isSearchInput && (
          <Input
            value={searchValue}
            onChange={onSearchValueChange}
            placeholder="Поиск сообщения"
            className={styles.header__input}
            mode={`input__${theme}`}
          />
        )}
        {isThemeWindowOpened && (
          <div>
            <ThemeWindow
              className={styles.header__theme}
              mode={
                theme === "default" || theme === "blue"
                  ? "theme__default"
                  : "theme__secondary"
              }
            />
          </div>
        )}
      </Container>
    </AppBar>
  );
};

export default Header;
