// import { fetchHighScores } from './RouteSwitch';
import React, { useState, useEffect, useTable } from 'react';

import axios from 'axios';

const ScoreList = (props) => {
  const fetchHighScores = async () => {
    // const response = await axios.get('http://localhost:8080/api/scorelist');
    // changed port to 8080 to fit with fly.io
    const response = await axios.get(
      'https://racoon-memory-game-backend-fly.fly.dev/api/scorelist'
    );

    console.log('this is the high scores', response);
    props.setTopTen(response.data);
  };

  useEffect(() => {
    fetchHighScores();
  }, []);
  return (
    <div className="leaderPage">
      <h1>HighScore List</h1>

      <table className="scoreTable">
        <tr>
          <th>Rank</th>
          <th>Name</th>
          <th>Score</th>
          <th>Time</th>
        </tr>
        {[...props.topTen].map((x, i) => {
          return (
            <tr>
              <td>{i + 1}</td>
              <td>{props.topTen[i].name}</td>
              <td>{props.topTen[i].score}</td>
              <td>{props.topTen[i].time / 1000 / 60} Minutes</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default ScoreList;
