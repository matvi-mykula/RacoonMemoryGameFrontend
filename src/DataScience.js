// import {
//   Chart as ChartJS,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import React from 'react';
// import Chart from 'chart.js/auto';
// import { Line, Scatter } from 'react-chartjs-2';
// import { fetchAllScores } from './RouteSwitch';
// import { useState, useEffect } from 'react';

// // const LineChart = () => {
// //   let response;
// //   const [dataResponse, setDataResponse] = useState([]);

// //   async function wrapperFunction() {
// //     const aResponse = await fetchAllScores();
// //     console.log(aResponse);
// //     response = aResponse;
// //     let dataPoints = [];
// //     for (let i = 0; i < response.length; i++) {
// //       dataPoints.push({ x: response[i].time, y: response[i].score });
// //     }
// //     // await setDataResponse(aResponse);
// //     // console.log(dataResponse);
// //     return dataPoints;
// //   }
// //   //   console.log(wrapperFunction());

// //   response = useEffect(() => {
// //     setDataResponse(wrapperFunction()); // contains fetchHighScores
// //     // console.log('top ten');
// //     // console.log(props.topTen);
// //   }, []);
// //   //   response = wrapperFunction();

// //   console.log(dataResponse);
// //   //   async aFunc() {
// //   //     let dataPoints = [];
// //   //     const response = await fetchAllScores();
// //   //     for (let i = 0; i < dataResponse.length; i++) {
// //   //       dataPoints.push({ x: response[i].time, y: response[i].score });
// //   //     }
// //   //   };

// //   //   console.log(dataPoints);
// //   const data = {
// //     type: 'scatter',
// //     datasets: [
// //       {
// //         label: 'My First dataset',
// //         fill: true,
// //         lineTension: 0.5,
// //         backgroundColor: 'rgb(255, 99, 132)',
// //         borderColor: 'rgb(255, 99, 132)',
// //         data: dataResponse,
// //       },
// //     ],
// //     // options: {
// //     //   hover: {
// //     //     mode: 'nearest',
// //     //     intersect: true,
// //     //   },
// //     //   scales: {
// //     //     x: { type: 'linear', position: 'bottom' },
// //     //     // yAxes: [
// //     //     //   {
// //     //     //     ticks: {
// //     //     //       beginAtZero: true,
// //     //     //     },
// //     //     //   },
// //     //     // ],
// //     //   },
// //     // },
// //   };

// //   //   const ctx = document.getElementById('chartDiv');
// //   //   const scatter = new Chart(ctx, data);
// //   return (
// //     <div className="chartContainer">
// //       <Scatter
// //         data={data}
// //         options={{
// //           plugins: {
// //             title: {
// //               display: true,
// //               text: 'ChartTitle',
// //             },
// //           },
// //         }}
// //       />
// //     </div>
// //   );
// // };

// ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

// export const options = {
//   scales: {
//     y: {
//       beginAtZero: true,
//     },
//   },
// };

// async function wrapperFunction() {
//   const aResponse = await fetchAllScores();
//   console.log(aResponse);
//   let dataPoints = [];
//   for (let i = 0; i < aResponse.length; i++) {
//     dataPoints.push({ x: aResponse[i].time, y: aResponse[i].score });
//   }
//   // await setDataResponse(aResponse);
//   // console.log(dataResponse);
//   return dataPoints;
// }

// export const data = {
//   datasets: [
//     {
//       label: 'A dataset',
//       data: Array.from(wrapperFunction()),
//       backgroundColor: 'rgba(255, 99, 132, 1)',
//     },
//   ],
// };

// function LineChart() {
//   return (
//     <Scatter
//       options={options}
//       data={data}
//     />
//   );
// }

import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import { fetchAllScores } from './RouteSwitch';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

export const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

function LineChart() {
  let response;
  const [dataResponse, setDataResponse] = useState([]);

  async function wrapperFunction() {
    const aResponse = await fetchAllScores();
    console.log(aResponse);
    response = aResponse;
    let dataPoints = [];
    for (let i = 0; i < response.length; i++) {
      dataPoints.push({ x: response[i].time / 1000, y: response[i].score });
    }
    // await setDataResponse(aResponse);
    // console.log(dataResponse);
    return dataPoints;
  }
  useEffect(() => {
    wrapperFunction()
      .then((dataResponse) => setDataResponse(dataResponse))
      .catch((error) => {
        console.log('error');
      }); // contains fetchHighScores
    // console.log('top ten');
    // console.log(props.topTen);
  }, []);
  console.log(dataResponse);
  const data = {
    datasets: [
      {
        label: 'Scores and Time Elapsed',
        data: dataResponse,
        backgroundColor: 'rgba(255, 99, 132, 1)',
      },
    ],
  };
  console.log(dataResponse);
  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Seconds Elapsed',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Score',
        },
        //   beginAtZero: true,
        //   display: true,
        scaleLabel: {
          display: true,
          labelString: 'something',
        },
      },
    },
  };
  console.log(data);
  return (
    <Scatter
      options={options}
      data={data}
    />
  );
}
export { LineChart };
