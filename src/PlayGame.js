import { postHighScore } from './RouteSwitch';

//what are inputs??
// current highscore list, image list, image clicked

//what are outputs?  -- score, name(conditions), time

//start condition, on first click
// end condition = clicked on already clicked image

// (highScoreList)
async function playGame(
  clickedTracker,
  imgClickedBoolean,
  topTenList,
  score,
  highScore,
  isActive,
  startTime,
  endTime
) {
  console.log({ clickedTracker });
  console.log({ imgClickedBoolean });
  if (count(clickedTracker, true) === 0) {
    startTime = Date.now();
    console.log('start');
    console.log(startTime);
    isActive = true;
  }
  //ending condition

  if (imgClickedBoolean) {
    isActive = false;
    // get time
    endTime = Date.now();

    const time = endTime - startTime;
    // get name
    console.log(time);
    console.log('time should be logged and passed to post');
    const playerName = getName(score, topTenList, time);
    await postHighScore(playerName, score, time, new Date());
    console.log('end of game');
  } //update everything and continue
  else {
    score += 1;
    if (score > highScore) {
      highScore = score;
    }
    console.log('score ' + score);
  }

  //   clickedTracker update

  const results = {
    score: score,
    highScore: highScore,
    startTime: startTime,
    endTime: endTime,
    clickedTracker: clickedTracker,
    isActive: isActive,
  };
  return results;
}

function getName(endScore, topTenList, atime) {
  let playerName = 'NA';
  if (!topTenList) {
    playerName = prompt(
      'Congratulations! You got a score of ' +
        endScore +
        ' in ' +
        atime +
        '! Enter your name for the record book!'
    );
  }
  // if top ten isnt full yet
  else if (topTenList.length < 10) {
    playerName = prompt(
      'Congratulations! You got a score  of ' +
        endScore +
        ' in ' +
        atime +
        '! Enter your name for the record book!'
    );
  }
  // if top ten is full and but are bad
  else if (endScore < topTenList[topTenList.length - 1].score) {
    playerName = 'NaN';
  }
  // if you get a top ten score
  else if (endScore > topTenList[topTenList.length - 1].score) {
    console.log('a top ten score');
    playerName = prompt(
      'Congratulations! You got a score  of ' +
        endScore +
        ' in ' +
        atime +
        '! Enter your name for the record book!'
    );
  }
  return playerName;
}

function count(list, value) {
  let counter = 0;
  for (let i = 0; i < list.length; i++) {
    if (list[i] === value) {
      counter += 1;
    }
  }
  return counter;
}

export { playGame };
