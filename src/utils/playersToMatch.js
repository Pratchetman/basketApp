const playersToMatch = (playersArray) => {
  let players = [];

  for (let i = 0; i < playersArray.length; i++) {
    players.push({
      id: playersArray[i].id,
      name: playersArray[i].name,
      lastName: playersArray[i].lastName,
      conv: false,
      number: playersArray[i].number,
      points: "",
      faults: "",
      tlInt: "",
      tlCon: "",
    });
  }

  return players;
};
export default playersToMatch;
