import React, { useContext, useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { BasketmaniaContext } from "../context/BasketmaniaContext";

import "./login.scss";

const userDefault = {
  name: "",
  password: "",
};

export const Login = ({ show, setShow }) => {
  const [msg, setMsg] = useState("");
  const { logged, setLogged, user, setUser } = useContext(BasketmaniaContext);
  const [login, setLogin] = useState(userDefault);
  const navigate = useNavigate();
  const handleClose = () => {
    setMsg("");
    setShow(false);
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = () => {
    const auth = getAuth();
    console.log("empiezo el submit");
    signInWithEmailAndPassword(auth, user.name, user.password)
      .then((userCredential) => {
        const uid = userCredential.user.uid;
        console.log("ya tengo el id", uid);
        setUser(uid);
        setLogged(true);
        setLogin({});
        setShow(!show);
        navigate("/home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setMsg("Error en los datos introducidos");
      });
  };
  const handleSession = () => {
    getAuth()
      .signOut()
      .then(() => {
        console.log("sesión cerrada correctamente");
        setLogged(false);
        setShow(false);
        navigate("/");
      })
      .catch((error) => {
        console.log("error al cerrar sesion", error);
      });
  };
  return (
    <Modal
      show={show}
      onHide={handleClose}
      dialogClassName="compl_Modal"
      size="md"
     
    >
      <Modal.Header className="headerModal">
        <img
          className="logoModal"
          src="../images/BasketmaniaWhite2.png"
          alt=""
        />
        <Modal.Title className="title">
          {!logged ? <h1>Inicia sesión</h1> : <h1>Cerrar sesión</h1>}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="principalLogin">
          <div className="insidePrincipalLogin">
            {!logged ?
            <>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Usuario</InputGroup.Text>
              <Form.Control
                placeholder="E-mail"
                aria-label="Nombre"
                aria-describedby="basic-addon1"
                onChange={handleChange}
                value={user.name}
                name="name"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Contraseña</InputGroup.Text>
              <Form.Control
                placeholder="Contraseña"
                type="password"
                aria-label="password"
                aria-describedby="password"
                onChange={handleChange}
                value={user.password}
                name="password"
              />
            </InputGroup>
            </> : <h3>¿Quieres salir?</h3>}
          </div>
        </div>
        <p className="errorMsg">{msg}</p>
      </Modal.Body>
      <Modal.Footer>
       
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        {!logged ?<Button className="enterButtonAdd" onClick={handleSubmit}>
          Login
        </Button> :
        <Button variant="secondary" onClick={handleSession}>
          Cerrar sesión
        </Button>}
      </Modal.Footer>
    </Modal>
  );
};
