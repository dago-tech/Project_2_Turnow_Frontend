import React from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartComponent = ({ data, options, chartType }) => {
  // Utiliza la variable chartType para decidir qué tipo de gráfico renderizar
  const ChartToRender = chartType === "line" ? Line : Bar;

  return (
    <>
      <ChartToRender data={data} options={options} />
    </>
  );
};

export default ChartComponent;