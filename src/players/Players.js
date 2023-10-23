import React, { useEffect, useState } from "react";
import "./players.scss";
import DataFetch from "../hooks/DataFetch";
import { useNavigate, useParams } from "react-router-dom";
import { AddNewPlayer } from "../forms/AddNewPlayer";




export const Players = ({ setNav }) => {
  const edit = useParams().edit == "edit";
  const { getPlayers } = DataFetch();
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
 

  console.log(players);
  useEffect(() => {
    getPlayers()
      .then((res) => {
        setPlayers(Object.values(res.val()));
      })
      .catch((error) => console.log(error));
    setNav(true);
  }, []);

  const addNewPlayer = () => {
    setShow(!show);
  };

  const handleNavigate = (elem) => {
    !edit
      ? navigate(`/players/${elem.id}`)
      : navigate(`/players/${elem.id}/editor`);
  };

  return (
    <div className="principalPlayers">
      <h1>Jugadores</h1>
      <hr />
      <div className="insidePrincipalPlayers">
        {edit && (
          <div className="addPlayer" onClick={addNewPlayer}>
            <img src="/images/plus.png" alt="" />
          </div>
        )}
        {players.length > 0 ? players
          .sort((a, b) => a.number - b.number)
          .map((elem, index) => {
            return (
              <div
                className="onePlayer"
                key={index}
                onClick={() => handleNavigate(elem)}
              >
                <div className="onePlayerDiv">
                  <div className="number">
                    <p>
                      # <span>{elem.number}</span>
                    </p>
                  </div>
                  <p>
                    {elem.lastName}, {elem.name}{elem.coach && " 🏀"}
                  </p>
                </div>
                <div className="height">
                  <p>{elem.height} cms <p className="noMobile">- {elem.pos}</p></p>
                  <p className="noMobile">{elem.bornDate}</p><p className="siMobile">{elem.pos}</p>
                </div>
              </div>
            );
          }): <p>No existen jugadores registrados</p>}
      </div>
      {show && (
        <AddNewPlayer
          show={show}
          setShow={setShow}
          players={players}
          setPlayers={setPlayers}
        />
      )}
    </div>
  );
};
