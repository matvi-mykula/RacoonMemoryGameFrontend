import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { postHighScore } from './RouteSwitch';
import { StopWatch } from './StopWatch';
import { playGame, count } from './PlayGame';

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

  const shuffledTiles = shuffle(Object.keys(imgDict));

  const tiles = [];
  const initialTrack = [];
  for (let i = 0; i < Object.keys(imgDict).length; i++) {
    initialTrack.push(false);
  }

  const [clickedTracker, setClickedTracker] = useState(initialTrack);

  let endTime = 0;

  useEffect(() => {
    if (!props.isActive) {
      setClickedTracker(initialTrack);
    }
  }, [props.isActive]);

  for (let i = 0; i < shuffledTiles.length; i++) {
    tiles.push(
      <img
        src={shuffledTiles[i]}
        alt=""
        key={shuffledTiles[i]}
        className="image"
        onClick={async () => {
          //might need to be regular function
          //if so return array of [score, highscore, isActive] after posting then set states
          let turnResults = await playGame(
            clickedTracker,
            clickedTracker[imgDict[shuffledTiles[i]]], //true or false
            props.topTen,
            props.score,
            props.highScore,
            props.isActive,
            props.startTime,
            endTime
          );

          console.log({ turnResults });
          let newTracker = clickedTracker;
          newTracker[imgDict[shuffledTiles[i]]] = true;
          setClickedTracker(newTracker);
          props.setScore(turnResults['score']);
          props.setStartTime(turnResults['startTime']);
          props.setIsActive(turnResults['isActive']);

          if (count(clickedTracker, true) === clickedTracker.length) {
          }
        }}
      ></img>
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

//mayb emake a whole seperate tiles component and try to break it???
function NightMareMode() {
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

  const shuffledTiles = shuffle(Object.keys(imgDict));

  const tiles = [];
  const initialTrack = [];
  for (let i = 0; i < Object.keys(imgDict).length; i++) {
    initialTrack.push(false);
  }

  while (true) {
    return <div className="images">{tiles}</div>;
  }
}

export { MakeTiles, NightMareMode };
