import React, { useState, useEffect } from 'react';
import axios from 'axios';

import scienceRacoon from './icons/scientist.jpeg';
import cookieRacoon from './icons/eatingCookie.jpeg';
import dancingRacoon from './icons/dancingRacoon.jpeg';
import appleRacoon from './icons/eatingApple.jpeg';
import loverRacoon from './icons/lover.jpeg';
import streetwearRacoon from './icons/streetwear.jpeg';
import cleaningRacoon from './icons/cleaningRacoon.png';
import moneyBagRacoon from './icons/moneyBagRacoon.jpeg';
import suitRacoon from './icons/suitRacoon.jpeg';
import chipRacoon from './icons/chipRacoon.jpeg';
import drinkingRacoon from './icons/drinkingRacoon.jpeg';
import grumpyRacoon from './icons/grumpyRacoon.jpeg';
import rainbowVomit from './icons/rainbowVomit.jpeg';
import trashRacoon from './icons/trashRacoon.jpeg';

function MakeTiles(props) {
  //this adds to database

  // how to make this automatic with a variable??
  const postHighScore = async (aName, aScore, aTime) => {
    // const response = await axios.post('http://localhost:8080/api/highscores', {
    const response = await axios.post(
      'https://racoon-memory-game-backend-fly.fly.dev/api/highscores',
      {
        aName,
        aScore,
        aTime,
      }
    );
    console.log({ response });
  };
  const imgDict = {
    [scienceRacoon]: 0,
    [cookieRacoon]: 1,
    [dancingRacoon]: 2,
    [appleRacoon]: 3,
    [loverRacoon]: 4,
    [streetwearRacoon]: 5,
    [cleaningRacoon]: 6,
    [moneyBagRacoon]: 7,
    [suitRacoon]: 8,
    [chipRacoon]: 9,
    [drinkingRacoon]: 10,
    [grumpyRacoon]: 11,
    [rainbowVomit]: 12,
    [trashRacoon]: 13,
  };
  // top possible score condition

  const shuffledTiles = shuffle(Object.keys(imgDict));

  const tiles = [];
  const initialTrack = [];
  for (let i = 0; i < Object.keys(imgDict).length; i++) {
    initialTrack.push(false);
  }

  const [clickedTracker, setClickedTracker] = useState(initialTrack);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  // let startTime;
  // let endTime;

  useEffect(() => {
    if (clickedTracker.length === 1) {
      setStartTime(new Date().getTime());
    }
  }, [clickedTracker]);

  for (let i = 0; i < shuffledTiles.length; i++) {
    tiles.push(
      <img
        src={shuffledTiles[i]}
        alt=""
        id={shuffledTiles[i]}
        className="image"
        onClick={() => {
          if (!clickedTracker[imgDict[shuffledTiles[i]]]) {
            //put new highscore name in here
            let newTracker = clickedTracker;

            newTracker[imgDict[shuffledTiles[i]]] = true;
            setClickedTracker(newTracker);

            props.setScore(props.score + 1);
            if (props.score > props.highscore) {
              props.setHighScore(props.score);
            }
          } else {
            //create new data, if high score ask for name input/ redirect to highscore page
            // endTime = new Date().getTime();
            //trying to use useEffect to do this outside of function
            // if no entry yet
            setEndTime(new Date().getTime());
            props.setElapsedTime(endTime - startTime);

            if (!props.topTen) {
              const playerName = prompt(
                'Congratulations! You got a great score! Enter your name for the record book!'
              );
              console.log('first score entry');
              postHighScore(playerName, props.score, props.elapsedTime);
            }
            // if top ten isnt full yet
            else if (props.topTen.length < 10) {
              const playerName = prompt(
                'Congratulations! You got a great score! Enter your name for the record book!'
              );
              console.log('filling out the top ten');
              postHighScore(playerName, props.score, props.elapsedTime);
            }
            // if top ten is full and you get a score that isnt good enough
            else if (
              props.score < props.topTen[props.topTen.length - 1].score
            ) {
              console.log('not a top ten score');
              postHighScore('', props.score, props.elapsedTime);
            }
            // if you get a top ten score
            else if (
              props.score > props.topTen[props.topTen.length - 1].score
            ) {
              console.log('a top ten score');
              const playerName = prompt(
                'Congratulations! You got a great score! Enter your name for the record book!'
              );
              console.log({ playerName });
              postHighScore(playerName, props.score, props.elapsedTime);
            }

            props.setScore(0);
            setClickedTracker(initialTrack);
          }
        }}
      />
    );
  }
  if (props.score === Object.keys(imgDict).length) {
    return (
      <div>
        <br />
        <p>
          {' '}
          <em> That is the Top Possible Score! Congrats!</em>{' '}
        </p>
      </div>
    );
  }
  return <div className="images">{tiles}</div>;
}

function shuffle(oldArray) {
  let array = oldArray;
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
export { MakeTiles };
