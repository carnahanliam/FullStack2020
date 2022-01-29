import React, { useState } from "react"

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: "solid",
  borderWidth: 1,
  marginBottom: 5,
}

const Blog = ({ user, blog, like, deleteBlog }) => {
  const [showInfo, setShowInfo] = useState(false)

  const buttonLabel = showInfo ? "hide" : "view"

  return (
    <div style={blogStyle} className="blog">
      <div>
        {blog.title}
        {blog.author}
        <button onClick={() => setShowInfo(!showInfo)}>{buttonLabel}</button>
      </div>
      {showInfo && (
        <div>
          <div>{blog.url}</div>
          <div>
            likes:
            {blog.likes}
            <button onClick={like}>like</button>
          </div>
          <div>{blog.user.name}</div>
          {blog.user.username === user.username && (
            <div>
              <button onClick={deleteBlog}>remove</button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
