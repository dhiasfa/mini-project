import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import Create from "./components/tabel/Create";

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
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        {token ? (
          <>
            <Route path="/home-page" element={<HomePage token={token} />} />
            <Route path="/create" element={<Create token={token} />} />
          </>
        ) : (
          <Route path="/login" element={<Login setToken={setToken} />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
