import React from "react"
import { connect } from "react-redux"

const Notification = (props) => {
  const visibleStyle = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  }

  const invisibleStyle = {
    display: "none",
  }

  const styleUsed = props.notification === "" ? invisibleStyle : visibleStyle

  return <div style={styleUsed}>{props.notification}</div>
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification.message,
  }
}

const ConnectedNotification = connect(mapStateToProps, null)(Notification)

export default ConnectedNotification
