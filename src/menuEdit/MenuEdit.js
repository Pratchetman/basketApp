import React from "react";
import "./menuEdit.scss";
import { useNavigate } from "react-router-dom";
export const MenuEdit = () => {
  const navigate = useNavigate();
  return (
    <div className="menuEditPrincipal">
      <div className="insideMenuEditPrincipal">
        <div
          className="section"
          onClick={() => navigate("/players/editor/edit")}
        >
          <h6>Editar jugadores</h6>
        </div>
        <div className="section" onClick={() => navigate("/calendar/edit")}>
          <h6>Editar resultados</h6>
        </div>
        <div className="section" onClick={() => navigate("/newSeason")}>
          <h6>Crear calendario</h6>
        </div>
      </div>
    </div>
  );
};
