import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Cookies from "js-cookie";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Projects from "./pages/Projects";

export default function App() {
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    const saved = Cookies.get("token");
    if (saved) setToken(saved);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const saved = Cookies.get("token");
      if (!saved && token) {
        setToken(null);
      }
    }, 1000 * 60);

    return () => clearInterval(interval);
  }, [token]);

  function handleLogin(newToken: string) {
    Cookies.set("token", newToken, { expires: 1 / 24 }); // 1 hour
    setToken(newToken);
  }

  function handleLogout() {
    Cookies.remove("token");
    setToken(null);
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            token ? (
              <Projects token={token} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={
            token ? <Navigate to="/" /> : <Login onLogin={handleLogin} />
          }
        />
        <Route
          path="/register"
          element={
            token ? <Navigate to="/" /> : <Register onRegister={handleLogin} />
          }
        />
      </Routes>
    </Router>
  );
}
