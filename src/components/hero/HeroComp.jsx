import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../../css/main.css";
const HeroComp = () => {
  return (
    <div className="hero">
      <Container>
        <Row>
          <div className="hero-content">
            <Col className="d-flex justify-content-center">
              <h1>myBlog</h1>
            </Col>
            <Col className="d-flex justify-content-center">
              <h5>
                Join our community of passionate writers and readers, and share
                your thoughts with the world. Begin your journey with MyBlog
                today and experience the joy of expressing yourself through
                writing. It's an awesome platform to be productive and
                entertained at the same time.
              </h5>
            </Col>
          </div>
          <Col />
        </Row>
      </Container>
    </div>
  );
};

export default HeroComp;
