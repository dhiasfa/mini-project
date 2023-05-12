import React, { useEffect } from "react";
import ReactQuill from "react-quill";
import { useForm } from "react-hook-form";
import { modules } from "../editor/Editor";
import "../../css/editform.css";

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
      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto w-75">
        <div className="image mb-4">
          <img src={data.image_url} className="img-fluid" alt="" />
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
              minLength: { value: 10, message: "Minimal 10 characters" },
            })}
            style={{
              border: errors.title && "1px solid red",
            }}
          />
          {errors.title && (
            <p className="text-danger">{errors.title.message}</p>
          )}
        </div>

        <div className="editor mb-4">
          <label htmlFor="content" className="form-label">
            Content
          </label>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={handleContentChange}
            modules={modules}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            className="form-select"
            id="category"
            name="category"
            {...register("category", {
              required: "Category is required",
            })}
            style={{
              border: errors.category && "1px solid red",
            }}>
            <option value="">Choose option</option>
            <option value="Technology">Technology</option>
            <option value="Fashion and Lifestyle">Fashion and Lifestyle</option>
            <option value="Sport and Health">Sport and Health</option>
            <option value="Business and Entrepreneurship">
              Business and Entrepreneurship
            </option>
            <option value="Travel">Travel</option>
          </select>
          {errors.category && (
            <p className="text-danger">{errors.category.message}</p>
          )}
        </div>

        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-primary">
            Update
          </button>
          <button
            type="button"
            className="btn btn-secondary mt-2 mb-4"
            onClick={() => onCancel()}>
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default EditForm;
