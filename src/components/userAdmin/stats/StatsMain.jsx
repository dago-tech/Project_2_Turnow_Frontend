import React from 'react'
import LineChart from './LineChart'
import { UserData } from "./data"
import "../../../styles/stats.css"

function StatsMain() {


  return (
    <div>
        StatsMain
        <div className='line-chart'>
          <LineChart dataset={UserData}/>
        </div>
        
    </div>

    
  )
}

export default StatsMain