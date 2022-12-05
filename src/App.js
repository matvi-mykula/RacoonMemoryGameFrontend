import './App.css';
import React, { useState, useEffect } from 'react';
// import { fetchHighScores } from './RouteSwitch';
import { MakeTiles, NightMareMode } from './tiles.js';

function App(props) {
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState(0);
  // console.log({ score });

  // const postHighScore = async () => {
  //   const response = await axios.post('http://localhost:3005/api/highscores', {
  //     name,
  //     highScore,
  //   });
  //   console.log({ response });
  // };

  // const fetchHighScores = async () => {
  //   // const response = await axios.get('http://localhost:8080/api/scorelist');
  //   const response = await axios.get(
  //     'https://racoon-memory-game-backend-fly.fly.dev/api/scorelist'
  //   );

  //   console.log('this is the high scores', response);
  // };
  const [nightmare, setNightmare] = useState(false);

  useEffect(() => {
    if (score > props.highScore) {
      props.setHighScore(score);
    }
  }, [score]);

  return (
    <div className="App">
      <header className="game-header">
        <p className="appTitle"> Racoon Memory Game </p>
        <div className="scores">
          <p>Current Score: {score} </p>

          <p>Local HighScore: {props.highScore} </p>
        </div>
        <div></div>
      </header>
      <div className="explanation">
        <p>Click a Racoon that you have not clicked yet!</p>
      </div>
      {/* {nightmare ? (
        <NightMareMode></NightMareMode>
      ) : (
        <MakeTiles
          score={score}
          setScore={setScore}
          highScore={props.highScore}
          setHighScore={props.setHighScore}
          topTen={props.topTen}
          setTopTen={props.setTopTen}
          startTime={startTime}
          setStartTime={setStartTime}
          isActive={props.isActive}
          setIsActive={props.setIsActive}
        ></MakeTiles>
      )} */}
      <MakeTiles
        score={score}
        setScore={setScore}
        highScore={props.highScore}
        setHighScore={props.setHighScore}
        topTen={props.topTen}
        setTopTen={props.setTopTen}
        startTime={startTime}
        setStartTime={setStartTime}
        isActive={props.isActive}
        setIsActive={props.setIsActive}
      ></MakeTiles>

      {/* <div>
        <p>! Do not click !</p>
        <button onClick={() => setNightmare(!nightmare)}>NightMareMode</button>
      </div> */}
    </div>
  );
}

export default App;
