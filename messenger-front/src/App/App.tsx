import styles from './App.module.scss'
import Button from 'components/Button'
import MessengerPage from 'pages/MessengerPage'
import { HashRouter, Routes, Route, Navigate } from "react-router-dom"

function App() {

  return (
    <div className={styles.app}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<MessengerPage/>}/>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
        <Button/>
    </div>
  )
}

export default App
