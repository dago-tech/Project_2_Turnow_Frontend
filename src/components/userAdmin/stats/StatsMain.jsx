import React, { useEffect, useState } from 'react'
import { getData } from '../../../helpers/axios';
import { errorMessage } from '../../../helpers/errorMessage';
import '../../../styles/stats.css'
import ChartTable from './ChartTable';

function StatsMain() {

  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkboxes = [
    { label: 'waiting', endpoint: 'stats/waiting_time/?start_date=2024-01-01&end_date=2024-01-30' },
    { label: 'waiting2', endpoint: 'stats/waiting_time_des/?start_date=2024-01-01&end_date=2024-01-30' },
    { label: 'waiting3', endpoint: 'stats/waiting_time_desk/?start_date=2024-01-01&end_date=2024-01-30' },
    { label: 'waiting4', endpoint: 'stats/waiting_time_des/?start_date=2024-01-01&end_date=2024-01-30' },
    { label: 'W5', endpoint: 'stats/waiting_time_desk/?start_date=2024-01-01&end_date=2024-01-30' },
  ];

  const [activeCheckboxes, setActiveCheckboxes] = useState([]); // Estado para rastrear los checkboxes activos

  const getDataSet = async (endpoint, label) => {
    // Llama a tu API con el endpoint proporcionado
    try {
      const response = await getData(endpoint);
      //const jsonData = await response.json();
      setData((prevData) => ({ ...prevData, [label]: response }));
      console.log(response)
    } catch (error) {
      setError(errorMessage(error));
    } finally {
      setLoading(false);      
    }
  };

  useEffect(() => {
    // Llama a la API cuando se activa/desactiva un checkbox
    activeCheckboxes.forEach((index) => {
      const { endpoint, label } = checkboxes[index];
      if (!data[label]) {
        console.log("Entró a useEffect")
        setLoading(true);
        getDataSet(endpoint, label);
      }
    });
  }, [activeCheckboxes]);

  const handleCheckboxChange = (index) => {
    // Maneja el cambio de estado de los checkboxes
    const updatedCheckboxes = [...activeCheckboxes];
    const { endpoint, label } = checkboxes[index];
    const checkboxIndex = updatedCheckboxes.indexOf(index);

    if (checkboxIndex === -1) {
      // Si el checkbox no está en la lista, agrégalo
      updatedCheckboxes.push(index);
    } else {
      // Si el checkbox está en la lista, quítalo
      updatedCheckboxes.splice(checkboxIndex, 1);
      const { [label]: deletedEntry, ...restData } = data;
      setData(restData);
      setError(null)
    }
    console.log(updatedCheckboxes)

    setActiveCheckboxes(updatedCheckboxes);
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
        <ChartTable data={data} error={error} loading={loading} />
      </div>
      
    </div>
  )
}

export default StatsMain