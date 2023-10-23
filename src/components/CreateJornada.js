import React, { useEffect, useState } from "react";
import "./createJornada.scss";
import { Button, Form } from "react-bootstrap";
import DataFetch from "../hooks/DataFetch";
import checkJornadas from "../utils/checkJornadas";



export const CreateJornada = ({
  jornadaNumber,
  teamsList,
  season,
  setSeason,
  round
}) => {
  const [msg, setMsg] = useState();
  const [msgOK, setMsgOK] = useState();
  const { addRound1 } = DataFetch();
  console.log("season",season);
  console.log("jornadaNumber", jornadaNumber);
  console.log("round", round);
  
  const deepCopy = (arr) => {
    return arr.map((innerArray) => {
      return innerArray.map((obj) => ({ ...obj }));
    });
  };

  const handleJornada = (matchIndex, homeAway, e) => {
    //COPIA PROFUNDA
    const aux = deepCopy(season);

    homeAway == "home"
      ? (aux[jornadaNumber - 1][matchIndex].home = e.target.value)
      : (aux[jornadaNumber - 1][matchIndex].away = e.target.value);

    aux[jornadaNumber - 1][matchIndex].matchId =
      aux[jornadaNumber - 1][matchIndex].home +
      "_" +
      aux[jornadaNumber - 1][matchIndex].away +
      "_" +
      new Date().getTime();

    setSeason(aux);
  };

  useEffect(() => {
    setMsgOK("");
    setMsg("");
   }, [round])
  

  const addSeason = (season) => {
    addRound1(season, round)
      .then((res) => setMsgOK(res))
      .catch((err) => console.log(err));
  };

  const handleSeason = () => {
    setMsg(checkJornadas(season));
    if (checkJornadas(season) === "Los datos son correctos"){
      addSeason(season)
    }
  };

  return (
    <div className="principalCreateJornada">
      {teamsList.length > 0 &&<div>
        {jornadaNumber != 0 ? (
          <h5>Partidos Jornada: {jornadaNumber}</h5>
        ) : (
          <h5>Selecciona jornada a editar</h5>
        )}
      </div>}
      <div className="matches">
        {teamsList.length > 0 ? teamsList?.map((elem, index) => {
          if (index + 1 <= teamsList.length / 2) {
            return (
              <div className="oneMatch">
                <div className="partido">
                  <p>{index + 1}.</p>
                </div>
                <div className="input">
                  {season?.length > 0 && (
                    <Form.Select
                      className="formSelect"
                      aria-label="Seleccionar equipo"
                      name="home"
                      value={season[jornadaNumber - 1][index]?.home}
                      onChange={(e) => handleJornada(index, "home", e)}
                    >
                      <option value="">Sel. equipo</option>
                      {teamsList.map((elem, index2) => {
                        return (
                          <option
                            key={index2}
                            className="options"
                            value={elem.id}
                          >
                            {elem.name}
                          </option>
                        );
                      })}
                    </Form.Select>
                  )}
                </div>
                <div className="vs">
                  <h6>VS</h6>
                </div>
                <div className="input">
                  {season?.length > 0 && (
                    <Form.Select
                      className="formSelect"
                      aria-label="Seleccionar equipo"
                      name="away"
                      value={season[jornadaNumber - 1][index]?.away}
                      onChange={(e) => handleJornada(index, "away", e)}
                    >
                      <option value="">Sel. equipo</option>
                      {teamsList.map((elem, index3) => {
                        return (
                          <option
                            key={index3}
                            className="options"
                            value={elem.id}
                          >
                            <p>{elem.name}</p>
                          </option>
                        );
                      })}
                    </Form.Select>
                  )}
                </div>
              </div>
            );
          }
        }) : <p style={{marginTop: "30px"}}>- Aún no ha finalizado la 1ª Ronda -</p>}
      </div>
      {teamsList.length > 0 &&<div className="addRound">
        <p>Pulsa "Crear ronda" cuando tengas editadas todas las jornadas.</p>
        <Button className="btnAddRound" onClick={handleSeason}>
          Crear ronda
        </Button>
      </div>}
      <h6 className="errorMsg">{msg}</h6>
      <h6 className="MsgOK">{msgOK}</h6>
    </div>
  );
};
