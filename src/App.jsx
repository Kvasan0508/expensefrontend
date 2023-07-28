import React from "react";
import Expense from "./components/expense";
import Signup from "./components/signup";
import Login from './components/login'
import { BrowserRouter,Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Expense />}/>
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />

        
      </Routes>{" "}
    </BrowserRouter>
  );
}
