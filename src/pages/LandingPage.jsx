import React, { useState, useEffect } from "react";
import NavbarComp from "../components/NavbarComp";
import HeroComp from "../components/HeroComp";
import { supabase } from "../client";
import MiniCards from "../components/blog/MiniCards";
import Blog from "../components/Blog";

const LandingPage = () => {
  return (
    <div>
      <NavbarComp />
      <HeroComp />
      <h2 className="title-blog text-center">Blog</h2>
      <Blog />
    </div>
  );
};

export default LandingPage;
