import './App.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { MakeTiles } from './tiles.js';
// import { PopUp } from './Components/newName.js';
import axios from 'axios';

function App(props) {
  const [score, setScore] = useState(0);
  const navigate = useNavigate();
  console.log({ score });

  // const postHighScore = async () => {
  //   const response = await axios.post('http://localhost:3005/api/highscores', {
  //     name,
  //     highScore,
  //   });
  //   console.log({ response });
  // };

  const fetchHighScores = async () => {
    // const response = await axios.get('http://localhost:8080/api/scorelist');
    const response = await axios.get(
      'https://racoon-memory-game-backend-fly.fly.dev/api/scorelist'
    );

    console.log('this is the high scores', response);
  };

  useEffect(() => {
    if (score > props.highScore) {
      props.setHighScore(score);
    }
  }, [score]);

  // useEffect(() => {
  //   if (props.topTen.length < 10) {
  //     // navigate('/scorelist');
  //   } else {
  //     if (props.highScore > props.topTen[9].score && score > 0) {
  //       //generate form and user input herelet
  //       // navigate('/scorelist');
  //     }
  //   }

  //   console.log('score changed');
  //   // postHighScore();
  // }, [props.highScore]);

  return (
    <div className="App">
      <header className="game-header">
        <p>Memory Game </p>
        <div className="scores">
          <p>Current Score: {score} </p>

          <p>Local HighScore: {props.highScore} </p>
        </div>
        <div></div>
      </header>
      <div className="explanation">
        <p>Click a Racoon that you have not clicked yet!</p>
      </div>
      <MakeTiles
        score={score}
        setScore={setScore}
        highScore={props.highScore}
        setHighScore={props.setHighScore}
        topTen={props.topTen}
        setTopTen={props.setTopTen}
      ></MakeTiles>

      {/* <PopUp></PopUp> */}
    </div>
  );
}

// function HandleSubmit(props) {
//   if (!props.show) {
//     props.setShow(true);
//   }
//   const navigate = useNavigate();
//   navigate('/scorelist');
// }

export default App;
