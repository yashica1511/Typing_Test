import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import TypingTest from './components/TypingTest';
import First from './components/First';
import Multimode from './components/Multimode';
import Register from './components/Register';
import Login from './components/Login';

function App() {
  return (
    <Routes>
      <Route path="/" element={<First />} />
      <Route path="/home" element={<Home />} />
      <Route path="/typingtest" element={<TypingTest />} />
      <Route path="/multimode" element={<Multimode />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
