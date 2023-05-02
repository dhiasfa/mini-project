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

export const Preview = ({ value }) => (
  <div>
    <div className="ql-editor" dangerouslySetInnerHTML={{ __html: value }} />
    <style>
      {`.ql-editor img {
          max-width: 50%;
          height: auto;
        }`}
    </style>
  </div>
);