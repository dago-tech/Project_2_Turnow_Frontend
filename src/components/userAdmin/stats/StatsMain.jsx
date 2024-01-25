import React, { useEffect, useState } from 'react'
import LineChart from './LineChart'
import { getData } from '../../../helpers/axios';
import { errorMessage } from '../../../helpers/errorMessage';
import Loader from '../../shared/Loader';
import '../../../styles/stats.css'

function StatsMain() {

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    getData("stats/waiting_time/?start_date=2024-01-01&end_date=2024-01-30")
      .then((response) => {
        setData(response);
        console.log(response)
      })
      .catch((error) => {
        setError(errorMessage(error));
      })
      .finally(() => {
        setLoading(false);
      });

  }, []);


  return (
    <div>
        StatsMain
        <div className='line-chart'>
          {loading && <Loader />}
          {error && <p className="error">{error}</p>}
          {data && (
            <LineChart dataset={data} title={"Waiting and attention time"}/>
          )}
        
        </div>
        
    </div>
  )
}

export default StatsMain