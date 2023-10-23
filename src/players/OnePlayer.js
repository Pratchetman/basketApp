import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DataFetch from "../hooks/DataFetch";
import "./oneplayer.scss";
import { AddNewPlayer } from "../forms/AddNewPlayer";
import { BasketmaniaContext } from "../context/BasketmaniaContext";
import { AddImage } from "../components/AddImage";
import filterPlayerStats from "../utils/filterPlayerStats";
import { Team } from "../components/Team";
export const OnePlayer = ({ setNav }) => {
  const { logged } = useContext(BasketmaniaContext);
  const edit = useParams().editor == "editor";
  const id = useParams().player_id;
  const { getOnePlayer, getPlayersStats } = DataFetch();
  const [onePlayer, setOnePlayer] = useState({});
  const [show, setShow] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [playerStats, setPlayerStats] = useState([]);

  useEffect(() => {
    getOnePlayer(id)
      .then((res) => {
        setOnePlayer(res.val());
        setNav(true);
        getPlayersStats(id)
          .then((res) => {
            setPlayerStats(res);
          })
          .catch(() => {});
      })
      .catch((err) => console.log(err));
  }, []);

  const calculatePp = (playerStats) =>{
    let totals = {
      points: 0,
      faults: 0,
      tlInt: 0,
      tlCon: 0
    }
    for (let i = 0; i < playerStats.length; i++){
      totals.points += playerStats[i].points;
      totals.faults += playerStats[i].faults;
      totals.tlInt += playerStats[i].tlInt;
      totals.tlCon += playerStats[i].tlCon;
    }
    return totals;
  }

  return (
    <>
      <div className="principalOnePlayer">
        <h1>
          {onePlayer.lastName}, {onePlayer.name}
          {logged && edit && (
            <img
              className="imgEdit"
              src="../../images/edit.png"
              alt=""
              onClick={() => setShow(!show)}
            />
          )}
        </h1>
        <hr />
        <div className="insidePrincipalOnePlayer">
          <div className="rowOnePlayer">
            <div className="allRows">
              <div className="rowData">
                <h6>Nombre: </h6>
                <p>{onePlayer.name}</p>
              </div>
              <div className="rowData">
                <h6>Apellidos: </h6>
                <p>{onePlayer.lastName}</p>
              </div>
              <div className="rowData">
                <h6>Dorsal: </h6>
                <p># {onePlayer.number}</p>
              </div>
              <div className="rowData">
                <h6>Fecha de nacimiento: </h6>
                <p>{onePlayer.bornDate}</p>
              </div>
              <div className="rowData">
                <h6>Altura: </h6>
                <p>{onePlayer.height}</p>
              </div>
              <div className="rowData">
                <h6>Posición: </h6>
                <p>{onePlayer.pos ? onePlayer.pos : "n/d"}</p>
              </div>
              <div className="rowData avg">
                <div><p>P.Jug.</p>{playerStats.length > 0 ? <h2>{playerStats.length}</h2> : <h2>-</h2>}</div>
                <div><p>P.Tot.</p>{playerStats.length > 0 ? <h2>{calculatePp(playerStats).points}</h2> : <h2>-</h2>}</div>
                <div><p>Media</p>{playerStats.length > 0 ? <h2>{calculatePp(playerStats).points / playerStats.length}</h2> : <h2>-</h2>}</div>
                <div><p>% TL</p>{calculatePp(playerStats).tlInt > 0 ? <h2>{((calculatePp(playerStats).tlCon / calculatePp(playerStats).tlInt) * 100).toFixed(0)}%</h2> : <h2>-</h2>}</div>
              </div>
            </div>
            <div className="imgPlayer" onClick={() => setShowImage(!showImage)}>
              {onePlayer.image ? (
                <img src={`${onePlayer.image}`} />
              ) : (
                <img src="/images/silueta.png" />
              )}
            </div>
          </div>
          <hr className="marginHr" />
          <div className="stats">
            <h5>Liga 2023-2024</h5>
            {playerStats.length > 0 ? (
              playerStats.map((elem, index) => {
                return (
                  <div className="oneMatch">
                    <div className="oneMatchDiv">
                      <div className="match">
                        <p>
                          # VS <Team teamId={elem.vs} />
                        </p>
                      </div>
                      <div className="oneMatchData">
                        <p>
                          Pts: <span>{elem.points}</span>
                        </p>
                        <p>
                          Falt: <span>{elem.faults}</span>
                        </p>
                        <p>
                          TL int.: <span>{elem.tlInt}</span>
                        </p>
                        <p>
                          TL con.: <span>{elem.tlCon}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>- Este jugador aún no tiene partidos jugados -</p>
            )}
          </div>
        </div>
      </div>
      {show && (
        <AddNewPlayer
          show={show}
          setShow={setShow}
          onePlayer={onePlayer}
          setOnePlayer={setOnePlayer}
        />
      )}
      {showImage && logged && (
        <AddImage
          show={showImage}
          setShow={setShowImage}
          onePlayer={onePlayer}
          setOnePlayer={setOnePlayer}
        />
      )}
    </>
  );
};
