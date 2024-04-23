import { useEffect, useState } from "react";
import styles from "./App.module.scss";
import MessengerPage from "pages/MessengerPage";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { useTheme, setThemeAction } from "slices/MainSlice";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [themeLoaded, setThemeLoaded] = useState(false);

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme) {
      dispatch(
        setThemeAction(currentTheme as "default" | "dark" | "green" | "blue")
      );
    }

    setThemeLoaded(true);
  }, [dispatch]);

  return (
    <div className={styles[`app__${theme}`]}>
      {/* <Header mode="header__default" /> */}
      {themeLoaded && (
        <HashRouter>
          <Routes>
            <Route path="/" element={<MessengerPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </HashRouter>
      )}
    </div>
  );
}

export default App;
