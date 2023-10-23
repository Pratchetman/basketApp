import React, { useEffect, useState } from "react";
import DataFetch from "../hooks/DataFetch";
import "./team.scss";

export const Team = ({ teamId }) => {
  const { teamToName } = DataFetch();
  const [name, setName] = useState("");
  
  useEffect(() => {
    teamToName(teamId)
      .then((res) => setName(res.val().name))
      .catch((err) => console.log(err));
  }, [teamId]);

  return <p>{name ? name : "-"}</p>;
};
