import React, { useState, useEffect } from "react";
import NavbarComp from "../components/navbar/NavbarComp";
import HeroComp from "../components/hero/HeroComp";
import Blog from "../components/blog/Blog";

const LandingPage = () => {
  return (
    <div>
      <NavbarComp />
      <HeroComp />
      <h2 className="title-blog text-center mt-3">All Post</h2>
      <Blog />
    </div>
  );
};

export default LandingPage;
