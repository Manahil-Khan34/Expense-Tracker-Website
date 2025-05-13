import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import{ Toaster } from "react-hot-toast"

import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import Home from './pages/dashboard/Home';
import Income from './pages/dashboard/Income';
import Expance from './pages/dashboard/Expance';
import UserProvider from './context/UserContext';

function App() {
  return (
    <UserProvider>
    <div>
    <Router>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/income" element={<Income />} />
        <Route path="/expance" element={<Expance />} />
      </Routes>
    </Router>
    </div>

    <Toaster
    toastOptions={{
  className: "",
  style: {
    fontSize: '13px'
  },
}} />
    </UserProvider>
  );
}

const Root = () => {
  //check if the token exist in localStorage
  const isAuthenticated = !!localStorage.getItem("token");

  // redirect to deashboard if authenticated, otherwise to login
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};

export default App;
