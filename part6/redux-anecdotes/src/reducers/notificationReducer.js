const initialState = { message: "", time: "" }
const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      clearTimeout(state.time)
      return action.data
    case "REMOVE_NOTIFICATION": {
      const clearState = initialState
      return clearState
    }
    default:
      return state
  }
}

export const clearNotification = () => {
  return {
    type: "REMOVE_NOTIFICATION",
  }
}

export const setNotification = (message, time) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_NOTIFICATION",
      data: {
        message,
        time: setTimeout(() => {
          dispatch(clearNotification())
        }, time * 1000),
      },
    })
  }
}

export default notificationReducer
