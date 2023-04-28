import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Tabel = ({ data }) => {
  const navigate = useNavigate();
  const handleCreate = () => {
    navigate("/create");
  };
  return (
    <div>
      <button className="btn btn-primary" onClick={handleCreate}>
        Create Content
      </button>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Judul</th>
            <th scope="col">Konten</th>
            <th scope="col">Kategori</th>
          </tr>
        </thead>
        <tbody>
          {data.map((artikels, index) => (
            <tr key={artikels.id}>
              <td scope="row">{index + 1}</td>
              <td>{artikels.judul}</td>
              <td>{artikels.konten}</td>
              <td>{artikels.kategori}</td>
              <button>Delete</button>
              <button>Edit</button>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tabel;
