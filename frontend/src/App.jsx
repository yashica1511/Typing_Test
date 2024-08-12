import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./components/Home";
import TypingTest from "./components/TypingTest";
import First from "./components/First";

function App(){
  return(
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<First />} />
        <Route path="/home" element={<Home />} />
        <Route path="/typingtest" element={<TypingTest />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App;