import React, { useState } from "react";
import ChartComponent from "./ChartComponent";

function ChartContainer({
  dataset,
  label,
  handleFilterClick,
  initialStartDate,
  initialEndDate,
}) {
  const [type, setType] = useState("bar");
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);

  const handleDateChange = (dateType, value) => {
    // Función para manejar cambios en la fecha y hora
    if (dateType === "start") {
      setStartDate(value);
    } else if (dateType === "end") {
      setEndDate(value);
    }
  };

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
        position: "top",
      },
      title: {
        display: true,
        text: label,
      },
    },
  };

  if (dataset.length === 0) {
    return <div>There is no data to show</div>;
  }

  return (
    <>
      <div className="options">
        <div className="type-chart">
          <label htmlFor="type">Chart type: </label>
          <select
            id="type"
            name="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
          <option value="bar">Bar</option>
          <option value="line">Line</option>
          </select>
        </div>
          
        <div className="date-filter">
          <div className="dates">
            <label htmlFor="start-date">Start Date: </label>
            <input
              type="datetime-local"
              id="start-date"
              value={startDate}
              onChange={(e) => handleDateChange("start", e.target.value)}
            />
            <label htmlFor="end-date">End Date: </label>
            <input
              type="datetime-local"
              id="end-date"
              value={endDate}
              onChange={(e) => handleDateChange("end", e.target.value)}
            />          
          </div>
          <div className="filter-button">
            <button onClick={() => handleFilterClick(startDate, endDate, label)}>
              Filter
            </button>
          </div>
        </div>
        
      </div>

      <ChartComponent data={data} options={options} chartType={type} />
    </>
  );
}

export default ChartContainer;
