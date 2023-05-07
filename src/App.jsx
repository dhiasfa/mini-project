import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import CreateForm from "./pages/CreateForm";
import LandingPage from "./pages/LandingPage";
import ShowArtikel from "./pages/ShowArtikel";

function App() {
  const [token, setToken] = useState(false);

  if (token) {
    sessionStorage.setItem("token", JSON.stringify(token));
  }

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      let data = JSON.parse(sessionStorage.getItem("token"));
      setToken(data);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/signup"
          element={token ? <Navigate to="/create" /> : <SignUp />}
        />
        <Route
          path="/login"
          element={
            token ? <Navigate to="/home-page" /> : <Login setToken={setToken} />
          }
        />
        <Route path="/artikel/:id" element={<ShowArtikel />} />
        {token ? (
          <>
            <Route path="/home-page" element={<HomePage token={token} />} />
            <Route path="/create" element={<CreateForm token={token} />} />
          </>
        ) : (
          <Route path="/login" element={<Login setToken={setToken} />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
