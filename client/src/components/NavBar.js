import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar
      bg="dark"
      variant="dark">
      <Container>
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link
            as={Link}
            to="/">
            Home
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/login">
            Login
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/register">
            Register
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
