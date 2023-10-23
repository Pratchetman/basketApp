const calculateRanking = (schedule, teams) => {

  for (let i = 0; i < schedule.length; i++) {
    for (let j = 0; j < schedule[i].length; j++) {
      if (i == 0) {
        schedule[i][j].pointsHome !== ""
          ? (teams[schedule[i][j].home].points = parseInt(
              schedule[i][j].pointsHome
            ))
          : (teams[schedule[i][j].home].points = 0);
        schedule[i][j].pointsAway !== ""
          ? (teams[schedule[i][j].home].pointsAgainst = parseInt(
              schedule[i][j].pointsAway
            ))
          : (teams[schedule[i][j].home].pointsAgainst = 0);
        schedule[i][j].pointsAway !== ""
          ? (teams[schedule[i][j].away].points = parseInt(
              schedule[i][j].pointsAway
            ))
          : (teams[schedule[i][j].away].points = 0);
        schedule[i][j].pointsHome !== ""
          ? (teams[schedule[i][j].away].pointsAgainst = parseInt(
              schedule[i][j].pointsHome
            ))
          : (teams[schedule[i][j].away].pointsAgainst = 0);
        parseInt(schedule[i][j].pointsHome) >
        parseInt(schedule[i][j].pointsAway)
          ? (teams[schedule[i][j].home].leaguePoints = 2)
          : schedule[i][j].pointsHome === schedule[i][j].pointsAway
          ? (teams[schedule[i][j].home].leaguePoints = 0)
          : (teams[schedule[i][j].home].leaguePoints = 1);
        parseInt(schedule[i][j].pointsHome) <
        parseInt(schedule[i][j].pointsAway)
          ? (teams[schedule[i][j].away].leaguePoints = 2)
          : schedule[i][j].pointsHome === schedule[i][j].pointsAway
          ? (teams[schedule[i][j].away].leaguePoints = 0)
          : (teams[schedule[i][j].away].leaguePoints = 1);
        parseInt(schedule[i][j].pointsHome) >
        parseInt(schedule[i][j].pointsAway)
          ? (teams[schedule[i][j].home].pg = 1)
          : schedule[i][j].pointsHome === schedule[i][j].pointsAway
          ? (teams[schedule[i][j].home].pg = 0)
          : (teams[schedule[i][j].home].pg = 0);
        parseInt(schedule[i][j].pointsHome) <
        parseInt(schedule[i][j].pointsAway)
          ? (teams[schedule[i][j].away].pg = 1)
          : schedule[i][j].pointsHome === schedule[i][j].pointsAway
          ? (teams[schedule[i][j].away].pg = 0)
          : (teams[schedule[i][j].away].pg = 0);
        parseInt(schedule[i][j].pointsHome) >
        parseInt(schedule[i][j].pointsAway)
          ? (teams[schedule[i][j].home].pp = 0)
          : schedule[i][j].pointsHome === schedule[i][j].pointsAway
          ? (teams[schedule[i][j].home].pp = 0)
          : (teams[schedule[i][j].home].pp = 1);
        parseInt(schedule[i][j].pointsHome) <
        parseInt(schedule[i][j].pointsAway)
          ? (teams[schedule[i][j].away].pp = 0)
          : schedule[i][j].pointsHome === schedule[i][j].pointsAway
          ? (teams[schedule[i][j].away].pp = 0)
          : (teams[schedule[i][j].away].pp = 1);
        schedule[i][j].pointsHome !== "" && schedule[i][j].pointsAway !== ""
          ? (teams[schedule[i][j].home].pj = 1)
          : (teams[schedule[i][j].home].pj = 0);
        schedule[i][j].pointsHome !== "" && schedule[i][j].pointsAway !== ""
          ? (teams[schedule[i][j].away].pj = 1)
          : (teams[schedule[i][j].away].pj = 0);

        if (j == schedule[i].length - 1) {
          for (let oneTeam of Object.values(teams)) {
            if (isNaN(oneTeam.pj)) {
              teams[oneTeam.id].leaguePoints = 0;
              teams[oneTeam.id].pj = 0;
              teams[oneTeam.id].pg = 0;
              teams[oneTeam.id].points = 0;
              teams[oneTeam.id].pointsAgainst = 0;
              teams[oneTeam.id].pp = 0;
            }
          }
        }
      } else {
        if (
          schedule[i][j].pointsHome !== "" &&
          schedule[i][j].pointsAway !== ""
        ) {
          teams[schedule[i][j].home].points += parseInt(
            schedule[i][j].pointsHome
          );
          teams[schedule[i][j].away].points += parseInt(
            schedule[i][j].pointsAway
          );
          teams[schedule[i][j].home].pointsAgainst += parseInt(
            schedule[i][j].pointsAway
          );
          teams[schedule[i][j].away].pointsAgainst += parseInt(
            schedule[i][j].pointsHome
          );
          parseInt(schedule[i][j].pointsHome) >
          parseInt(schedule[i][j].pointsAway)
            ? (teams[schedule[i][j].home].leaguePoints += 2)
            : schedule[i][j].pointsHome === schedule[i][j].pointsAway
            ? (teams[schedule[i][j].home].leaguePoints += 0)
            : (teams[schedule[i][j].home].leaguePoints += 1);
          parseInt(schedule[i][j].pointsHome) <
          parseInt(schedule[i][j].pointsAway)
            ? (teams[schedule[i][j].away].leaguePoints += 2)
            : schedule[i][j].pointsHome === schedule[i][j].pointsAway
            ? (teams[schedule[i][j].away].leaguePoints += 0)
            : (teams[schedule[i][j].away].leaguePoints += 1);
          schedule[i][j].pointsHome !== "" && schedule[i][j].pointsAway !== ""
            ? (teams[schedule[i][j].home].pj += 1)
            : (teams[schedule[i][j].home].pj += 0);
          schedule[i][j].pointsHome !== "" && schedule[i][j].pointsAway !== ""
            ? (teams[schedule[i][j].away].pj += 1)
            : (teams[schedule[i][j].away].pj += 0);
          parseInt(schedule[i][j].pointsHome) >
          parseInt(schedule[i][j].pointsAway)
            ? (teams[schedule[i][j].home].pg += 1)
            : (teams[schedule[i][j].home].pg += 0);
          parseInt(schedule[i][j].pointsHome) <
          parseInt(schedule[i][j].pointsAway)
            ? (teams[schedule[i][j].away].pg += 1)
            : (teams[schedule[i][j].away].pg += 0);
          parseInt(schedule[i][j].pointsHome) >
          parseInt(schedule[i][j].pointsAway)
            ? (teams[schedule[i][j].home].pp += 0)
            : schedule[i][j].pointsHome === schedule[i][j].pointsAway
            ? (teams[schedule[i][j].home].pp += 0)
            : (teams[schedule[i][j].home].pp += 1);
          parseInt(schedule[i][j].pointsHome) <
          parseInt(schedule[i][j].pointsAway)
            ? (teams[schedule[i][j].away].pp += 0)
            : schedule[i][j].pointsHome == schedule[i][j].pointsAway
            ? (teams[schedule[i][j].away].pp += 0)
            : (teams[schedule[i][j].away].pp += 1);
        }
      }
    }
  }

  return Object.values(teams).sort((a, b) => {
    let res = b.leaguePoints - a.leaguePoints;
    if (b.leaguePoints === a.leaguePoints) {
      res = b.points - b.pointsAgainst - (a.points - a.pointsAgainst);
    }
    return res;
  });
};
export default calculateRanking;
