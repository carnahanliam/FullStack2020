import React from 'react'

const Filter = (props) => {
  return (
    <p>
      filter shown with
      <input
        value={props.value}
        onChange={props.onChange}
      />
    </p>
  )
}


export default Filter