import React, { useEffect, useState } from "react";
import { supabase } from "../client";
import { useParams } from "react-router-dom";
import { Preview } from "../components/Editor/Editor";
import NavbarComp from "../components/NavbarComp";
import "../css/main.css";

const ShowArtikel = () => {
  const [article, setArticle] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchArticle() {
      const { data, error } = await supabase
        .from("artikel")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching article:", error.message);
      } else {
        setArticle(data);
      }
    }

    fetchArticle();
  }, [id]);

  return (
    <>
      <NavbarComp />
      <div className="container">
        {article ? (
          <div className="article-container mt-5">
            <img
              className="mt-5"
              src={article.image_url}
              alt=""
              style={{ width: 700 }}
            />
            <h2 className="article-title">{article.title}</h2>
            <p className="article-description">
              {<Preview value={article.content} />}
            </p>
            <div className="article-category">{article.category}</div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  );
};

export default ShowArtikel;
