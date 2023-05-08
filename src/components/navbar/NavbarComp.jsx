import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import "../css/main.css";

const NavbarComp = ({ token, create, logout }) => {
  const navigate = useNavigate();

  const handleLogout = ({ token }) => {
    sessionStorage.removeItem("token");
    navigate("/login");
    // Clear cache browser
    window.location.reload(true);
  };

  const handleCreate = () => {
    if (create) {
      navigate("/create");
    } else {
      navigate("/signup");
    }
  };

  return (
    <div>
      <Navbar bg="light" expand="lg" className="fixed-top">
        <Container>
          <Navbar.Brand as={Link} to="/" className="navBrand fw-bold fs-4 ">
            myBlog
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto me-4 fs-6 text-white">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link onClick={handleCreate}>
                {create ? "Create" : "Write"}
              </Nav.Link>
              {logout ? (
                <button
                  className="btn btn-outline-secondary"
                  // variant="link"
                  onClick={handleLogout}>
                  Logout
                </button>
              ) : (
                <Nav.Link as={Link} to="/login">
                  Sign In
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarComp;
