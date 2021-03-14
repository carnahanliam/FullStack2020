import React from 'react'

const PersonForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        {props.nameText}
        <input
          value={props.nameValue}
          onChange={props.onNameChange}
        />
      </div>
      <div>
      {props.numberText}
        <input
          value={props.numberValue}
          onChange={props.onNumberChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm