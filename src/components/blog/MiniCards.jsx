import React, { useEffect, useState } from "react";
import { supabase } from "../../client";
import { Link } from "react-router-dom";
import "../../css/minicards.css";

const MiniCards = ({ category, visible }) => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function fetchCardsByCategory() {
      let { data: cards, error } = await supabase
        .from("artikel")
        .select("*")
        .eq("category", category);

      if (error) console.log("Error fetching cards:", error.message);
      else setCards(cards);
    }

    fetchCardsByCategory();
  }, [category]);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div style={{ display: visible ? "block" : "none" }}>
      <div className="minicards-container">
        <h5 className="mb-4">{category}</h5>
        {cards.map((card) => (
          <div className="mini-cards d-flex" key={card.id}>
            <div className="images-cards">
              <img className="img-fluid" src={card.image_url} alt="" />
            </div>
            <div className="title-cards ms-lg-2">
              <p className="title-card-category">{card.category}</p>
              <h4>{card.title}</h4>
              <div className="date">
                <p>{formatDate(card.created_at)}</p>
              </div>
              <div className="read-link-container">
                <Link to={`/artikel/${card.id}`}>
                  <button>read</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MiniCards;
