import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js';

import './style.scss';

const ScoreGraph = ({ gameScore, title }) => {
  const borderStyle = 'rgba(54, 162, 235, 0.2)';

  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gameScore.length > 0 ? canvasRef.current.getContext('2d'): '';
    // eslint-disable-next-line no-unused-vars
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [...gameScore].map((item, index) => `попытка номер ${index +1}`),
        datasets: [
          {
            label: false,
            display: false,
            data: gameScore,
            backgroundColor: borderStyle,
          },
        ],
      },
      options: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: title,
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
              gridLines: {
                display: false,
              },
            },
          ],
        },
      },
    });
  } );
  return (
    <>
    { gameScore.length > 0 &&
      <div className="scoreGraph">
        <canvas ref={canvasRef} className="scoreGraph__canvas" />
      </div>
    }
    </>
  );
};

export default ScoreGraph;
