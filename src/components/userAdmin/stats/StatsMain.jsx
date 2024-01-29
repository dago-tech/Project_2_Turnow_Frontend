import React, { useEffect, useState } from "react";
import { getData } from "../../../helpers/axios";
import { errorMessage } from "../../../helpers/errorMessage";
import ChartTable from "./ChartTable";
import { utcToZonedTime } from "date-fns-tz";
import { format } from "date-fns";
import "../../../styles/stats.css";

function StatsMain() {
  const [data, setData] = useState({});
  const [initialStartDate, setInitialStartDate] = useState("");
  const [initialEndDate, setInitialEndDate] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkboxes = [
    { label: "Turns", endpoint: "stats/waiting_time/" },
    { label: "AVG times by Service desks", endpoint: "stats/waiting_time/desk/" },
    { label: "AVG times by Categories", endpoint: "stats/waiting_time/category/" },
    { label: "AVG times by Priorities", endpoint: "stats/waiting_time/priority/" },
    { label: "Turn Count by Service desks", endpoint: "stats/turn_count/desk/" },
    { label: "Turn Count by Categories", endpoint: "stats/turn_count/category/" },
    { label: "Turn Count by Priorities", endpoint: "stats/turn_count/priority/" },
  ];

  const [activeCheckboxes, setActiveCheckboxes] = useState([]); // Estado para rastrear los checkboxes activos

  useEffect(() => {
    // API request when activeCheckboxes changes
    getInitialDates();
    activeCheckboxes.forEach((index) => {
      const { endpoint, label } = checkboxes[index];
      if (!data[label]) {
        setLoading(true);
        getDataSet(
          `${endpoint}?start_date=${initialStartDate}&end_date=${initialEndDate}`,
          label
        );
      }
    });
  }, [activeCheckboxes]);

  const getInitialDates = () => {
    // Get initial dates to filter last week data in each chart
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7); 
    const zonedEndDate = utcToZonedTime(endDate, "America/New_York");
    const zonedStartDate = utcToZonedTime(startDate, "America/New_York");
    const formattedEndDate = format(zonedEndDate, "yyyy-MM-dd'T'HH:mm");
    const formattedStartDate = format(zonedStartDate, "yyyy-MM-dd'T'HH:mm");
    setInitialStartDate(formattedStartDate);
    setInitialEndDate(formattedEndDate);
  };

  const getDataSet = async (endpoint, label) => {
    // API request
    try {
      const response = await getData(endpoint);
      setData((prevData) => ({ ...prevData, [label]: response }));
      console.log(response);
    } catch (error) {
      setError(errorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (index) => {
    const updatedCheckboxes = [...activeCheckboxes];
    const { endpoint, label } = checkboxes[index];
    const checkboxIndex = updatedCheckboxes.indexOf(index);

    if (checkboxIndex === -1) {
      // If checkbox is not in the list, add it
      updatedCheckboxes.push(index);
    } else {
      // If checkbox is the list, remove it
      updatedCheckboxes.splice(checkboxIndex, 1);
      const { [label]: deletedEntry, ...restData } = data;
      setData(restData);
      setError(null);
    }
    setActiveCheckboxes(updatedCheckboxes);
  };

  const handleFilterClick = (startDate, endDate, label) => {
    const checkbox = checkboxes.find((el) => el.label === label);
    const endpoint = checkbox.endpoint;

    if (startDate && endDate) {
      const filteredEndpoint = `${endpoint}?start_date=${startDate}&end_date=${endDate}`;
      setLoading(true);
      getDataSet(filteredEndpoint, label);
    }
  };

  return (
    <div className="container">
      <h2>Statistics</h2>
      <div className="checkbox">
        {checkboxes.map((checkbox, index) => (
          <label key={index}>
            <input
              type="checkbox"
              checked={activeCheckboxes.includes(index)}
              onChange={() => handleCheckboxChange(index)}
            />
            {` ${checkbox.label}`}
          </label>
        ))}
      </div>

      <div className="chart-container">
        <ChartTable
          data={data}
          handleFilterClick={handleFilterClick}
          initialStartDate={initialStartDate}
          initialEndDate={initialEndDate}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default StatsMain;
