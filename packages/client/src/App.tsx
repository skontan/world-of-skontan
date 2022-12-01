import { Routes, Route } from "react-router-dom";
import SignUp from "./views/sign-up/sign-up.view";
import WordOfDay from "./views/word-of-day/word-of-day.view";

function App() {
  return (
    <Routes>
      <Route path="/" element={<p>Home</p>} />
      <Route path="/word" element={<WordOfDay />} />
      <Route path="/sign-up" element={<SignUp />} />
    </Routes>
  );
}

export default App;
