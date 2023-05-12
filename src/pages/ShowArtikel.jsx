import React, { useEffect, useState } from "react";
import { supabase } from "../client";
import { useParams } from "react-router-dom";
import { Preview } from "../components/editor/Editor";
import NavbarComp from "../components/navbar/NavbarComp";
import "../css/main.css";

const ShowArtikel = () => {
  const [article, setArticle] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    }

    fetchArticle();
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <NavbarComp />
      <div className="container mt-5">
        {loading ? (
          <div className="container-loader mt-5">
            <div className="custom-loader"></div>
          </div>
        ) : (
          <>
            {article ? (
              <div className="article-container mt-5">
                <img
                  className="mt-5"
                  src={article.image_url}
                  alt=""
                  style={{ width: 700 }}
                />
                <h2 className="article-title">{article.title}</h2>
                <p>
                  Author : {article.author} , {formatDate(article.created_at)}
                </p>
                <p className="article-description">
                  {<Preview value={article.content} />}
                </p>
                <div className="article-category">{article.category}</div>
              </div>
            ) : (
              <p>No article found.</p>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ShowArtikel;
