import React from 'react'
import PersonDetails from './PersonDetails'

const Persons = ({ personsToShow }) => {
  return (
    <div>
      {personsToShow.map((person) =>
          <PersonDetails key={person.name} person={person} />
        )}
    </div>
  )
}

export default Persons