import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './components/LoginPage'
import ChatRoom from './components/ChatRoom'
import ProfilePage from './components/ProfilePage'
import SettingPage from './components/SettingPage'
import NotFound from './components/NotFound'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/connect" element={<ChatRoom />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
