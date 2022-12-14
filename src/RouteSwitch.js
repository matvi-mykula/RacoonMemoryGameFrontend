import { Link, BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.js';
import { ScoreList } from './ScoreList';
import { InfoPage } from './InfoPage';
import { StopWatch } from './StopWatch';
import { LineChart } from './DataScience';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { getIP } from './getIP.js';

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
          <Link
            to={'/statistics'}
            className="headerLink"
          >
            Statistics
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
          <Route
            path="/statistics"
            element={<LineChart></LineChart>}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

function figureAPI() {
  console.log(window.location);
  console.log(process.env.NODE_ENV);
  const devBackend = 'http://localhost:8080/api/';
  const prodBackend = 'https://purple-firefly-886.fly.dev/api/';

  console.log({ prodBackend });
  const prodEnv = process.env.NODE_ENV === 'production';
  console.log(prodEnv);
  let environment;
  prodEnv ? (environment = prodBackend) : (environment = devBackend);
  return environment;
}

const environment = figureAPI();

console.log({ environment });

const postHighScore = async (aName, aScore, aTime, aDate) => {
  if (!aName) {
    aName = 'NoName';
  }
  const userIP = await getIP();
  console.log(userIP);
  const response = await axios.post(environment + 'highscores', {
    aName,
    aScore,
    aTime,
    aDate,
    userIP,
  });
  console.log({ response });
};
const fetchHighScores = async () => {
  const response = await axios.get(environment + 'scorelist');
  console.log('this is the high scores', response);
  return response.data;
};

const fetchAllScores = async () => {
  console.log('hello');
  const response = await axios.get(environment + 'statistics');
  return response.data;
};

export { RouteSwitch, postHighScore, fetchHighScores, fetchAllScores };
