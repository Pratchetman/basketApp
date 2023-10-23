import React, { useEffect, useState } from "react";
import { Jornadas } from "../components/Jornadas";
import { CreateJornada } from "../components/CreateJornada";
import DataFetch from "../hooks/DataFetch";
import "./addNewJornada.scss";
import { Button, Form } from "react-bootstrap";

const matchDefault = {
  matchId: "",
  home: "",
  away: "",
  pointsHome: "",
  pointsAway: "",
};

export const AddNewJornada = ({ setNav }) => {
  const [jornadasList, setJornadasList] = useState([]);
  const [season, setSeason] = useState([]);
  const [jornadaNumber, setJornadaNumber] = useState(1);
  const [teamsList, setTeamList] = useState([]);
  const [round, setRound] = useState("teams");
  const [group, setGroup] = useState("grupoA");
  const { getTeams } = DataFetch();
  console.log("lista jornadas",jornadasList);
  useEffect(() => {
    setNav(true);
    getTeams(round)
      .then((res) => {
        res.val() ?
        setTeamList(Object.values(res.val())) : setTeamList([])
      })
      .catch((err) => console.log(err));
  }, [round]);

  const handleSelect = (e) => {
    setJornadaNumber(1)
    setRound(e.target.value);
  };

  useEffect(() => {
    const seasonDefault = [];
    let oneJornadaDefault = [];
    for (let i = 0; i < Math.floor(teamsList.length / 2); i++) {
      oneJornadaDefault.push(matchDefault);
    }
    if (teamsList.length % 2 == 0){
      for (let i = 1; i < teamsList.length; i++) {
        seasonDefault.push(oneJornadaDefault);
      }
    }else{
      for (let i = 1; i < teamsList.length + 1; i++) {
        seasonDefault.push(oneJornadaDefault);
      }
    }
   
    setSeason(seasonDefault);
  }, [teamsList, round]);

  return (
    <div className="principalAddNewJornada">
      <Form.Select
        className="roundSelect"
        onChange={(e) => handleSelect(e)}
        aria-label="selector ronda"
      >
        {/* <option>Selecciona ronda</option> */}
        <option value="teams">1ª Ronda</option>
        <option value="teams_groupA">2ª Ronda</option>
      </Form.Select>
      {(round == "teams_groupA" || round == "teams_groupB") && (
        <div className="groupsBut">
          <Button
            className={group === "grupoA" ? "group selected" : "group"}
            onClick={() => {
              setGroup("grupoA");
              setRound("teams_groupA");
            }}
          >
            Grupo A
          </Button>
          <Button
            className={group === "grupoB" ? "group selected" : "group"}
            onClick={() => {
              setGroup("grupoB");
              setRound("teams_groupB");
            }}
          >
            Grupo B
          </Button>
        </div>
      )}
      <div className="insidePrincipalAddJornada">
        <Jornadas
          jornadasList={jornadasList}
          setJornadasList={setJornadasList}
          teamsList={teamsList}
          jornadaNumber={jornadaNumber}
          setJornadaNumber={setJornadaNumber}
        />
       {season && <CreateJornada
          jornadasList={jornadasList}
          setJornadasList={setJornadasList}
          teamsList={teamsList}
          season={season}
          setSeason={setSeason}
          round={round}
          jornadaNumber={jornadaNumber}
        />}
      </div>
    </div>
  );
};
