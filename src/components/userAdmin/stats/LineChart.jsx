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
    labels: dataset.map((data) => data.turn_number),
    datasets: [
      {
        label: "Waiting time",
        data: dataset.map((data) => data.waiting_time),
        backgroundColor: [
          "rgba(75,192,192,1)",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
      {
        label: "Attention time",
        data: dataset.map((data) => data.duration),
        backgroundColor: [
          "#b01d36",
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
