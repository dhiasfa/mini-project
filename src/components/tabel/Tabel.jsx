import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../client";
import { useForm } from "react-hook-form";
import { Preview, modules } from "../Editor/Editor";
import Create from "./Create";

const Tabel = ({ token }) => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true); // tambahan state loading

  useEffect(() => {
    async function fetchArticles() {
      setLoading(true); // set loading menjadi true saat data masih di-fetch
      const { data, error } = await supabase
        .from("artikel")
        .select("*")
        .eq("user_id", token.user.id);

      if (error) {
        console.log(error);
      } else {
        setArticles(data);
      }
      setLoading(false); // set loading menjadi false saat data selesai di-fetch
    }
    fetchArticles();
  }, [token, currentArticle]);

  const handleEdit = (article) => {
    setCurrentArticle(article);
    setEditMode(true);
  };

  const handleDelete = async (articleId, title) => {
    const confirmDelete = window.confirm(
      `Apakah yakin ingin menghapus blog dengan judul ${title}?`
    );

    if (confirmDelete) {
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
      }
    }
  };

  const handleCreate = () => {
    navigate("/create");
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
        alert("Data berhasil diupdate");
      }
    }
  };

  return (
    <>
      <div className="artikel">
        <button onClick={handleCreate} className="btn btn-primary">
          Create
        </button>
      </div>
      {loading ? ( // menampilkan tulisan loading saat loading masih true
        <h3>Loading...</h3>
      ) : editMode ? (
        <EditForm
          data={currentArticle}
          handleUpdate={handleUpdate}
          setEditMode={setEditMode}
          content={content}
          setContent={setContent}
        />
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Judul</th>
              <th scope="col">Konten</th>
              <th scope="col">Kategori</th>
              <th scope="col">Gambar</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article, index) => (
              <tr key={article.id}>
                <td scope="row">{index + 1}</td>
                <td>{article.title}</td>
                <td>{<Preview value={article.content} />}</td>
                <td>{article.category}</td>
                <td>
                  {" "}
                  <img
                    src={article.image_url}
                    alt={article.title}
                    style={{ width: 100 }}
                  />{" "}
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(article.id, article.title)}>
                    Delete
                  </button>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(article)}>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

const EditForm = ({ data, handleUpdate, setEditMode, content, setContent }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      title: data.title,
      category: data.category,
      image_url: data.image_url,
    },
  });

  const handleContentChange = (value) => {
    setContent(value);
  };

  useEffect(() => {
    setValue("title", data.title);
    setValue("category", data.category);
    setValue("image_url", data.image_url);
    setContent(data.content);
  }, [data, setValue, setContent]);

  const onSubmit = (data) => {
    handleUpdate({ ...data, content });
  };

  const onCancel = () => {
    setEditMode(false);
    setCurrentArticle(null);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="image">
          <label htmlFor="sampul"> Sampul Gambar</label> <br />
          <img src={data.image_url} style={{ width: 300 }} alt="" />
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="title"
            className="form-control"
            id="title"
            {...register("title", {
              required: "Title is required",
              min: { value: 25, message: "Minimal 25 karakter " },
            })}
            style={{
              border: errors.title && "1px solid red",
            }}
          />
        </div>

        <p id="categoryHelp" className="form-text text-danger">
          {errors?.title?.message}
        </p>
        <div className="editor">
          <ReactQuill
            theme="snow"
            value={content}
            onChange={handleContentChange}
            modules={modules}
          />
        </div>
        <label htmlFor="category" className="mb-2">
          Product Category:
        </label>
        <select
          className="form-select form-select-sm"
          id="category"
          name="category"
          {...register("category", {
            required: "Category is required",
          })}
          style={{
            border: errors.category && "1px solid red",
          }}>
          <option value="" name="category">
            Choose option
          </option>
          <option value="cookies" name="category">
            Cookies
          </option>
          <option value="Dress" name="category">
            Dress
          </option>
        </select>
        <p id="categoryHelp" className="form-text text-danger">
          {errors?.category?.message}
        </p>
        <div>
          <button type="submit" className="btn btn-primary">
            Update
          </button>
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default Tabel;
