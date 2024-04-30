import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ChakraBaseProvider } from "@chakra-ui/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "./store/reducers/authSlice";
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
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true }); // Redirect to login page if not authenticated
    }
  }, [isAuthenticated, navigate]);

  return (
    <DndProvider backend={HTML5Backend}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/board/:boardId" element={<SingleBoardPage />} />
        </Route>
      </Routes>
    </DndProvider>
  );
}

export default App;
