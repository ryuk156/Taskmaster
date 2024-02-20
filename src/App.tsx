import { Routes, Router, Route, BrowserRouter } from "react-router-dom";
import CreateBoard from "./components/CreateBoard";
import Dashboard from "./components/Dashboard";
import AllBoard from "./components/AllBoard";
import SingleBoardPage from "./components/SingleBoardPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AllBoard />} />
        <Route path="/board/:boardId" element={<SingleBoardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
