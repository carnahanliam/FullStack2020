import React from "react"

const Notification = ({ message }) => {
  if (message === null) {
    return null
  } else if (message.includes("Wrong")) {
    return <div className="error">{message}</div>
  }

  return <div className="message">{message}</div>
}

export default Notification
