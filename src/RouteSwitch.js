import { Link, BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.js';
import { ScoreList } from './ScoreList';
import { InfoPage } from './InfoPage';
import { StopWatch } from './StopWatch';
import { useState, useEffect } from 'react';
import axios from 'axios';

const RouteSwitch = () => {
  const [topTen, setTopTen] = useState([]);
  const [show, setShow] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [name, setName] = useState('');
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

  async function wrapperFunction() {
    const response = await fetchHighScores();
    setTopTen(response);
  }

  useEffect(() => {
    wrapperFunction();
  }, []);
  // console.log({ topTen });

  return (
    <div>
      <BrowserRouter>
        <header className="App-header">
          <Link
            to={'/'}
            className="headerLink"
          >
            Game
          </Link>
          <Link
            to={'/scorelist'}
            className="headerLink"
          >
            HighScores
          </Link>
          <Link
            to={'/info'}
            className="headerLink"
          >
            Info
          </Link>
          <StopWatch
            isActive={isActive}
            setIsActive={setIsActive}
            elapsedTime={elapsedTime}
            setElapsedTime={setElapsedTime}
          ></StopWatch>
        </header>
        <Routes>
          <Route
            path="/"
            element={
              <App
                topTen={topTen}
                setTopTen={setTopTen}
                show={show}
                setShow={setShow}
                highScore={highScore}
                setHighScore={setHighScore}
                name={name}
                setName={setName}
                elapsedTime={elapsedTime}
                setElapsedTime={setElapsedTime}
                isActive={isActive}
                setIsActive={setIsActive}
              />
            }
          />
          <Route
            path="/scorelist"
            element={
              <ScoreList
                topTen={topTen}
                setTopTen={setTopTen}
                show={show}
                setShow={setShow}
                highScore={highScore}
                setHighScore={setHighScore}
                name={name}
                setName={setName}
              />
            }
          />
          <Route
            path="/info"
            element={<InfoPage></InfoPage>}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

function figureAPI() {
  console.log(window.location);
  console.log(process.env.NODE_ENV);
  const devBackend = 'http://localhost:3005/api/';
  const prodBackend = 'https://racoon-memory-game-backend-fly.fly.dev/api/';

  const prodEnv = process.env.NODE_ENV === 'production';
  return prodEnv ? prodBackend : devBackend;
}

//some thing is going wrong with time submission when using prodBackend...
// what could be the issue?????

const environment = figureAPI();

const postHighScore = async (aName, aScore, aTime) => {
  const response = await axios.post(environment + 'highscores', {
    aName,
    aScore,
    aTime,
  });
  console.log({ response });
};
const fetchHighScores = async () => {
  const response = await axios.get(environment + 'scorelist');
  console.log('this is the high scores', response);
  return response.data;
};

export { RouteSwitch, postHighScore, fetchHighScores };
