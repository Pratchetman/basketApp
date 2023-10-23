import React, { useEffect, useState } from "react";

import "./faseFinal.scss";
import DataFetch from "../hooks/DataFetch";
import { Team } from "./Team";
import nextFinalRound from "../utils/nextFinalRound";

export const FaseFinal = ({ schedule, setSchedule, edit }) => {
  const deepCopy = (arr) => {
    return arr.map((innerArray) => {
      return innerArray.map((obj) => ({ ...obj }));
    });
  };

  const handlePoints = (homeAway, jornada, matchIndex, e) => {
    const aux = deepCopy(schedule);

    homeAway == "home"
      ? (aux[jornada][matchIndex].pointsHome = e.target.value)
      : (aux[jornada][matchIndex].pointsAway = e.target.value);

    setSchedule(nextFinalRound(aux));
  };

  console.log(schedule);

  return (
    <div className="principal-final">
      {schedule[0][0] && (
        <>
          <h1>Cuadro de Playoffs</h1>
          <div className="d-Flex">
            <h6>RONDA PREVIA</h6>
            <div className="match">
              <div className="teams">
                <Team teamId={schedule[0][0].home} />
                <Team teamId={schedule[0][0].away} />
              </div>
              <div className="points">
                {!edit ? (
                  <div className="p1">
                    <h6>SOLO IDA</h6>
                    <h5>
                      {schedule[0][0].pointsHome != ""
                        ? schedule[0][0].pointsHome
                        : "--"}
                    </h5>
                    <h5>
                      {schedule[0][0].pointsAway != ""
                        ? schedule[0][0].pointsAway
                        : "--"}
                    </h5>
                  </div>
                ) : (
                  <div className="p1">
                    <h6>SÓLO IDA</h6>
                    <h5>
                      <input
                        className="editPoints"
                        type="number"
                        min={0}
                        max={200}
                        placeholder="-"
                        name="pointsHome"
                        value={schedule[0][0].pointsHome}
                        onChange={(e) => handlePoints("home", 0, 0, e)}
                      />
                    </h5>
                    <h5>
                      <input
                        className="editPoints"
                        type="number"
                        min={0}
                        max={200}
                        placeholder="-"
                        name="pointsAway"
                        value={schedule[0][0].pointsAway}
                        onChange={(e) => handlePoints("away", 0, 0, e)}
                      />
                    </h5>
                  </div>
                )}
              </div>
            </div>
            <div className="match">
              <div className="teams">
                <Team teamId={schedule[0][1].home} />
                <Team teamId={schedule[0][1].away} />
              </div>
              <div className="points">
                {!edit ? (
                  <div className="p1">
                    <h6>SOLO IDA</h6>
                    <h5>
                      {schedule[0][1].pointsHome != ""
                        ? schedule[0][1].pointsHome
                        : "--"}
                    </h5>
                    <h5>
                      {schedule[0][1].pointsAway != ""
                        ? schedule[0][1].pointsAway
                        : "--"}
                    </h5>
                  </div>
                ) : (
                  <div className="p1">
                    <h6>SÓLO IDA</h6>
                    <h5>
                      <input
                        className="editPoints"
                        type="number"
                        min={0}
                        max={200}
                        placeholder="-"
                        name="pointsHome"
                        value={schedule[0][1].pointsHome}
                        onChange={(e) => handlePoints("home", 0, 1, e)}
                      />
                    </h5>
                    <h5>
                      <input
                        className="editPoints"
                        type="number"
                        min={0}
                        max={200}
                        placeholder="-"
                        name="pointsAway"
                        value={schedule[0][1].pointsAway}
                        onChange={(e) => handlePoints("away", 0, 1, e)}
                      />
                    </h5>
                  </div>
                )}
              </div>
            </div>
          </div>
          <hr />
          <div className="d-Flex">
            <div className="vertical">
              <h6>CUARTOS DE FINAL</h6>
              <div className="match">
                <div className="teams">
                  <Team teamId={schedule[1][0].home} />
                  <Team teamId={schedule[1][0].away} />
                </div>
                <div className="points">
                  {!edit ? (
                    <div className="p1">
                      <h6>IDA</h6>
                      <h5>
                        {schedule[1][0].pointsHome != ""
                          ? schedule[1][0].pointsHome
                          : "--"}
                      </h5>
                      <h5>
                        {schedule[1][0].pointsAway != ""
                          ? schedule[1][0].pointsAway
                          : "--"}
                      </h5>
                    </div>
                  ) : (
                    <div className="p1">
                      <h6>IDA</h6>
                      <h5>
                        <input
                          className="editPoints"
                          type="number"
                          min={0}
                          max={200}
                          placeholder="-"
                          name="pointsHome"
                          value={schedule[1][0].pointsHome}
                          onChange={(e) => handlePoints("home", 1, 0, e)}
                        />
                      </h5>
                      <h5>
                        <input
                          className="editPoints"
                          type="number"
                          min={0}
                          max={200}
                          placeholder="-"
                          name="pointsAway"
                          value={schedule[1][0].pointsAway}
                          onChange={(e) => handlePoints("away", 1, 0, e)}
                        />
                      </h5>
                    </div>
                  )}
                  {!edit ? (
                    <div className="p1">
                      <h6>VUELTA</h6>
                      <h5>
                        {schedule[2][0].pointsHome != ""
                          ? schedule[2][0].pointsHome
                          : "--"}
                      </h5>
                      <h5>
                        {schedule[2][0].pointsAway != ""
                          ? schedule[2][0].pointsHome
                          : "--"}
                      </h5>
                    </div>
                  ) : (
                    <div className="p1">
                      <h6>VUELTA</h6>
                      <h5>
                        <input
                          className="editPoints"
                          type="number"
                          min={0}
                          max={200}
                          placeholder="-"
                          name="pointsHome"
                          value={schedule[2][0].pointsHome}
                          onChange={(e) => handlePoints("home", 2, 0, e)}
                        />
                      </h5>
                      <h5>
                        <input
                          className="editPoints"
                          type="number"
                          min={0}
                          max={200}
                          placeholder="-"
                          name="pointsAway"
                          value={schedule[2][0].pointsAway}
                          onChange={(e) => handlePoints("away", 2, 0, e)}
                        />
                      </h5>
                    </div>
                  )}
                </div>
              </div>
              <div className="match">
                <div className="teams">
                  <Team teamId={schedule[1][1].home} />

                  <Team teamId={schedule[1][1].away} />
                </div>
                <div className="points">
                  {!edit ? (
                    <div className="p1">
                      <h6>IDA</h6>
                      <h5>
                        {schedule[1][1].pointsHome != ""
                          ? schedule[1][1].pointsHome
                          : "--"}
                      </h5>
                      <h5>
                        {schedule[1][1].pointsAway != ""
                          ? schedule[1][1].pointsAway
                          : "--"}
                      </h5>
                    </div>
                  ) : (
                    <div className="p1">
                      <h6>IDA</h6>
                      <h5>
                        <input
                          className="editPoints"
                          type="number"
                          min={0}
                          max={200}
                          placeholder="-"
                          name="pointsHome"
                          value={schedule[1][1].pointsHome}
                          onChange={(e) => handlePoints("home", 1, 1, e)}
                        />
                      </h5>
                      <h5>
                        <input
                          className="editPoints"
                          type="number"
                          min={0}
                          max={200}
                          placeholder="-"
                          name="pointsAway"
                          value={schedule[1][1].pointsAway}
                          onChange={(e) => handlePoints("away", 1, 1, e)}
                        />
                      </h5>
                    </div>
                  )}
                  {!edit ? (
                    <div className="p1">
                      <h6>VUELTA</h6>
                      <h5>
                        {schedule[2][1].pointsHome != ""
                          ? schedule[2][1].pointsHome
                          : "--"}
                      </h5>
                      <h5>
                        {schedule[2][1].pointsAway != ""
                          ? schedule[2][1].pointsAway
                          : "--"}
                      </h5>
                    </div>
                  ) : (
                    <div className="p1">
                      <h6>VUELTA</h6>
                      <h5>
                        <input
                          className="editPoints"
                          type="number"
                          min={0}
                          max={200}
                          placeholder="-"
                          name="pointsHome"
                          value={schedule[2][1].pointsHome}
                          onChange={(e) => handlePoints("home", 2, 1, e)}
                        />
                      </h5>
                      <h5>
                        <input
                          className="editPoints"
                          type="number"
                          min={0}
                          max={200}
                          placeholder="-"
                          name="pointsAway"
                          value={schedule[2][1].pointsAway}
                          onChange={(e) => handlePoints("away", 2, 1, e)}
                        />
                      </h5>
                    </div>
                  )}
                </div>
              </div>
              <div className="match">
                <div className="teams">
                  <Team teamId={schedule[1][2].home} />
                  <Team teamId={schedule[1][2].away} />
                </div>
                <div className="points">
                  {!edit ? (
                    <div className="p1">
                      <h6>IDA</h6>
                      <h5>
                        {schedule[1][2].pointsHome != ""
                          ? schedule[1][2].pointsHome
                          : "--"}
                      </h5>
                      <h5>
                        {schedule[1][2].pointsAway != ""
                          ? schedule[1][2].pointsAway
                          : "--"}
                      </h5>
                    </div>
                  ) : (
                    <div className="p1">
                      <h6>IDA</h6>
                      <h5>
                        <input
                          className="editPoints"
                          type="number"
                          min={0}
                          max={200}
                          placeholder="-"
                          name="pointsHome"
                          value={schedule[1][2].pointsHome}
                          onChange={(e) => handlePoints("home", 1, 2, e)}
                        />
                      </h5>
                      <h5>
                        <input
                          className="editPoints"
                          type="number"
                          min={0}
                          max={200}
                          placeholder="-"
                          name="pointsAway"
                          value={schedule[1][2].pointsAway}
                          onChange={(e) => handlePoints("away", 1, 2, e)}
                        />
                      </h5>
                    </div>
                  )}
                  {!edit ? (
                    <div className="p1">
                      <h6>VUELTA</h6>
                      <h5>
                        {schedule[2][2].pointsHome != ""
                          ? schedule[2][2].pointsHome
                          : "--"}
                      </h5>
                      <h5>
                        {schedule[2][2].pointsAway != ""
                          ? schedule[2][2].pointsAway
                          : "--"}
                      </h5>
                    </div>
                  ) : (
                    <div className="p1">
                      <h6>VUELTA</h6>
                      <h5>
                        <input
                          className="editPoints"
                          type="number"
                          min={0}
                          max={200}
                          placeholder="-"
                          name="pointsHome"
                          value={schedule[2][2].pointsHome}
                          onChange={(e) => handlePoints("home", 2, 2, e)}
                        />
                      </h5>
                      <h5>
                        <input
                          className="editPoints"
                          type="number"
                          min={0}
                          max={200}
                          placeholder="-"
                          name="pointsAway"
                          value={schedule[2][2].pointsAway}
                          onChange={(e) => handlePoints("away", 2, 2, e)}
                        />
                      </h5>
                    </div>
                  )}
                </div>
              </div>
              <div className="match">
                <div className="teams">
                  <Team teamId={schedule[1][3].home} />
                  <Team teamId={schedule[1][3].away} />
                </div>
                <div className="points">
                  {!edit ? (
                    <div className="p1">
                      <h6>IDA</h6>
                      <h5>
                        {schedule[1][3].pointsHome != ""
                          ? schedule[1][3].pointsHome
                          : "--"}
                      </h5>
                      <h5>
                        {schedule[1][3].pointsAway != ""
                          ? schedule[1][3].pointsAway
                          : "--"}
                      </h5>
                    </div>
                  ) : (
                    <div className="p1">
                      <h6>IDA</h6>
                      <h5>
                        <input
                          className="editPoints"
                          type="number"
                          min={0}
                          max={200}
                          placeholder="-"
                          name="pointsHome"
                          value={schedule[1][3].pointsHome}
                          onChange={(e) => handlePoints("home", 1, 3, e)}
                        />
                      </h5>
                      <h5>
                        <input
                          className="editPoints"
                          type="number"
                          min={0}
                          max={200}
                          placeholder="-"
                          name="pointsAway"
                          value={schedule[1][3].pointsAway}
                          onChange={(e) => handlePoints("away", 1, 3, e)}
                        />
                      </h5>
                    </div>
                  )}
                  {!edit ? (
                    <div className="p1">
                      <h6>VUELTA</h6>
                      <h5>
                        {schedule[2][3].pointsHome != ""
                          ? schedule[2][3].pointsHome
                          : "--"}
                      </h5>
                      <h5>
                        {schedule[2][3].pointsAway != ""
                          ? schedule[2][3].pointsAway
                          : "--"}
                      </h5>
                    </div>
                  ) : (
                    <div className="p1">
                      <h6>VUELTA</h6>
                      <h5>
                        <input
                          className="editPoints"
                          type="number"
                          min={0}
                          max={200}
                          placeholder="-"
                          name="pointsHome"
                          value={schedule[2][3].pointsHome}
                          onChange={(e) => handlePoints("home", 2, 3, e)}
                        />
                      </h5>
                      <h5>
                        <input
                          className="editPoints"
                          type="number"
                          min={0}
                          max={200}
                          placeholder="-"
                          name="pointsAway"
                          value={schedule[2][3].pointsAway}
                          onChange={(e) => handlePoints("away", 2, 3, e)}
                        />
                      </h5>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="vertical">
              <h6>SEMIFINAL</h6>
              <div className="match">
                <div className="teams">
                  <Team teamId={schedule[3][0].home} />
                  <Team teamId={schedule[3][0].away} />
                </div>
                <div className="points">
                  {!edit ? (
                    <div className="p1">
                      <h6>IDA</h6>
                      <h5>
                        {schedule[3][0].pointsHome != ""
                          ? schedule[3][0].pointsHome
                          : "--"}
                      </h5>
                      <h5>
                        {schedule[3][0].pointsAway != ""
                          ? schedule[3][0].pointsAway
                          : "--"}
                      </h5>
                    </div>
                  ) : (
                    <div className="p1">
                      <h6>IDA</h6>
                      <h5>
                        <input
                          className="editPoints"
                          type="number"
                          min={0}
                          max={200}
                          placeholder="-"
                          name="pointsHome"
                          value={schedule[3][0].pointsHome}
                          onChange={(e) => handlePoints("home", 3, 0, e)}
                        />
                      </h5>
                      <h5>
                        <input
                          className="editPoints"
                          type="number"
                          min={0}
                          max={200}
                          placeholder="-"
                          name="pointsAway"
                          value={schedule[3][0].pointsAway}
                          onChange={(e) => handlePoints("away", 3, 0, e)}
                        />
                      </h5>
                    </div>
                  )}
                  {!edit ? (
                    <div className="p1">
                      <h6>VUELTA</h6>
                      <h5>
                        {schedule[4][0].pointsHome != ""
                          ? schedule[4][0].pointsHome
                          : "--"}
                      </h5>
                      <h5>
                        {schedule[4][0].pointsAway != ""
                          ? schedule[4][0].pointsAway
                          : "--"}
                      </h5>
                    </div>
                  ) : (
                    <div className="p1">
                      <h6>VUELTA</h6>
                      <h5>
                        <input
                          className="editPoints"
                          type="number"
                          min={0}
                          max={200}
                          placeholder="-"
                          name="pointsHome"
                          value={schedule[4][0].pointsHome}
                          onChange={(e) => handlePoints("home", 4, 0, e)}
                        />
                      </h5>
                      <h5>
                        <input
                          className="editPoints"
                          type="number"
                          min={0}
                          max={200}
                          placeholder="-"
                          name="pointsAway"
                          value={schedule[4][0].pointsAway}
                          onChange={(e) => handlePoints("away", 4, 0, e)}
                        />
                      </h5>
                    </div>
                  )}
                </div>
              </div>
              <div className="match">
                <div className="teams">
                  <Team teamId={schedule[3][1].home} />
                  <Team teamId={schedule[3][1].away} />
                </div>
                <div className="points">
                  {!edit ? (
                    <div className="p1">
                      <h6>IDA</h6>
                      <h5>
                        {schedule[3][1].pointsHome != ""
                          ? schedule[3][1].pointsHome
                          : "--"}
                      </h5>
                      <h5>
                        {schedule[3][1].pointsAway != ""
                          ? schedule[3][1].pointsAway
                          : "--"}
                      </h5>
                    </div>
                  ) : (
                    <div className="p1">
                      <h6>IDA</h6>
                      <h5>
                        <input
                          className="editPoints"
                          type="number"
                          min={0}
                          max={200}
                          placeholder="-"
                          name="pointsHome"
                          value={schedule[3][1].pointsHome}
                          onChange={(e) => handlePoints("home", 3, 1, e)}
                        />
                      </h5>
                      <h5>
                        <input
                          className="editPoints"
                          type="number"
                          min={0}
                          max={200}
                          placeholder="-"
                          name="pointsAway"
                          value={schedule[3][1].pointsAway}
                          onChange={(e) => handlePoints("away", 3, 1, e)}
                        />
                      </h5>
                    </div>
                  )}
                  {!edit ? (
                    <div className="p1">
                      <h6>VUELTA</h6>
                      <h5>
                        {schedule[4][1].pointsHome != ""
                          ? schedule[4][1].pointsHome
                          : "--"}
                      </h5>
                      <h5>
                        {schedule[4][1].pointsAway != ""
                          ? schedule[4][1].pointsAway
                          : "--"}
                      </h5>
                    </div>
                  ) : (
                    <div className="p1">
                      <h6>VUELTA</h6>
                      <h5>
                        <input
                          className="editPoints"
                          type="number"
                          min={0}
                          max={200}
                          placeholder="-"
                          name="pointsHome"
                          value={schedule[4][1].pointsHome}
                          onChange={(e) => handlePoints("home", 4, 1, e)}
                        />
                      </h5>
                      <h5>
                        <input
                          className="editPoints"
                          type="number"
                          min={0}
                          max={200}
                          placeholder="-"
                          name="pointsAway"
                          value={schedule[4][1].pointsAway}
                          onChange={(e) => handlePoints("away", 4, 1, e)}
                        />
                      </h5>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="vertical">
              <h6>FINAL</h6>
              <div className="match">
                <div className="teams">
                  <Team teamId={schedule[5][0].home} />
                  <Team teamId={schedule[5][0].away} />
                </div>
                {!edit ? (
                  <div className="points">
                    <div className="p1">
                      <h5>
                        {schedule[5][0].pointsHome != ""
                          ? schedule[5][0].pointsHome
                          : "--"}
                      </h5>
                      <h5>
                        {schedule[5][0].pointsAway != ""
                          ? schedule[5][0].pointsAway
                          : "--"}
                      </h5>
                    </div>
                  </div>
                ) : (
                  <div className="points">
                    <div className="p1">
                      <h5>
                        <input
                          className="editPoints"
                          type="number"
                          min={0}
                          max={200}
                          placeholder="-"
                          name="pointsHome"
                          value={schedule[5][0].pointsHome}
                          onChange={(e) => handlePoints("home", 5, 0, e)}
                        />
                      </h5>
                      <h5>
                        <input
                          className="editPoints"
                          type="number"
                          min={0}
                          max={200}
                          placeholder="-"
                          name="pointsAway"
                          value={schedule[5][0].pointsAway}
                          onChange={(e) => handlePoints("away", 5, 0, e)}
                        />
                      </h5>
                    </div>
                  </div>
                )}
              </div>
              <h6>3er y 4º PUESTO</h6>
              <div className="match">
                <div className="teams">
                  <Team teamId={schedule[5][1].home} />
                  <Team teamId={schedule[5][1].away} />
                </div>
                {!edit ? (
                  <div className="points">
                    <div className="p1">
                      <h5>
                        {schedule[5][1].pointsHome != ""
                          ? schedule[5][1].pointsHome
                          : "--"}
                      </h5>
                      <h5>
                        {schedule[5][1].pointsAway != ""
                          ? schedule[5][1].pointsAway
                          : "--"}
                      </h5>
                    </div>
                  </div>
                ) : (
                  <div className="points">
                    <div className="p1">
                      <h5>
                        <input
                          className="editPoints"
                          type="number"
                          min={0}
                          max={200}
                          placeholder="-"
                          name="pointsHome"
                          value={schedule[5][1].pointsHome}
                          onChange={(e) => handlePoints("home", 5, 1, e)}
                        />
                      </h5>
                      <h5>
                        <input
                          className="editPoints"
                          type="number"
                          min={0}
                          max={200}
                          placeholder="-"
                          name="pointsAway"
                          value={schedule[5][1].pointsAway}
                          onChange={(e) => handlePoints("away", 5, 1, e)}
                        />
                      </h5>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
