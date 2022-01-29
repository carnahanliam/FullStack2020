import React from "react"
import PropTypes from "prop-types"

const LoginForm = ({
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
  handleSubmitLogin,
}) => (
  <div>
    <h2>Log into application</h2>
    <form onSubmit={handleSubmitLogin}>
      <div>
        username
        <input id="username" value={username} onChange={handleUsernameChange} />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  </div>
)

LoginForm.propTypes = {
  handleSubmitLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

export default LoginForm
