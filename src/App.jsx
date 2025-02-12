import { useContext, useState } from "react";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import { BrowserRouter, Routes, Route, NavLink } from "react-router";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Root from "./components/root";
import Editor from "./pages/Editor";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { AuthContext } from "./components/AuthContext";
import AddNote from "./pages/AddNote";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<Home />} />
          <Route path="editor" element={<Editor />} />
          <Route path="add-note" element={<AddNote />} />
        </Route>
        <Route
          path="login"
          // element={<Login />}
          element={user ? <Navigate to="/" replace /> : <Login />}
        />
        <Route
          path="signup"
          element={user ? <Navigate to="/" replace /> : <SignUp />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
