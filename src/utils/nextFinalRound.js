const nextFinalRound = (schedule) => {
  console.log("en next final round", schedule);
  // Ronda previa
  if (
    parseInt(schedule[0][0].pointsAway) > parseInt(schedule[0][0].pointsHome) &&
    schedule[0][0].pointsHome != ""
  ) {
    schedule[1][0].away = schedule[0][0].away;
    schedule[2][0].away = schedule[0][0].away;
  } else {
    if(schedule[0][0].pointsAway != "" && schedule[0][0].pointsHome != ""){
      schedule[1][0].away = schedule[0][0].home;
      schedule[2][0].away = schedule[0][0].home;
    }else{
      schedule[1][0].away = "";
      schedule[2][0].away = "";
    }
   
  }
  if (
    parseInt(schedule[0][1].pointsAway) > parseInt(schedule[0][1].pointsHome) &&
    schedule[0][1].pointsHome != ""
  ) {
    schedule[1][3].away = schedule[0][1].away;
    schedule[2][3].away = schedule[0][1].away;
  } else {
    if(schedule[0][1].pointsAway != "" && schedule[0][1].pointsHome != ""){
      schedule[1][3].away = schedule[0][1].home;
      schedule[2][3].away = schedule[0][1].home;
    }else{
      schedule[1][3].away = "";
      schedule[2][3].away = "";
    }
  
  }
  // cuartos de final //
  if (
    parseInt(schedule[1][0].pointsAway) + parseInt(schedule[2][0].pointsAway) >
      parseInt(schedule[1][0].pointsHome) +
        parseInt(schedule[2][0].pointsHome) &&
    schedule[1][0].pointsAway != ""
  ) {
    schedule[3][0].home = schedule[1][0].away;
    schedule[4][0].home = schedule[1][0].away;
  } else {
    schedule[3][0].home = schedule[1][0].home;
    schedule[4][0].home = schedule[1][0].home;
  }
  if (
    parseInt(schedule[1][1].pointsAway) + parseInt(schedule[2][1].pointsAway) >
      parseInt(schedule[1][1].pointsHome) +
        parseInt(schedule[2][1].pointsHome) &&
    schedule[1][1].pointsAway != ""
  ) {
    schedule[3][0].away = schedule[1][1].away;
    schedule[4][0].away = schedule[1][1].away;
  } else {
    schedule[3][0].away = schedule[1][1].home;
    schedule[4][0].away = schedule[1][1].home;
  }
  if (
    parseInt(schedule[1][2].pointsAway) + parseInt(schedule[2][2].pointsAway) >
      parseInt(schedule[1][2].pointsHome) +
        parseInt(schedule[2][2].pointsHome) &&
    schedule[1][2].pointsAway != ""
  ) {
    schedule[3][1].home = schedule[1][2].away;
    schedule[4][1].home = schedule[1][2].away;
  } else {
    schedule[3][1].home = schedule[1][2].home;
    schedule[4][1].home = schedule[1][2].home;
  }
  if (
    parseInt(schedule[1][3].pointsAway) + parseInt(schedule[2][3].pointsAway) >
      parseInt(schedule[1][3].pointsHome) +
        parseInt(schedule[2][3].pointsHome) &&
    schedule[1][3] != ""
  ) {
    schedule[3][1].away = schedule[1][3].away;
    schedule[4][1].away = schedule[1][3].away;
  } else {
    schedule[3][1].away = schedule[1][3].home;
    schedule[4][1].away = schedule[1][3].home;
  }

  //semifinales
  if (
    parseInt(schedule[3][0].pointsAway) + parseInt(schedule[4][0].pointsAway) >
      parseInt(schedule[3][0].pointsHome) +
        parseInt(schedule[4][0].pointsHome) &&
    schedule[3][0].pointsAway != ""
  ) {
    schedule[5][0].home = schedule[3][0].away;
    schedule[5][1].home = schedule[3][0].home;
  } else {
    if (schedule[3][0].pointsAway != "" && schedule[3][0].pointsHome != "" && schedule[4][0].pointsAway != "" && schedule[4][0].pointsHome != "") {
      schedule[5][0].home = schedule[3][0].home;
      schedule[5][1].home = schedule[3][0].away;
    } else {
      schedule[5][0].home = "";
      schedule[5][1].home = "";
    }
  }
  if (
    parseInt(schedule[3][1].pointsAway) + parseInt(schedule[4][1].pointsAway) >
      parseInt(schedule[3][1].pointsHome) +
        parseInt(schedule[4][1].pointsHome) &&
    schedule[3][1].pointsAway != ""
  ) {
    schedule[5][0].away = schedule[3][1].away;
    schedule[5][1].away = schedule[3][1].home;
  } else {
    if (
      schedule[3][1].pointsAway != "" &&
      schedule[3][1].pointsHome != "" &&
      schedule[4][1].pointsHome != "" &&
      schedule[4][1].pointsAway != ""
    ) {
      schedule[5][0].away = schedule[3][1].home;
      schedule[5][1].away = schedule[3][1].away;
    } else {
      schedule[5][0].away = "";
      schedule[5][1].away = "";
    }
  }
  return schedule;
};

export default nextFinalRound;
