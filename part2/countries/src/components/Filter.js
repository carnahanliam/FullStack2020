import React from "react";

const Filter = (props) => {
  return (
    <p>
      find countries
      <input value={props.value} onChange={props.onChange} />
    </p>
  );
};

export default Filter;
