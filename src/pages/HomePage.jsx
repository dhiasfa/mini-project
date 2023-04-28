import React from "react";
import { useNavigate } from "react-router-dom";
const HomePage = ({ token }) => {
  let navigate = useNavigate();
  const handleLogout = ({ token }) => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div>
      <h3>Tabel, {token.user.user_metadata.full_name}</h3>
      <button className="btn btn-danger" onClick={handleLogout}>
        LOGOUT
      </button>
    </div>
  );
};

export default HomePage;
