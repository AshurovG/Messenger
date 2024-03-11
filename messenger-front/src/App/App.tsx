import styles from "./App.module.scss";
import MessengerPage from "pages/MessengerPage";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <div className={styles.app}>
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
