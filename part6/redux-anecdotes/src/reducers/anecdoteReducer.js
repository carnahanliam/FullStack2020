import anecdoteService from "../services/anecdotes"

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE": {
      const id = action.data.id
      const votedAnecdote = state.find((a) => a.id === id)
      const changedAnecdote = {
        ...votedAnecdote,
        votes: votedAnecdote.votes + 1,
      }
      return state.map((a) => (a.id !== id ? a : changedAnecdote))
    }
    case "NEW_ANECDOTE": {
      console.log(action)
      return [...state, action.data]
    }
    case "INIT_ANECDOTES":
      return action.data
    default:
      return state
  }
}

export const addVote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.addVote(anecdote)
    dispatch({
      type: "VOTE",
      data: updatedAnecdote,
    })
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: "NEW_ANECDOTE",
      data: newAnecdote,
    })
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes,
    })
  }
}

export default anecdoteReducer
