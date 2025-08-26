import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-task" element={<AddTask />} />
          <Route path="/edit-task/:id" element={<EditTask />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
