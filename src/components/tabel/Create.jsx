import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useForm } from "react-hook-form";
import { modules, Preview } from "../Editor/Editor";
import { supabase } from "../../client";
import { useNavigate } from "react-router-dom";

const Create = ({ token }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [value, setValue] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/home-page");
  };
  const url =
    "https://kpbcywbosxqtlyyzflpu.supabase.co/storage/v1/object/public/images/artikel/";

  const handleContentChange = (content, delta, source, editor) => {
    setValue(editor.getHTML());
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
    setSuccess(false);
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
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          {loading && <h4>Loading...</h4>}
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
            Add Blog
          </button>
        </div>
      </form>
      <button type="submit" className="btn btn-primary" onClick={handleBack}>
        Cancel
      </button>
    </>
  );
};

export default Create;
