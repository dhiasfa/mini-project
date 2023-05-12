import React, { useEffect, useState } from "react";
import { supabase } from "../../client";
import "../../css/newest.css";
import { Link } from "react-router-dom";
const NewestComps = () => {
  const [newestArticles, setNewestArticles] = useState([]);

  useEffect(() => {
    async function fetchNewestArticles() {
      const { data, error } = await supabase
        .from("artikel")
        .select("*")
        .order("created_at", { ascending: false })
        .range(0, 1);

      if (error) {
        console.error("Error fetching newest articles:", error.message);
      } else {
        setNewestArticles(data);
      }
    }

    fetchNewestArticles();
  }, []);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div>
      {[...Array(newestArticles.length)].map((_, index) => (
        <div className="newest-container" key={index}>
          <div className="newest-comps d-flex">
            <div className="images-newst">
              <img
                className="img-fluid"
                src={newestArticles[index].image_url}
                alt=""
              />
            </div>
            <div className="newest-comps ms-lg-2">
              <p>{newestArticles[index].category}</p>
              <h4>{newestArticles[index].title}</h4>
              <div className="date-newest">
                <p>{formatDate(newestArticles[index].created_at)}</p>
              </div>
              <div className="newest-comps">
                <Link to={`/artikel/${newestArticles[index].id}`}>
                  <button>read</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewestComps;
