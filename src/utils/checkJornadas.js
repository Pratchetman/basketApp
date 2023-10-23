import checkDuplicatedMatch from "./checkduplicatedMatch";

const checkDuplicated = (jornada) => {
    let res = true;
    let teams = [];
    for (let i = 0; i < jornada.length; i++) {
      if (teams.includes(jornada[i].home) || teams.includes(jornada[i].away)) {
        res = false;
        i = jornada.length;
      } else {
        teams.push(jornada[i].home);
        teams.push(jornada[i].away);
      }
    }
    return res;
  };



  const checkJornadas = (season) => {
    let res = true;
    let msg = ""
    for (let i = 0; i < season.length; i++) {
      if (res === true) {
        for (let j = 0; j < season[i].length; j++) {
          if (
            season[i][j].home === season[i][j].away &&
            season[i][j].home !== "" &&
            season[i][j].away !== ""
          ) {
            res = false;
            msg =
              "Error en jornada" +
                " " +
                (i + 1) +
                ": Un equipo no puede jugar contra sí mismo"
            ;
          } else if (season[i][j].home === "" || season[i][j].away === "") {
            res = false;
            msg = 
              "Error en jornada" +
                " " +
                (i + 1) +
                ": Comprueba que has introducido todos los equipos"
            ;
          } else if (!checkDuplicated(season[i])) {
            res = false;
            msg = 
              "Error en jornada" +
                " " +
                (i + 1) +
                ": Algún equipo juega mas de un partido"
            ;
          }
        }
      }
    }
    if (res) {
      checkDuplicatedMatch(season)
        ? msg = "Los datos son correctos" 
        : msg =
            "Error: Se ha detectado un partido duplicado en diferentes jornadas"
          ;
    }

    return msg;
  };

  export default checkJornadas;