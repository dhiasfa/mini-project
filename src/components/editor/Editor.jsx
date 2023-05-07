import "react-quill/dist/quill.snow.css";

export const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, false] }],
    [{ font: [] }],
    [{ size: [] }],
    [{ align: [] }],
    ["bold", "italic", "underline", "strike"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
  ],
};

export const Preview = ({ value }) => {
  return (
    <div>
      <div className="ql-editor" dangerouslySetInnerHTML={{ __html: value }} />
      <style>
        {`.ql-editor {
          text-indent: 0;
          padding-left: 0;
        }
        .ql-editor img {
          max-width: 50%;
          height: auto;
        }`}
      </style>
    </div>
  );
};
