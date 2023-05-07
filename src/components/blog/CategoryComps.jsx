import React, { useState } from "react";
import "../../css/main.css";

const CategoryComps = ({ onCategoryClick }) => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleOnClick = (category) => {
    setSelectedCategory(category);
    onCategoryClick(category === "All Blog" ? "" : category);
  };

  return (
    <div className="categoryComp">
      <p>Discover more of what matters to you</p>
      <div className="button-category">
        <button
          className={`btn-category ${
            selectedCategory === "Technology" ? "active" : ""
          }`}
          onClick={() => handleOnClick("Technology")}>
          Technology
        </button>
        <button
          className={`btn-category ${
            selectedCategory === "Fashion and Lifestyle" ? "active" : ""
          }`}
          onClick={() => handleOnClick("Fashion and Lifestyle")}>
          Fashion & Lifestyle
        </button>
        <button
          className={`btn-category ${
            selectedCategory === "Business and Entrepreneurship" ? "active" : ""
          }`}
          onClick={() => handleOnClick("Business and Entrepreneurship")}>
          Business and Entrepreneurship
        </button>
        <button
          className={`btn-category ${
            selectedCategory === "Sport and Health" ? "active" : ""
          }`}
          onClick={() => handleOnClick("Sport and Health")}>
          Sport & Health
        </button>
        <button
          className={`btn-category ${
            selectedCategory === "Travel" ? "active" : ""
          }`}
          onClick={() => handleOnClick("Travel")}>
          Travel
        </button>
        <button
          className={`btn-category ${selectedCategory === "" ? "active" : ""}`}
          onClick={() => handleOnClick("All Blog")}>
          All Blog
        </button>
      </div>
    </div>
  );
};

export default CategoryComps;
