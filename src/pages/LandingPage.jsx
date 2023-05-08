import React, { useState, useEffect } from "react";
import NavbarComp from "../components/NavbarComp";
import HeroComp from "../components/HeroComp";
import Blog from "../components/Blog";

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
