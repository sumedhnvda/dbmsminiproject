import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Photos = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchAllPhotos = async () => {
      try {
        const res = await axios.get("http://localhost:8800/photos");
        setPhotos(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllPhotos();
  }, []);

  console.log(photos);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/photos/${id}`);
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Image gallary</h1>
      <div className="photos">
        {photos.map((photo) => (
          <div key={photo.id} className="photo">
            <img src={photo.cover} alt="oops some problem" />
            <h2>{photo.title}</h2>
            <p>{photo.desc}</p>
            <button className="delete" onClick={() => handleDelete(photo.id)}>Delete</button>
            <button className="update">
              <Link
                to={`/update/${photo.id}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Update
              </Link>
            </button>
          </div>
        ))}
      </div>

      <button className="addHome">
        <Link to="/add" style={{ color: "inherit", textDecoration: "none" }}>
          Add new Photo
        </Link>
      </button>
    </div>
  );
};

export default Photos;