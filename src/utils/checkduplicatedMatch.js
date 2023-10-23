const checkDuplicatdSelectedMatch = (season, match) => {
    let matches = 0;
    let res = false;
    for (let i = 0; i < season.length; i++) {
      for (let j = 0; j < season[i].length; j++) {
        if (
          match.includes(season[i][j].home) &&
          match.includes(season[i][j].away)
        ) {
          matches += 1;
        }
      }
    }
    matches > 1 ? (res = false) : (res = true);

    return res;
  };

const checkDuplicatedMatch = (season) => {
    let res = true;
    let teams = [];
    for (let i = 0; i < season.length; i++) {
      for (let j = 0; j < season[i].length; j++) {
        teams = [season[i][j].home, season[i][j].away];
        if (!checkDuplicatdSelectedMatch(season, teams)) {
          res = false;
        }
      }
    }
    return res;
  };

export default checkDuplicatedMatch;