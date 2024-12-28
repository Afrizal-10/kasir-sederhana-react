import React from "react";
import {Nav, Navbar, NavDropdown, Container} from "react-bootstrap";

function NavbarComponent() {
  return (
    <div>
      <Navbar expand="lg" variant="dark text-center">
        <Container>
          <Navbar.Brand href="#home">
            <strong>Kasir</strong>-Afrizal
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavbarComponent;
