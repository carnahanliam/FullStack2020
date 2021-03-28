import React from "react";

const Persons = ({ person, deletePerson }) => {
  return (
    <div>
      {person.name} {person.number}
      {/* <button onClick={deletePerson}>Delete</button> */}
      <button
        onClick={() => {
          if (window.confirm(`Delete ${person.name}?`)) deletePerson();
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default Persons;
