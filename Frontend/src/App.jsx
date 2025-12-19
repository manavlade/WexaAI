import React from "react";
import Home from "./components/Home";
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

function App() {

  return (
    <>
      <div>

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<SignUp/>} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
