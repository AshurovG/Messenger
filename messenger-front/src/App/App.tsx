import styles from "./App.module.scss";
import MessengerPage from "pages/MessengerPage";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { useTheme } from "slices/MainSlice";

function App() {
  const theme = useTheme();

  return (
    <div className={styles[`app__${theme}`]}>
      {/* <Header mode="header__default" /> */}
      <HashRouter>
        <Routes>
          <Route path="/" element={<MessengerPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
