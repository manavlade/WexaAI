import React from "react";
import Home from "./components/Home";
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import Products from "./components/Product";

function App() {

  return (
    <>
      <div>

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<SignUp/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/dashboard/products" element={<Products/>} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
