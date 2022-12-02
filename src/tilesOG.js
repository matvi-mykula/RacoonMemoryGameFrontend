import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { postHighScore } from './RouteSwitch';
import { StopWatch } from './StopWatch';

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
  // top possible score condition

  const shuffledTiles = shuffle(Object.keys(imgDict));

  const tiles = [];
  const initialTrack = [];
  for (let i = 0; i < Object.keys(imgDict).length; i++) {
    initialTrack.push(false);
  }

  const [clickedTracker, setClickedTracker] = useState(initialTrack);

  // let interval = null;
  // const [time, setTime] = useState(0);
  // if (props.isActive) {
  //   interval = setInterval(() => {
  //     setTime((time) => time + 10);
  //   }, 10);
  // } else {
  //   clearInterval(interval);
  // }
  const newEntry = useRef({});
  useEffect(() => {
    newEntry.current = {
      time: props.elapsedTime,
    };
    console.log(newEntry);
  }, [props.elapsedTime]);

  for (let i = 0; i < shuffledTiles.length; i++) {
    tiles.push(
      <img
        src={shuffledTiles[i]}
        alt=""
        key={shuffledTiles[i]}
        className="image"
        onClick={() => {
          if (!clickedTracker[imgDict[shuffledTiles[i]]]) {
            props.setIsActive(true);
            // this should start timer component

            // let interval = null;
            // let time = 0
            // while (props.setIsActive(true)) {
            //   interval = setInterval(() => {
            //     setTime((time) => time + 10);
            //   }, 10);
            // }

            let newTracker = clickedTracker;

            newTracker[imgDict[shuffledTiles[i]]] = true;
            setClickedTracker(newTracker);
            props.setScore(props.score + 1);
            if (props.score > props.highscore) {
              props.setHighScore(props.score);
            }
          } else {
            //create new data, if high score ask for name input/ redirect to highscore page
            console.log(props.score);

            newEntry.current = {
              time: props.elapsedTime,
            };
            props.setIsActive(false);
            //this should stop timer component and update props.elapsedtime
            // console.log(time);
            console.log({ newEntry });
            // convert millis to readable time
            // let timeData = millisToMinutesAndSeconds(props.elapsedTime)
            console.log('timer', props.elapsedTime);
            console.log('new entry time', newEntry.current.time);

            if (!props.topTen) {
              const playerName = prompt(
                'Congratulations! You got a score of ' +
                  newEntry.score +
                  ' in ' +
                  newEntry.time +
                  '! Enter your name for the record book!'
              );
              console.log('first score entry');
              postHighScore(playerName, props.score, newEntry.current.time);
            }
            // if top ten isnt full yet
            else if (props.topTen.length < 10) {
              const playerName = prompt(
                'Congratulations! You got a score  of ' +
                  props.score +
                  ' in ' +
                  props.elapsedTime +
                  '! Enter your name for the record book!'
              );
              console.log('filling out the top ten');
              postHighScore(playerName, props.score, newEntry.current.time);
            }
            // if top ten is full and but are bad
            else if (
              props.score < props.topTen[props.topTen.length - 1].score
            ) {
              console.log('not a top ten score');
              postHighScore('', props.score, newEntry.current.time);
            }
            // if you get a top ten score
            else if (
              props.score > props.topTen[props.topTen.length - 1].score
            ) {
              console.log('a top ten score');
              const playerName = prompt(
                'Congratulations! You got a score  of ' +
                  props.score +
                  ' in ' +
                  props.elapsedTime +
                  '! Enter your name for the record book!'
              );
              console.log({ playerName });
              postHighScore(playerName, props.score, newEntry.current.time);
            }
            console.log('should be posted');
            props.setElapsedTime(0);
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
