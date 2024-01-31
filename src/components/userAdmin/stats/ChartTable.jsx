import React from "react";
import Loader from "../../shared/Loader";
import ChartContainer from "./ChartContainer";

function ChartTable({
  data,
  handleFilterClick,
  initialStartDate,
  initialEndDate,
  error,
  loading,
}) {
  // Renders a group of charts, treir errors and loading animation

  return (
    <>
      {Object.keys(data).length > 0 &&
        Object.keys(data).map((key) => (
          <div className="item" key={key}>
            <ChartContainer
              dataset={data[key]}
              label={key}
              handleFilterClick={handleFilterClick}
              initialStartDate={initialStartDate}
              initialEndDate={initialEndDate}
            />
          </div>
        ))}
      <div className="item-aux">
        {loading && <Loader />}
        {error && <p className="error top-element">{error}</p>}
      </div>
    </>
  );
}

export default ChartTable;
