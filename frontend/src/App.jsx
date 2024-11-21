import React, { useEffect } from "react";
import Login from "./pages/user/Login";
import SignUp from "./pages/user/SignUp";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/user/Home";
import { useContext } from "react";
import { ChatContext } from "./Context/ChatProvider";
import ChatPage from "./pages/user/ChatPage";

const App = () => {
  const { user } = useContext(ChatContext);

  useEffect(() => {
  }, [user]);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={!user ? <Navigate to={"/login"} replace={true} /> : <Home />}
        />
        <Route
          path="/chat"
          element={
            !user ? <Navigate to={"/login"} replace={true} /> : <ChatPage />
          }
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to={"/"} replace={true} />}
        />
        <Route
          path="/signUp"
          element={!user ? <SignUp /> : <Navigate to={"/"} replace={true} />}
        />
      </Routes>
    </div>
  );
};

export default App;
