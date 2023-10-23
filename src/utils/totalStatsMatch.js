const totalStatsMatch = (oneMatchPlayers) => {
  let stats = {
    points: 0,
    faults: 0,
    tlint: 0,
    tlcon: 0,
  };
  for (let i = 0; i < oneMatchPlayers.length; i++) {
    if (oneMatchPlayers[i].conv == true) {
      stats.points += isNaN(oneMatchPlayers[i].points) || oneMatchPlayers[i].points == "" ? 0 : oneMatchPlayers[i].points;
      stats.faults += isNaN(oneMatchPlayers[i].faults) || oneMatchPlayers[i].faults == "" ? 0 : oneMatchPlayers[i].faults;
      stats.tlint += isNaN(oneMatchPlayers[i].tlInt) || oneMatchPlayers[i].tlInt == "" ? 0 : oneMatchPlayers[i].tlInt;
      stats.tlcon += isNaN(oneMatchPlayers[i].tlCon) || oneMatchPlayers[i].tlCon == "" ? 0 : oneMatchPlayers[i].tlCon;
    
    }
  }
  return stats;
};
export default totalStatsMatch;
