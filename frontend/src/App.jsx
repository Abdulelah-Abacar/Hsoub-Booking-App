import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Login, Signup, Event, Booking } from "./pages";
import Navbar from "./components/Navbar";

import AuthContext from "./context/AuthContext";
import { useState } from "react";

function App() {
  let [token, setToken] = useState(localStorage.getItem("token") || "");
  let [userId, setUserId] = useState(localStorage.getItem("userId") || "");
  let [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );

  const login = (userToken, loginUserId, username) => {
    if (userToken) {
      setToken(userToken);
      localStorage.setItem("token", userToken);
    }
    if (loginUserId) {
      setUserId(loginUserId);
      localStorage.setItem("userId", loginUserId);
    }
    if (username) {
      setUsername(username);
      localStorage.setItem("username", username);
    }
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    setUsername(null);
    localStorage.clear();
  };
  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ token, userId, username, login, logout }}>
        <Navbar />
        <main className="main-content">
          <Routes>
            {token && (
              <Route
                path="/login"
                element={<Navigate replace to="/events" />}
                exact
              />
            )}
            <Route path="/login" element={<Login />} />
            {token && (
              <Route
                path="/signup"
                element={<Navigate replace to="/events" />}
                exact
              />
            )}
            <Route path="/signup" element={<Signup />} />
            <Route path="/events" element={<Event />} />
            <Route path="/bookings" element={<Booking />} />
            <Route path="/" element={<Navigate replace to={"/events"} />} />
          </Routes>
        </main>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
