import React, { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import Notification from "./components/Notification"
import blogService from "./services/blogs"
import loginService from "./services/login"
import Togglable from "./components/Togglable"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem("loggedBloglistUser")
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const returnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnedBlog))
    setMessage(`A new blog '${blogObject.title}' by ${blogObject.author} added`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const likeBlog = async (id) => {
    const blog = blogs.find((b) => b.id === id)
    const likedBlog = { ...blogs, likes: blog.likes + 1 }

    const returnedBlog = await blogService.update(id, likedBlog)
    setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)))
  }

  const deleteBlog = async (id) => {
    const removedBlogTitle = blogs.filter((b) => b.id === id)[0].title
    if (window.confirm(`Remove blog '${removedBlogTitle}'?`)) {
      await blogService.remove(id)
      console.log(removedBlogTitle, "was deleted.")
      setBlogs(blogs.filter((b) => b.id !== id))
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem("loggedBloglistUser", JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername("")
      setPassword("")
    } catch (exception) {
      setMessage("Wrong username or password")
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.removeItem("loggedBloglistUser")
    setUser(null)
  }

  const loginForm = () => (
    <LoginForm
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      handleSubmitLogin={handleLogin}
    />
  )

  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={message} />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>
            {user.name} logged-in
            <button onClick={handleLogout}>logout</button>
          </p>
          {blogForm()}
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                user={user}
                blog={blog}
                like={() => likeBlog(blog.id)}
                deleteBlog={() => deleteBlog(blog.id)}
              />
            ))}
        </div>
      )}
    </div>
  )
}

export default App
