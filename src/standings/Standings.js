import React, { useEffect, useState } from "react";
import DataFetch from "../hooks/DataFetch";
import calculateRanking from "../utils/calculateRanking";
import "./standings.scss";
import { Button, Form, FormSelect, Table } from "react-bootstrap";
export const Standings = ({ setNav }) => {
  const [ranking, setRanking] = useState([]);
  const [group, setGroup] = useState("teams");
  const [round, setRound] = useState("round1");
  const [error, setError] = useState("");
  const { getShedule } = DataFetch();
  const { getTeams } = DataFetch();
  console.log(round);

  useEffect(() => {
    setNav(true);
    let teams = [];
    getTeams(group).then((res) => {
      teams = res.val();
      getShedule(round)
        .then((response) => {
          console.log("schedule",response.val())
          setRanking(calculateRanking(response.val(), teams));})
        .catch((err) => {
          console.log(err);
          setRanking([]);
          setError("-Ronda no disponible-");
        });
    });
  }, [round, group]);

  console.log("ranking", ranking);
  console.log(round);

  const handleSelect = (e) => {
    setRound(e.target.value);
    if (e.target.value == "round1") {
      setGroup("teams");
    } else {
      setGroup("teams_groupA");
    }
    
  };

  return (
    <div className="rankingPrincipal">
      <div className="insideRankingPrincipal">
        <h1>Clasificación</h1>
        <Form.Select
          onChange={(e) => handleSelect(e)}
          aria-label="selector ronda"
        >
          
          <option value="round1">1ª Ronda</option>
          <option value="round_groupA">2ª Ronda</option>
          {/* <option value="round3">Play Offs</option> */}
        </Form.Select>
        {(round == "round_groupA" || round == "round_groupB") && (
          <div className="groupsBut">
            <Button
              className={group === "teams_groupA" ? "group selected" : "group"}
              onClick={() => {
                setGroup("teams_groupA");
                setRound("round_groupA");
              }}
            >
              Grupo A
            </Button>
            <Button
              className={group === "teams_groupB" ? "group selected" : "group"}
              onClick={() => {
                setGroup("teams_groupB");
                setRound("round_groupB");
              }}
            >
              Grupo B
            </Button>
          </div>
        )}
        <Table striped bordered hover variant="dark" className="tableRanking">
          <thead>
            <tr>
              <th className="pos">#</th>
              <th className="pos">Equipo</th>
              <th className="pos">Pts</th>
              <th className="pos">PJ</th>
              <th className="pos">PG</th>
              <th className="pos">PP</th>
              <th className="noMobile pos">PF</th>
              <th className="noMobile pos">PC</th>
              <th className="pos">Dif</th>
            </tr>
          </thead>
          <tbody>
            {ranking.length > 0 ? (
              ranking.map((elem, index) => {
                return (
                  <tr key={index} className="positionTeam">
                    <td className="pos">{index + 1}</td>
                    <td className="name">
                      <p>{elem.name}</p>
                    </td>
                    <td>{elem.leaguePoints}</td>
                    <td>{elem.pj}</td>
                    <td>{elem.pg}</td>
                    <td>{elem.pp}</td>
                    <td className="noMobile">{elem.points}</td>
                    <td className="noMobile">{elem.pointsAgainst}</td>
                    <td>{elem.points - elem.pointsAgainst}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={9}>
                  <h6>{error}</h6>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};
