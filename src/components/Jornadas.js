import React from "react";
import "./jornadas.scss";
export const Jornadas = ({ teamsList, setJornadaNumber, jornadaNumber }) => {
  console.log(jornadaNumber);
  return (
    <div className={"principalJornadaNumber" + (!(teamsList.length > 0) ? " nomobile" : "")}>
      {teamsList.length > 0 &&<h5>Jornadas</h5>}
      {teamsList.map((elem, index) => {
        if (index != teamsList.length - 1 && teamsList.length % 2 == 0){
          return (
            <div
              className="insidePrincipalJornadaNumber"
              onClick={() => setJornadaNumber(index + 1)}
            >
              <div
                key={elem.id}
                className={
                  jornadaNumber == index + 1
                    ? "jornadaNumberSelected"
                    : "jornadaNumber"
                }
              >
                Jornada {index + 1}
              </div>
              <div
                className={
                  jornadaNumber == index + 1 ? "selectedMark" : "noSelectedMark"
                }
              ></div>
            </div>
          );
        }else if (teamsList.length % 2 != 0){
          return (
            <div
              className="insidePrincipalJornadaNumber"
              onClick={() => setJornadaNumber(index + 1)}
            >
              <div
                key={elem.id}
                className={
                  jornadaNumber == index + 1
                    ? "jornadaNumberSelected"
                    : "jornadaNumber"
                }
              >
                Jornada {index + 1}
              </div>
              <div
                className={
                  jornadaNumber == index + 1 ? "selectedMark" : "noSelectedMark"
                }
              ></div>
            </div>
          );
        }
      
      })}
    </div>
  );
};
