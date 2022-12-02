const { useState, useEffect, useRef } = require('react');

// function StopWatch(props) {
//   //   const [time, setTime] = useState(0);
//   const time = useRef(0);
//   var lastUpdate = Date.now();
//   useEffect(() => {
//     let interval = null;
//     if (props.isActive) {
//       interval = setInterval(() => {
//         var now = Date.now();
//         var dt = now - lastUpdate;
//         time.current = time.current + dt;

//         lastUpdate = now;
//         console.log(dt, time);
//       }, 1000);
//     } else if (!props.isActive) {
//       props.setElapsedTime(time.current);
//       console.log(time.current);
//       console.log('stop watch timer');
//       console.log(props.elapsedTime);
//       clearInterval(interval);
//       //   time.current = 0;
//     }
//     return () => {
//       clearInterval(interval);
//     };
//   }, [props.isActive]);

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
      props.setElapsedTime(time);
      console.log(props.elapsedTime);
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

  //   useEffect(() => {
  //     let interval = null;
  //     if (props.isActive) {
  //       interval = setInterval(() => {
  //         let atime = props.elapsedTime;
  //         props.setElapsedTime((atime += 10));
  //         console.log(props.elapsedTime);
  //       }, 10);
  //     } else if (!props.isActive) {
  //       console.log('stop watch timer');
  //       console.log(props.elapsedTime);
  //       clearInterval(interval);
  //     }
  //     return () => {
  //       clearInterval(interval);
  //       //   props.setElapsedTime(0);
  //     };
  //   }, [props.isActive]);

  //   useEffect(( ) => {
  //     gameStart()
  //   }, [])
  //   const gameStart = () => {
  //     const gameStartInternal = setInterval(() => {
  //             setElapsedTime((oldTime) => {
  //                 console.log(oldTime)
  //                 if (!props.isActive) {

  //                 }
  //             })
  //     })
  //   }

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
