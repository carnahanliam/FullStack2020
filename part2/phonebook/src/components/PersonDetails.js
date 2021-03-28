import React from "react";

const PersonDetails = ({ person, deletePerson }) => {
  <div>
    {person.name} {person.number}
    <button onClick={deletePerson}>Delete</button>
  </div>;
};

export default PersonDetails;
