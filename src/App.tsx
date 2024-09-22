import React, { useEffect } from "react";
import { Routes, Route, useNavigate, redirect } from "react-router-dom";
import { ChakraBaseProvider } from "@chakra-ui/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuthenticated, setToken } from "./store/reducers/authSlice";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import SingleBoardPage from "./components/SingleBoardPage";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/PrivateRoute";
import SignUp from "./components/auth/SignUp";

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token && !isAuthenticated) {
      dispatch(setToken(token));
      dispatch(setIsAuthenticated(true));
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) {
     redirect('/signUp')  // Redirect to login page if not authenticated
    }
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/board/:boardId" element={<SingleBoardPage />} />
        </Route>
      </Routes>
    </DndProvider>
  );
}

export default App;
