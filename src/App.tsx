import { Routes, Router, Route, BrowserRouter } from "react-router-dom";
import CreateBoard from "./components/CreateBoard";
import Dashboard from "./components/Dashboard";
import AllBoard from "./components/AllBoard";
import SingleBoardPage from "./components/SingleBoardPage";
import Navbar from "./components/Navbar";

import {
  ChakraBaseProvider,
} from "@chakra-ui/react";
import { theme } from "./theme";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";





function App() {
  return (
    <DndProvider backend={HTML5Backend}>
    <ChakraBaseProvider theme={theme}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/board/:boardId" element={<SingleBoardPage />} />
        </Routes>
      </BrowserRouter>
    </ChakraBaseProvider>
    </DndProvider>
  );
}

export default App;
