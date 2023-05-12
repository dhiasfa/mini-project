import React from "react";
import ShowContent from "../components/content/ShowContent";
import NavbarComp from "../components/navbar/NavbarComp";
import "../css/main.css";
const HomePage = ({ token }) => {
  return (
    <div className="container-homepage">
      <NavbarComp token={token} create="Create" logout="Logout" />
      {/* <h3 className="text-center mt-5">
        Your Content, {token.user.user_metadata.full_name}
      </h3> */}
      <ShowContent token={token} />
    </div>
  );
};

export default HomePage;
