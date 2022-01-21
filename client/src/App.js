import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Home from "./components/Home"
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/signup" element={<SignUp />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/user" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App; 