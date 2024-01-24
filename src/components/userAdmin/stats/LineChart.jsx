import React from "react";
import { Line } from "react-chartjs-2";
/*Importacion de componentes necesarios para renderizar el gráfico */
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LineChart({ dataset }) {

  const data = {
    labels: dataset.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained",
        data: dataset.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  }

  return (
    <Line data={data}/>
  );
}

export default LineChart;
