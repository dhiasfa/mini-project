import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useForm } from "react-hook-form";
import { modules } from "../components/Editor/Editor";
import { supabase } from "../client";
import { useNavigate } from "react-router-dom";
import "../css/createform.css";

const CreateForm = ({ token }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [value, setValue] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();

  const url =
    "https://kpbcywbosxqtlyyzflpu.supabase.co/storage/v1/object/public/images/artikel/";

  const handleContentChange = (content) => {
    setValue(content);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  const uploadImage = async (image) => {
    const { data: file, error } = await supabase.storage
      .from("images")
      .upload(`artikel/${image.name}`, image);

    if (error) {
      console.log("Error uploading file: ", error.message);
      return { error };
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    await uploadImage(image);

    const { error: insertError } = await supabase.from("artikel").insert([
      {
        title: data.title,
        content: value,
        category: data.category,
        image_url: `${url}${image.name}`,
        user_id: token.user.id,
      },
    ]);

    if (insertError) {
      console.log("Error inserting data: ", insertError.message);
      return;
    }

    setLoading(false);

    reset();
    setValue("");
    setImage(null);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  return (
    <>
      {showAlert && (
        <div className="alert alert-success mt-4" role="alert">
          Data berhasil ditambahkan!
        </div>
      )}
      <form
        className="container-createform mt-5 mb-5"
        onSubmit={handleSubmit(onSubmit)}>
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
        <div className="mb-3">
          <label htmlFor="formFile" className="form-label">
            Image :
          </label>
          <input
            className="form-control"
            type="file"
            accept="image/*"
            id="formFile"
            required
            onChange={handleImageChange}
          />
        </div>

        <p id="categoryHelp" className="form-text text-danger">
          {errors?.title?.message}
        </p>
        <div className="editor">
          <ReactQuill
            theme="snow"
            value={value}
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
          <option value="Technology" name="category">
            Technology
          </option>
          <option value="Fashion and Lifestyle" name="category">
            Fashion and Lifestyle
          </option>
          <option value="Sport and Health" name="category">
            Sport and Health
          </option>
          <option value="Business and Entrepreneurship" name="category">
            Business and Entrepreneurship
          </option>
          <option value="Travel" name="category">
            Travel
          </option>
        </select>
        <p id="categoryHelp" className="form-text text-danger">
          {errors?.category?.message}
        </p>
        <div>
          <button type="submit" className="btn-add" disabled={loading}>
            {loading ? "Loading..." : "Add Post"}
          </button>
          <button
            type="button"
            className="btn-cancel"
            onClick={() => navigate("/home-page")}
            disabled={loading}>
            {loading ? "Loading..." : "Cancel"}
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateForm;
