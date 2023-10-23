import React, { useContext, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import { Login } from "../auth/Login";
import "./navFoot.scss";
import { BasketmaniaContext } from "../context/BasketmaniaContext";


function NavBarBasket({ nav, setNav }) {
  const [toggle, setToggle] = useState(false);
  const [show, setShow] = useState(false);
  const { logged, user } = useContext(BasketmaniaContext);

  const toggleFunc = React.useCallback(() => {
    setToggle(!toggle);
    console.log(toggle);
  });

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
      <Container className="containerNav">
        <Navbar.Brand as={Link} to="/home">
          <img
            src="/images/BasketmaniaWhite2low.png"
            alt="Logo Basketmania"
            className="logoSm"
          />
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={toggleFunc}
        />
        <Navbar.Collapse id="responsive-navbar-nav" in={toggle}>
          <Nav className="me-auto toggleMenu">
            <Nav.Link as={Link} onClick={toggleFunc} id="linkNav" to="/home">
              HOME
            </Nav.Link>
            <Nav.Link as={Link} onClick={toggleFunc} id="linkNav" to="/players">
              JUGADORES
            </Nav.Link>
            <Nav.Link
              as={Link}
              onClick={toggleFunc}
              id="linkNav"
              to="/calendar"
            >
              PARTIDOS
            </Nav.Link>
            <Nav.Link
              as={Link}
              onClick={toggleFunc}
              id="linkNav"
              to="/standings"
            >
              CLASIFICACIÓN
            </Nav.Link>
            <Nav.Link as={Link} onClick={toggleFunc} id="linkNav" to="/about">
              EL EQUIPO
            </Nav.Link>
            {logged && <Nav.Link onClick={toggleFunc} as={Link} id="linkNav" to="/editor">
              EDITOR
            </Nav.Link>}
          </Nav>
          <Nav className="me-auto toggleBg">
            <Nav.Link as={Link} id="linkNav" to="/home">
              HOME
            </Nav.Link>
            <Nav.Link as={Link} id="linkNav" to="/players">
              JUGADORES
            </Nav.Link>
            <Nav.Link as={Link} id="linkNav" to="/calendar">
              PARTIDOS
            </Nav.Link>
            <Nav.Link as={Link} id="linkNav" to="/standings">
              CLASIFICACIÓN
            </Nav.Link>
            <Nav.Link as={Link} id="linkNav" to="/about">
              EL EQUIPO
            </Nav.Link>
            {logged && <Nav.Link as={Link} id="linkNav" to="/editor">
              EDITOR
            </Nav.Link>}
          </Nav>
          <Nav>
            <Nav.Link id="linkNav" onClick={()=>{setShow(!show)}}>
              {!logged ? "LOGIN" : "CERRAR SESIÓN"}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Login show={show} setShow={setShow} />
    </Navbar>
  );
}

export default NavBarBasket;
