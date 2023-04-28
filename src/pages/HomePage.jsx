import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Tabel from "../components/tabel/Tabel";
import { supabase } from "../client";
const HomePage = ({ token }) => {
  let navigate = useNavigate();
  const [article, setArticle] = useState([]);

  const handleLogout = ({ token }) => {
    sessionStorage.removeItem("token");
    navigate("/login");
    // Clear cache browser
    window.location.reload(true);
  };

  useEffect(() => {
    async function fetchArticles() {
      const { data, error } = await supabase
        .from("artikel")
        .select("*")
        .eq("user_id", token.user.id);

      if (error) {
        console.log(error);
      } else {
        setArticle(data);
      }
    }

    fetchArticles();
  }, [token]);
  return (
    <div>
      <h3>Tabel, {token.user.user_metadata.full_name}</h3>
      <button className="btn btn-danger" onClick={handleLogout}>
        LOGOUT
      </button>
      <h2>Tabel artikelnya</h2>
      <Tabel data={article} />
    </div>
  );
};

export default HomePage;
