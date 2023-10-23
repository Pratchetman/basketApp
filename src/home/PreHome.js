import React, { useContext, useEffect, useState } from "react";
import "./preHome.scss";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Login } from "../auth/Login";
import { BasketmaniaContext } from "../context/BasketmaniaContext";
export const PreHome = ({ nav, setNav }) => {
  const [show, setShow] = useState(false)
  const { logged } = useContext(BasketmaniaContext);
  const navigate = useNavigate();
  console.log(logged);
  useEffect(() => {
  setNav(false);
  if (logged){
    navigate("/home");
  }
  }, [logged])
  
  return (
    <div className="principalPreHome">
      <div className="insidePrincipalPreHome">
        <img src="images/Basketmania1low.png" alt="" />
        {/* <p>"Se sufre, pero se goza"</p> */}
        <div className="buttons">
          <Button
            className="enterButton"
            onClick={() => {
              navigate("/home");
              setNav(true);
            }}
          >
            Entrar
          </Button>
          <Button
            className="enterButton login"
            onClick={() => {
             setShow(!show)
            }}
          >
            Iniciar Sesión
          </Button>
        </div>
      </div>
      {show && <Login setShow={setShow} show={show} />}
    </div>
  );
};
