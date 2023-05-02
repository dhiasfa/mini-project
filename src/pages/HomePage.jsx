import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Tabel from "../components/tabel/Tabel";
import { supabase } from "../client";
const HomePage = ({ token }) => {
  let navigate = useNavigate();

  const handleLogout = ({ token }) => {
    sessionStorage.removeItem("token");
    navigate("/login");
    // Clear cache browser
    window.location.reload(true);
  };

  return (
    <div>
      <h3>Tabel, {token.user.user_metadata.full_name}</h3>
      <div>
        <button className="btn btn-danger" onClick={handleLogout}>
          LOGOUT
        </button>
      </div>
      <h2>Tabel artikelnya</h2>
      <Tabel token={token} />
    </div>
  );
};

export default HomePage;
