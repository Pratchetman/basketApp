import React, { useContext } from "react";
import { app } from "../utils/firebaseConfig";
import { child, get, getDatabase, ref, remove, set } from "firebase/database";
import { BasketmaniaContext } from "../context/BasketmaniaContext";
import calculateRanking from "../utils/calculateRanking";
import lastschedule from "../utils/faseFinalShedule";
import filterPlayerStats from "../utils/filterPlayerStats";

const DataFetch = () => {
  const context = useContext(BasketmaniaContext);
  const id = context.team + "_" + new Date().getTime();

  const addPlayer = (newPlayer) => {
    let dbs = getDatabase();
    return new Promise((resolve, reject) => {
      set(ref(dbs, "players/" + newPlayer.id), newPlayer)
        .then(() =>
          resolve(
            newPlayer.name +
              ", " +
              newPlayer.lastName +
              " #" +
              newPlayer.number +
              " Actualizado correctamente "
          )
        )
        .catch((error) => reject(error));
    });
  };
  const deletePlayer = (id) => {
    const dbs = getDatabase();

    return new Promise((resolve, reject) => {
      remove(ref(dbs, "players/" + id))
        .then(() => resolve("Jugador eliminado correctamente"))
        .catch((error) => reject(error));
    });
  };
  const addStats = (matchEdit) => {
    let dbs = getDatabase();

    return new Promise((resolve, reject) => {
      set(ref(dbs, "matches/" + matchEdit.matchId), matchEdit)
        .then(() => resolve("Estadísticas guardadas"))
        .catch((error) => reject(error));
    });
  };

  const addRound1 = (round1, round) => {
    let dbs = getDatabase();
    if (round == "teams") {
      round = "round1";
    } else if (round == "teams_groupA") {
      round = "round_groupA";
    } else if (round == "teams_groupB") {
      round = "round_groupB";
    }
    return new Promise((resolve, reject) => {
      set(ref(dbs, `${round}/`), round1)
        .then(() => resolve("Ronda creada correctamente"))
        .catch((error) => reject(error));
    });
  };

  const finishRound = (round) => {
    console.log(round);
    let dbs = getDatabase();
    const teams = getTeams("teams");

    return new Promise((resolve, reject) => {
      teams.then((res) => {
        let teamsList = res.val();

        let groupA = calculateRanking(round, teamsList).slice(0, 7);
        let groupB = calculateRanking(round, teamsList).slice(7);

        let objectA = {};
        let objectB = {};

        for (let i = 0; i < groupA.length; i++) {
          objectA[groupA[i].id] = {
            id: groupA[i].id,
            name: groupA[i].name,
            leaguePoints: 0,
          };
        }
        for (let i = 0; i < groupB.length; i++) {
          objectB[groupB[i].id] = {
            id: groupB[i].id,
            name: groupB[i].name,
            leaguePoints: 0,
          };
        }

        set(ref(dbs, "teams_groupA/"), objectA)
          .then(() => {
            set(ref(dbs, "teams_groupB/"), objectB)
              .then(() => resolve("Grupos A y B creados correctamente"))
              .catch((err) => reject(err));
          })
          .catch((error) => reject(error));
      });
    });
  };

  const finishSecondRound = (grupoAsched, grupoBsched) => {
    let dbs = getDatabase();
    let faseFinalTeams = [];

    const teamsA = getTeams("teams_groupA");
    const teamsB = getTeams("teams_groupB");

    return new Promise((resolve, reject) => {
      teamsA.then((resA) => {
        faseFinalTeams = calculateRanking(grupoAsched, resA.val());
        teamsB.then((resB) => {
          faseFinalTeams = faseFinalTeams.concat(
            calculateRanking(grupoBsched, resB.val()).slice(0, 3)
          );
          console.log(faseFinalTeams);
          let finalphase = lastschedule(faseFinalTeams);
          let object = {};

          for (let i = 0; i < faseFinalTeams.length; i++) {
            object[faseFinalTeams[i].id] = {
              id: faseFinalTeams[i].id,
              name: faseFinalTeams[i].name,
              position: i + 1,
            };
          }
          set(ref(dbs, "faseFinalTeams/"), object)
            .then(() => {
              set(ref(dbs, "rondaFinal/"), finalphase).then(() => {
                resolve("Fase Final Creada Correctamente");
              });
            })
            .catch((error) => reject(error));
        });
      });
    });
  };

  const getPlayers = () => {
    let dbRef = ref(getDatabase());

    return new Promise((resolve, reject) => {
      get(child(dbRef, "players/"))
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  };

  const getPlayersStats = (id) => {
    let dbRef = ref(getDatabase());

    return new Promise((resolve, reject) => {
      get(child(dbRef, "matches/"))
        .then((data) => resolve(filterPlayerStats(data, id)))
        .catch((error) => reject(error));
    });
  };

  const getOneMatch = (matchId) => {
    let dbRef = ref(getDatabase());

    return new Promise((resolve, reject) => {
      get(child(dbRef, `matches/${matchId}`))
        .then((data) => resolve(data))
        .catch(() => reject("No hay estadísticas de este partido"));
    });
  };

  const getTeams = (round) => {
    let dbRef = ref(getDatabase());

    return new Promise((resolve, reject) => {
      get(child(dbRef, `${round}/`))
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  };

  const getOnePlayer = (id) => {
    let dbRef = ref(getDatabase());

    return new Promise((resolve, reject) => {
      get(child(dbRef, `players/${id}`))
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  };

  const getShedule = (round) => {
    let dbRef = ref(getDatabase());

    return new Promise((resolve, reject) => {
      get(child(dbRef, `${round}/`))
        .then((data) => resolve(data))
        .catch((error) => {
          console.log(error);
          reject("Aún no se ha creado el calendario");
        });
    });
  };

  const teamToName = (teamId) => {
    let dbRef = ref(getDatabase());

    return new Promise((resolve, reject) => {
      get(child(dbRef, `teams/${teamId}`))
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  };

  return {
    addPlayer,
    getPlayers,
    getOnePlayer,
    getTeams,
    addRound1,
    getShedule,
    teamToName,
    finishRound,
    finishSecondRound,
    addStats,
    getOneMatch,
    deletePlayer,
    getPlayersStats
  };
};

export default DataFetch;
