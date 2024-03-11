import styles from "./App.module.scss";
import MessengerPage from "pages/MessengerPage";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
// import Header from "components/Header";

function App() {
  return (
    <div className={styles.app}>
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
