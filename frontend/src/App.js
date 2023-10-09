import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/pages/Home";
import NavBar from "./components/navBar";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import {useAuthContext} from './context/hooks/useAuthContext'
function App() {
  const {user} = useAuthContext()
  return (
    <div className="App bg-gray-200 min-h-screen">
      <BrowserRouter>
        <NavBar />
        <div className="pages">
          <Routes>
            <Route path="/" element={user? <Home />: <Navigate to='/login' />} />
            <Route path="/login" element={!user?<Login />: <Navigate to='/' />} />
            <Route path="/signup" element={!user?<Signup />:<Navigate to='/' />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
