import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LineChart({ dataset, title }) {
  if (dataset.length === 0) {
    return <div>There is no data to show</div>;
  }

  const xAxisLabel = Object.keys(dataset[0])[0]; // Take the first key as x-axis

  const data = {
    labels: dataset.map((entry) => entry[xAxisLabel]), // x-axis
    datasets: Object.keys(dataset[0])
      .filter((key) => key !== xAxisLabel) // Filter used key for x-axis
      .map((datasetKey, index) => ({
        label: datasetKey,
        data: dataset.map((entry) => entry[datasetKey]),
        fill: false,
        backgroundColor: `rgba(${(index * 20) % 256}, ${(index * 100) % 256}, ${
          (index * 180) % 256
        }, 0.2)`,
        borderColor: `rgba(${(index * 20) % 256}, ${(index * 100) % 256}, ${
          (index * 180) % 256
        }, 1)`,
      })),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  return <Line data={data} options={options} />;
}

export default LineChart;
