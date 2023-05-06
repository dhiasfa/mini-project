import React, { useEffect, useState } from "react";
import { supabase } from "../client";
import { useParams } from "react-router-dom";
import { Preview } from "../components/Editor/Editor";

const DisplayArtikel = () => {
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
    <div className="container">
      {article ? (
        <div className="article-container">
          <img
            className="mb-2"
            src={article.image_url}
            alt=""
            style={{ width: 700 }}
          />
          <h2 className="article-title">{article.title}</h2>
          <div className="article-category">{article.category}</div>
          <p className="article-description">
            {<Preview value={article.content} />}
          </p>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default DisplayArtikel;
