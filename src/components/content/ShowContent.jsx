import React, { useState, useEffect } from "react";
import { supabase } from "../../client";
import { Preview } from "../Editor/Editor";
import EditForm from "../form/EditForm";
import "../../css/card.css";

const ShowContent = ({ token }) => {
  const [articles, setArticles] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [showAlertDelete, setShowAlertDelete] = useState(false);
  const [showAlertEdit, setShowAlertEdit] = useState(false);

  useEffect(() => {
    async function fetchArticles() {
      setLoading(true);
      const { data, error } = await supabase
        .from("artikel")
        .select("*")
        .eq("user_id", token.user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.log(error);
      } else {
        setArticles(data);
      }
      setLoading(false);
    }
    fetchArticles();
  }, [token, currentArticle]);

  const handleEdit = (article) => {
    setCurrentArticle(article);
    setEditMode(true);
  };

  const handleDelete = async (articleId, title) => {
    const { error } = await supabase
      .from("artikel")
      .delete()
      .eq("id", articleId);

    if (error) {
      console.log(error);
    } else {
      setArticles((prevArticles) =>
        prevArticles.filter((a) => a.id !== articleId)
      );
      setShowAlertDelete(true);
      setTimeout(() => {
        setShowAlertDelete(false);
      }, 3000);
    }
  };

  const handleUpdate = async (data) => {
    const { title, content, category, image_url } = data;

    if (currentArticle) {
      const { error } = await supabase
        .from("artikel")
        .update({
          title,
          content,
          category,
          image_url,
        })
        .eq("id", currentArticle.id);

      if (error) {
        console.log(error);
      } else {
        setEditMode(false);
        setCurrentArticle(null);
        setShowAlertEdit(true);
        setTimeout(() => {
          setShowAlertEdit(false);
        }, 3000);
      }
    }
  };

  return (
    <>
      <div className="card-container">
        {showAlertDelete && (
          <div className="alert alert-success mt-5" role="alert">
            Data berhasil dihapus
          </div>
        )}
        {showAlertEdit && (
          <div className="alert alert-success mt-5" role="alert">
            Data berhasil diupdate
          </div>
        )}
        {loading ? (
          <div className="container-loader">
            <div className="custom-loader"></div>
          </div>
        ) : editMode ? (
          <>
            <EditForm
              data={currentArticle}
              handleUpdate={handleUpdate}
              setEditMode={setEditMode}
              content={content}
              setContent={setContent}
            />
          </>
        ) : (
          <div className="card-table">
            {articles.map((article) => (
              <div className="card" key={article.id}>
                <div className="card-header">
                  <h5 className="card-title">{article.title}</h5>
                </div>
                <div className="card-image">
                  <img src={article.image_url} alt={article.title} />
                </div>
                <div className="card-body">
                  <div className="card-text">
                    <Preview value={article.content} />
                  </div>
                  <div className="card-category">
                    <p>{article.category}</p>
                  </div>
                </div>
                <div className="card-footer">
                  <button
                    className="btn-edit"
                    onClick={() => handleDelete(article.id, article.title)}>
                    Delete
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleEdit(article)}>
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
export default ShowContent;
