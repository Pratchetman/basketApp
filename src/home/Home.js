import React, { useContext, useEffect } from "react";
import "./home.scss";
import { useNavigate } from "react-router-dom";
import { BasketmaniaContext } from "../context/BasketmaniaContext";
export const Home = ({ setNav }) => {
  const navigate = useNavigate();
  const { logged } = useContext(BasketmaniaContext);
  useEffect(() => {
    setNav(true);
  }, []);

  return (
    <div className="principalHome">
      <h1>Basketmanía 2023-2024</h1>
      <hr />
      <div className="insidePrincipalHome">
        {logged && (
          <div
            className="sectionHome editor"
            onClick={() => navigate("/editor")}
          >
            <h5>Editor temporada</h5>
          </div>
        )}
        <div
          className="sectionHome players"
          onClick={() => navigate("/players")}
        >
          <h5>Jugadores</h5>
        </div>
        <div
          className="sectionHome stats"
          onClick={() => navigate("/calendar")}
        >
          <h5>Partidos</h5>
        </div>
        <div
          className="sectionHome ranking"
          onClick={() => navigate("/standings")}
        >
          <h5>Clasificación</h5>
        </div>
        <div className="sectionHome team" onClick={() => navigate("/about")}>
          <h5>El equipo</h5>
        </div>
      </div>
    </div>
  );
};
