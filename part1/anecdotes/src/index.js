import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Header = ({ text }) => <h1>{text}</h1>

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Most = ({ anecdotes, points }) => {
  if (Math.max(...points) === 0) {
    return (
      <div>
        No votes cast yet.
      </div>
    )
  }

  return (
    <div>
      {anecdotes[points.indexOf(Math.max.apply(Math, points))]}
    </div>
  )
}


const App = (props) => {
  const [selected, setSelected] = useState(0)

  const [points, setPoints] = useState(
    new Array(6).fill(0)
  )

  const incrementer = (index) => {
    const handler = () => {
      const newPoints = [
        ...points
      ]
      newPoints[index] += 1
      setPoints(newPoints)
    }
    return handler
  }

  return (
    <>
      <Header text='Anecdote of the day' />
      {props.anecdotes[selected]}
      <div>
        has {points[selected]} votes
      </div>
      <Button onClick={incrementer(selected)} text='vote' />
      <Button onClick={() => setSelected(Math.floor((Math.random() * 5)))} text='next anecdote' />
      <Header text='Anecdote with most votes' />
      <Most anecdotes={props.anecdotes} points={points} />
    </>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
