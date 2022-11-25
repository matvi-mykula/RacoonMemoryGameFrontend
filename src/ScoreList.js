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
      {/* <RenderTopTen
        topTen={props.topTen}
        setTopTen={props.setTopTen}
        highScore={props.highScore}
      ></RenderTopTen> */}
      <table className="scoreTable">
        <tr>
          <th>Rank</th>
          <th>Name</th>
          <th>Score</th>
        </tr>
        {[...props.topTen].map((x, i) => {
          return (
            <tr>
              <td>{i}</td>
              <td>{props.topTen[i].name}</td>
              <td>{props.topTen[i].score}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

function ScoreTable(props) {}

function ScoreBoard(props) {
  console.log(props);
  return (
    <div className="leaderBoardEntry">
      <p>{props.index + 1})</p>
      <p>{props.playerDict.name}</p>
      <p>{props.playerDict.score}</p>
    </div>
  );
}

// should go through topten and either render schoreboard(props) or render input field
function RenderTopTen(props) {
  let elementList = [];
  let inputted = false;
  for (let i = 0; i < props.topTen.length; i++) {
    console.log(props);
    console.log(props.topTen[i].score);
    if (props.highScore < props.topTen[i].score) {
      elementList.push(
        <ScoreBoard
          playerDict={props.topTen[i]}
          index={i}
        ></ScoreBoard>
      );
    } else {
      elementList.push(
        <GetName
          name={props.name}
          setName={props.setName}
          highScore={props.highScore}
          index={i}
        ></GetName>
      );
    }
  }
  return elementList;
}

function GetName(props) {
  return (
    <div>
      <p>{props.index + 1}</p>
      <form>
        {/* on submit postHighScore */}
        <label>
          Name:
          <input
            type="text"
            name="name"
          />
        </label>
        <input
          type="submit"
          value="Submit"
        />
      </form>
      <p>{props.highScore}</p>
    </div>
  );
}
export default ScoreList;
