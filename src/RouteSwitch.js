import { Link, BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.js';
import ScoreList from './ScoreList';
import { InfoPage } from './InfoPage';
import { useState, useEffect } from 'react';
import axios from 'axios';
const RouteSwitch = () => {
  const [topTen, setTopTen] = useState([]);
  const [show, setShow] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [name, setName] = useState('');
  const [elapsedTime, setElapsedTime] = useState(0);

  const fetchHighScores = async () => {
    // const response = await axios.get('http://localhost:8080/api/scorelist');
    // trying 8080 port to work with fly.io
    const response = await axios.get(
      'https://racoon-memory-game-backend-fly.fly.dev/api/scorelist'
    );

    console.log('this is the high scores', response);
    setTopTen(response.data);
  };

  let data;
  useEffect(() => {
    fetchHighScores();
  }, []);
  console.log({ topTen });

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
                ElapsedTime={elapsedTime}
                setElapsedTime={setElapsedTime}
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

export { RouteSwitch };
