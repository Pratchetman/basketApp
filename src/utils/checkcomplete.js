const checkComplete = (schedule) => {
  let res = true;
 
  for (let i = 0; i < schedule.length; i++) {
    for (let j = 0; j < schedule[i].length; j++) {
      if (schedule[i][j].pointsHome === "" || schedule[i][j].pointsAway === "") {
        res = false;
      }
    }
  }

  return res;
};
export default checkComplete;
