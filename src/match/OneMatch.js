import React, { useContext, useEffect } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Team } from "../components/Team";
import DataFetch from "../hooks/DataFetch";

import "./oneMatch.scss";
import { useState } from "react";
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";
import playersToMatch from "../utils/playersToMatch";
import totalStatsMatch from "../utils/totalStatsMatch";
import { BasketmaniaContext } from "../context/BasketmaniaContext";

export const OneMatch = ({ show, setShow, oneMatch, edit }) => {
  const matchDefault = {
    matchId: oneMatch.matchId,
    home: oneMatch.home,
    pointsHome: oneMatch.pointsHome,
    away: oneMatch.away,
    pointsAway: oneMatch.pointsAway,
    players: [],
  };
  const { logged } = useContext(BasketmaniaContext);
  const [players, setPlayers] = useState();
  const [msg, setMsg] = useState("");
  const [oneMatchEdit, setOneMatchEdit] = useState(matchDefault);
  const { getPlayers, addStats, getOneMatch } = DataFetch();
  const handleClose = () => {
    setMsg("");
    setShow(false);
  };
  console.log("edit", edit);
  console.log(oneMatchEdit);
  const handleChange = (e, index) => {
    const { name, value, checked } = e.target;
    setMsg("");
    setOneMatchEdit((prevOneMatchEdit) => {
      const updatedPlayers = [...prevOneMatchEdit.players];
      if (name === "conv") {
        updatedPlayers[index] = {
          ...updatedPlayers[index],
          [name]: checked,
        };
      } else {
        updatedPlayers[index] = {
          ...updatedPlayers[index],
          [name]: !value ? "" : parseInt(value),
        };
      }

      return {
        ...prevOneMatchEdit,
        players: updatedPlayers,
      };
    });
  };

  const handleSubmit = () => {
    addStats(oneMatchEdit)
      .then((res) => {
        setMsg(res);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (edit) {
      getOneMatch(oneMatch.matchId)
        .then((res) => {
          setOneMatchEdit({
            ...oneMatchEdit,
            players: Object.values(res.val().players),
          });
        })
        .catch(() => {
          getPlayers().then((res) => {
            setPlayers(Object.values(res.val()));
            setOneMatchEdit({
              ...oneMatchEdit,
              players: playersToMatch(Object.values(res.val())),
            });
          });
        });
    } else {
      getOneMatch(oneMatch.matchId)
        .then((res) => {
          setOneMatchEdit({
            ...oneMatchEdit,
            players: Object.values(res.val().players),
          });
        })
        .catch((error) => {
          console.log(error);
          setMsg("No hay estadísticas que mostrar.");
        });
    }
  }, []);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      dialogClassName="compl_Modal"
      size="lg"
    >
      {oneMatch && (
        <Modal.Header className="headerModal">
          <img
            className="logoModal"
            src="../images/BasketmaniaWhite2.png"
            alt=""
          />
          <Modal.Title className="title">
            <Team teamId={oneMatch.home} /> <span>VS</span>{" "}
            <Team teamId={oneMatch.away} />
          </Modal.Title>
        </Modal.Header>
      )}
      <Modal.Body>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Conv.</th>
              <th>Nombre</th>
              <th>Pts</th>
              <th>Fal.</th>
              <th>
                TL <span>i.</span>
              </th>
              <th>
                TL <span>c.</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {oneMatchEdit.players &&
              oneMatchEdit.players.length > 0 &&
              oneMatchEdit.players.map((elem, index) => {
                return (
                  <tr key={index}>
                    <td>{elem.number}</td>
                    <td>
                      <FormCheckInput
                        name={"conv"}
                        onChange={(e) => handleChange(e, index)}
                        checked={oneMatchEdit.players[index].conv}
                        disabled={!edit}
                      />
                    </td>
                    <td>
                      <p>
                        {elem.name} <span className="simobile">{elem.lastName[0]}.</span>
                        <span className="nomobile">, {elem.lastName}</span>
                      </p>
                    </td>
                    <td>
                      {elem.conv && edit ? (
                        <input
                          type="number"
                          min={0}
                          className="points"
                          onChange={(e) => handleChange(e, index)}
                          name={"points"}
                          value={oneMatchEdit.players[index].points}
                        />
                      ) : (
                        <h6>{oneMatchEdit.players[index].conv ? oneMatchEdit.players[index].points : ""}</h6>
                      )}
                    </td>
                    <td>
                      {elem.conv && edit ? (
                        <input
                          type="number"
                          min={0}
                          max={6}
                          className="points"
                          onChange={(e) => handleChange(e, index)}
                          name={"faults"}
                          value={oneMatchEdit.players[index].faults}
                        />
                      ) : (
                        <h6>{oneMatchEdit.players[index].conv ? oneMatchEdit.players[index].faults : ""}</h6>
                      )}
                    </td>
                    <td>
                      {elem.conv && edit ? (
                        <input
                          type="number"
                          min={0}
                          className="points"
                          onChange={(e) => handleChange(e, index)}
                          name={"tlInt"}
                          value={oneMatchEdit.players[index].tlInt}
                        />
                      ) : (
                        <h6>{oneMatchEdit.players[index].conv ? oneMatchEdit.players[index].tlInt : ""}</h6>
                      )}
                    </td>
                    <td>
                      {elem.conv && edit ? (
                        <input
                          type="number"
                          min={0}
                          className="points"
                          onChange={(e) => handleChange(e, index)}
                          name={"tlCon"}
                          value={oneMatchEdit.players[index].tlCon}
                        />
                      ) : (
                        <h6>{oneMatchEdit.players[index].conv ? oneMatchEdit.players[index].tlCon : ""}</h6>
                      )}
                    </td>
                  </tr>
                );
              })}
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td><h6 className="total">{totalStatsMatch(oneMatchEdit.players).points}</h6></td>
              <td><h6 className="total">{totalStatsMatch(oneMatchEdit.players).faults}</h6></td>
              <td><h6 className="total">{totalStatsMatch(oneMatchEdit.players).tlint}</h6></td>
              <td><h6 className="total">{totalStatsMatch(oneMatchEdit.players).tlcon}</h6></td>
            </tr>
          </tbody>
        </Table>
        <p>{msg}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        {(logged && edit) && <Button onClick={handleSubmit}>Guardar</Button>}
      </Modal.Footer>
    </Modal>
  );
};
