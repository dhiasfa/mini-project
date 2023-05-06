import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Tabel from "../components/tabel/Tabel";
import NavbarComp from "../components/NavbarComp";
import "../css/main.css";
const HomePage = ({ token }) => {
  let navigate = useNavigate();

  const handleLogout = ({ token }) => {
    sessionStorage.removeItem("token");
    navigate("/login");
    // Clear cache browser
    window.location.reload(true);
  };

  const handleCreate = () => {
    navigate("/create");
  };

  return (
    <div className="container-homepage">
      <NavbarComp token={token} create="Create" logout="Logout" />
      <h3 className="text-center">
        Your Content, {token.user.user_metadata.full_name}
      </h3>
      {/* <div>
        <button className="btn btn-danger" onClick={handleLogout}>
          LOGOUT
        </button>
      </div>
      <div className="artikel">
        <button onClick={handleCreate} className="btn btn-primary">
          Create
        </button>
      </div> */}
      <Tabel token={token} />
    </div>
  );
};

export default HomePage;
