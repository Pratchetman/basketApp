const filterPlayerStats = (data, playerid) => {
  let matchList = Object.values(data.val());
  let filteredMatches = [];
  
  for (let i = 0; i < matchList.length; i++) {
    for (let j = 0; j < matchList[i].players.length; j++) {
      if (
        matchList[i].players[j].conv == true &&
        matchList[i].players[j].id == playerid
      ) {
        filteredMatches.push({
          vs: matchList[i].home != "bskmn" ? matchList[i].home : matchList[i].away,
          matchId: matchList[i].matchId,
          points: matchList[i].players[j].points,
          faults: matchList[i].players[j].faults,
          tlInt: matchList[i].players[j].tlInt,
          tlCon: matchList[i].players[j].tlCon,
        });
      }
    }
  }
 return filteredMatches;
};
export default filterPlayerStats;
