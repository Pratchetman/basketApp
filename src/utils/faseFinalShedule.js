const lastschedule = (faseFinalTeams) => {
    let finalDefault = [[],[],[],[],[],[]];
    let finalMatch = {
        matchId: "",
        home: "",
        away: "",
        pointsAway: "",
        pointsHome: "",
    };
    for (let i = 0; i < 6; i++){
        if (i == 0){
            finalDefault[i].push({
                matchId: "previa1",
                home: faseFinalTeams[6].id,
                away: faseFinalTeams[9].id,
                pointsAway: "",
                pointsHome: "",
            });
            finalDefault[i].push({
                matchId: "previa2",
                home: faseFinalTeams[7].id,
                away: faseFinalTeams[8].id,
                pointsAway: "",
                pointsHome: "",
            });
        }else if (i == 1 || i == 2){
            finalDefault[i].push({
                matchId: "quarters" + i + "1",
                home: faseFinalTeams[0].id,
                away: "-",
                pointsAway: "",
                pointsHome: "",
            });
            finalDefault[i].push({
                matchId: "quarters" + i + "2",
                home: faseFinalTeams[3].id,
                away: faseFinalTeams[4].id,
                pointsAway: "",
                pointsHome: "",
            });
            finalDefault[i].push({
                matchId: "quarters" + i + "3",
                home: faseFinalTeams[2].id,
                away: faseFinalTeams[5].id,
                pointsAway: "",
                pointsHome: "",
            });
            finalDefault[i].push({
                matchId: "quarters" + i + "4",
                home: faseFinalTeams[1].id,
                away: "-",
                pointsAway: "",
                pointsHome: "",
            });
        } else if (i == 3 || i == 4){
            finalDefault[i].push(finalMatch);
            finalDefault[i].push(finalMatch);
        } else {
            finalDefault[i].push(finalMatch);
            finalDefault[i].push(finalMatch);
        }
        
    }    

    return finalDefault;
  };

  export default lastschedule;