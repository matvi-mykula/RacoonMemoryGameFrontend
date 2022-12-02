// import { fetchHighScores } from './RouteSwitch';
import React, { useState, useEffect, useTable } from 'react';
import { fetchHighScores } from './RouteSwitch';

import axios from 'axios';

const ScoreList = (props) => {
  // const fetchHighScores = async () => {
  //   // const response = await axios.get('http://localhost:8080/api/scorelist');
  //   // changed port to 8080 to fit with fly.io
  //   const response = await axios.get(
  //     'https://racoon-memory-game-backend-fly.fly.dev/api/scorelist'
  //   );

  //   console.log('this is the high scores', response);
  //   props.setTopTen(response.data);
  // };

  // async function wrapperFunction() {
  //   props.setTopTen(await fetchHighScores().data);
  // }
  async function wrapperFunction() {
    const response = await fetchHighScores();
    props.setTopTen(response);
  }

  useEffect(() => {
    wrapperFunction(); // contains fetchHighScores
    console.log('top ten');
    console.log(props.topTen);
  }, []);
  console.log(props.topTen);
  return (
    <div className="leaderPage">
      <h1>HighScore List</h1>
      {props.topTen.length > 0 && (
        <table className="scoreTable">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Score</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {[...props.topTen].map((x, i) => {
              return (
                <tr>
                  <td>{i + 1}</td>
                  <td>{props.topTen[i].name}</td>
                  <td>{props.topTen[i].score}</td>
                  <td>{timeFormatter(props.topTen[i].time)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {props.topTen.length < 1 && <p>There is no top scores yet!</p>}
    </div>
  );
};

function timeFormatter(millis) {
  const d = new Date(Date.UTC(0, 0, 0, 0, 0, 0, millis)),
    // Pull out parts of interest
    // d.getUTCHours(),
    parts = [d.getUTCMinutes(), d.getUTCSeconds()],
    // Zero-pad
    formatted = parts.map((s) => String(s).padStart(2, '0')).join(':');
  return formatted;
}

function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return seconds === 60
    ? minutes + 1 + ':00'
    : minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}
export { ScoreList, timeFormatter };
