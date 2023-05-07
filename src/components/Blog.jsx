import React, { useState, useRef } from "react";
import MiniCards from "./blog/MiniCards";
import CategoryComps from "./blog/CategoryComps";

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const categoryRef = useRef(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    categoryRef.current.scrollIntoView();
  };

  return (
    <div>
      <div className="blog-comps">
        <div className="cards-blog">
          <MiniCards
            category="Technology"
            visible={
              selectedCategory === "" || selectedCategory === "Technology"
            }
          />
          <MiniCards
            category="Business and Entrepreneurship"
            visible={
              selectedCategory === "" ||
              selectedCategory === "Business and Entrepreneurship"
            }
          />
          <MiniCards
            category="Sport and Health"
            visible={
              selectedCategory === "" || selectedCategory === "Sport and Health"
            }
          />
          <MiniCards
            category="Fashion and Lifestyle"
            visible={
              selectedCategory === "" ||
              selectedCategory === "Fashion and Lifestyle"
            }
          />
          <MiniCards
            category="Travel"
            visible={selectedCategory === "" || selectedCategory === "Travel"}
          />
        </div>
        <div className="blog-category" ref={categoryRef}>
          <CategoryComps onCategoryClick={handleCategoryClick} />
        </div>
      </div>
    </div>
  );
};

export default Blog;
