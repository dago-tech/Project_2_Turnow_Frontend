import React, { useEffect, useState } from 'react'
import { getData } from '../../../helpers/axios';
import { errorMessage } from '../../../helpers/errorMessage';
import '../../../styles/stats.css'
import ChartTable from './ChartTable';
import { utcToZonedTime } from 'date-fns-tz';
import { format } from 'date-fns';

function StatsMain() {

  const [data, setData] = useState({});
  const [initialStartDate, setInitialStartDate] = useState('');
  const [initialEndDate, setInitialEndDate] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkboxes = [
    { label: 'Turns', endpoint: 'stats/waiting_time/' },
    { label: 'Service desks', endpoint: 'stats/waiting_time_desk/' },
    { label: 'waiting3', endpoint: 'stats/waiting_time_desk/' },
    { label: 'waiting4', endpoint: 'stats/waiting_time_des/' },
    { label: 'W5', endpoint: 'stats/waiting_time_desk/' },
  ];

  const [activeCheckboxes, setActiveCheckboxes] = useState([]); // Estado para rastrear los checkboxes activos

  const getDataSet = async (endpoint, label) => {
    // API request
    try {
      const response = await getData(endpoint);
      setData((prevData) => ({ ...prevData, [label]: response }));
      console.log(response)
    } catch (error) {
      setError(errorMessage(error));
    } finally {
      setLoading(false);      
    }
  };

  useEffect(() => {

    //Obtener la fecha actual
    const fechaActual = new Date();
    const fechaAnterior = new Date();
    fechaAnterior.setDate(fechaAnterior.getDate() - 7);
    const currentFechaGMT5 = utcToZonedTime(fechaActual, "America/New_York");
    const beforeFechaGMT5 = utcToZonedTime(fechaAnterior, "America/New_York");
    const currentFormattedDate = format(currentFechaGMT5, "yyyy-MM-dd'T'HH:mm");
    const beforeFormattedDate = format(beforeFechaGMT5, "yyyy-MM-dd'T'HH:mm");
    console.log(currentFormattedDate, beforeFormattedDate)
    // Actualizar el estado con la fecha formateada
    setInitialStartDate(beforeFormattedDate);
    setInitialEndDate(currentFormattedDate);

    // API request when activeCheckboxes changes 
    activeCheckboxes.forEach((index) => {
      const { endpoint, label } = checkboxes[index];
      if (!data[label]) {
        setLoading(true);
        getDataSet(`${endpoint}?start_date=${initialStartDate}&end_date=${initialEndDate}`, label);
      }
    });
  }, [activeCheckboxes]);

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
      setError(null)
    }

    setActiveCheckboxes(updatedCheckboxes);
  };

  const handleFilterClick = (startDate, endDate, label) => {
    const checkbox = checkboxes.find((el) => el.label===label)
    console.log(checkbox)
    const endpoint = checkbox.endpoint
    console.log(endpoint)

    if (startDate && endDate) {
      const filteredEndpoint = `${endpoint}?start_date=${startDate}&end_date=${endDate}`;
      setLoading(true);
      getDataSet(filteredEndpoint, label);
    }
  };
  
  return (
    <div className='title'>
      <h2>Statistics</h2>
      <div className='checkbox'>
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

      <div className='container'>
        <ChartTable data={data} handleFilterClick={handleFilterClick} error={error} loading={loading} />
      </div>
      
    </div>
  )
}

export default StatsMain