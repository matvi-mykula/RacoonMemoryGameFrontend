const { useState, useEffect, useRef } = require('react');

function StopWatch(props) {
  const [time, setTime] = useState(0);
  useEffect(() => {
    let interval = null;
    if (props.isActive) {
      interval = setInterval(() => {
        setTime((atime) => atime + 10);
      }, 10);
    } else if (!props.isActive) {
      console.log({ time });
      //   props.setElapsedTime(time);
      //   console.log(props.elapsedTime);
      let aTime = time;
      // props.setElapsedTime(aTime);

      console.log('stop watch timer');
      //   console.log(props.elapsedTime); //not updated yet
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
      setTime(0);
    };
  }, [props.isActive]);

  useEffect(() => {
    console.log(props.elapsedTime);
  }, [props.elapsedTime]);

  return (
    <div className="stop-watch">
      <div className="timer">
        <span className="digits">
          {('0' + Math.floor((time / 60000) % 60)).slice(-2)}:
        </span>
        <span className="digits">
          {('0' + Math.floor((time / 1000) % 60)).slice(-2)}.
        </span>
        <span className="digits mili-sec">
          {('0' + ((time / 10) % 100)).slice(-2)}
        </span>
      </div>
    </div>
  );
}

export { StopWatch };
