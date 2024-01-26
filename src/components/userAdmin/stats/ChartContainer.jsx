import React, { useState } from "react";
import ChartComponent from "./ChartComponent";


function ChartContainer({ dataset, title }) {

  const [type, setType] = useState("line");

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

  return (
    <>
      <div className="options">       
        <label htmlFor="type">Type:</label>
        <select
          id="type"
          name="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="line">Line</option>
          <option value="bar">Bar</option>
        </select>
      </div>
      <ChartComponent data={data} options={options} chartType={type}/>
    </>
  )
    
}

export default ChartContainer;
