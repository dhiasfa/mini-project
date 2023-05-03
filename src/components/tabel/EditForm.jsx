import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
import { useForm } from "react-hook-form";
import { modules } from "../Editor/Editor";
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
    setContent("");
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
            type="text"
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
          <button type="submit" className="btn btn-primary">
            Update
          </button>
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => onCancel()}>
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default EditForm;
