import React from "react";
import Loader from '../../shared/Loader';
import ChartContainer from "./ChartContainer";

function ChartTable({ data, handleFilterClick, error, loading }) {
  const timer = setTimeout(() => {
    console.log(data, error)
  }, 2000);

  
  return (

    <>
      {Object.keys(data).length > 0 && (Object.keys(data).map((key) => (
        <div className="item" key={key}>
          <ChartContainer dataset={data[key]} label={key} handleFilterClick={handleFilterClick}/>
        </div>
      )))}
      <div className="item-aux">
        {loading && <Loader />}
        {error && <p className="error top-element">{error}</p>}
      </div>
      

    </>
    
  );
}

export default ChartTable;
