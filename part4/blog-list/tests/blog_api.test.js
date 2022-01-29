const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const Blog = require("../models/blog")
const api = supertest(app)
const bcrypt = require("bcrypt")
const User = require("../models/user")
const helper = require("./test_helper")

const initialBlogs = [
  {
    title: "Bloggy Blog",
    author: "Liam Carnahan",
    url: "bloggyblog.com",
    likes: 12,
  },
  {
    title: "another blog",
    author: "Liam Carnahan",
    url: "qwerty.com",
    likes: 36,
  },
]

describe("when there are initially some blogs saved", () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
  })

  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/)
  })

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs")

    expect(response.body).toHaveLength(initialBlogs.length)
  })

  test("unique identifier of blogs is named 'id'", async () => {
    const response = await api.get("/api/blogs")
    response.body.forEach((blog) => {
      expect(blog.id).toBeDefined
    })
  })
})

describe("addition of a blog", () => {
  test("a valid blog can be added", async () => {
    const newBlog = {
      title: "Blooooooog",
      author: "Liam Carnahan",
      url: "blog.com",
      likes: 15,
    }

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/)

    const response = await api.get("/api/blogs")
    const blogTitles = response.body.map((blog) => blog.title)

    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(blogTitles).toContain("Blooooooog")
  })
})

describe("missing components", () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
  })

  test("missing 'likes' property defaults to 0", async () => {
    const blogMissingLikes = {
      title: "No one likes this blog",
      author: "Liam",
      url: "nolikes.blog",
    }

    await api
      .post("/api/blogs")
      .send(blogMissingLikes)
      .expect(200)
      .expect("Content-Type", /application\/json/)

    const response = await api.get("/api/blogs")
    const noLikesBlog = response.body.find(
      (blog) => blog.title === "No one likes this blog"
    )

    expect(noLikesBlog.likes).toBeDefined()
    expect(noLikesBlog.likes).toEqual(0)
  })

  test("missing 'title' and 'url' properties results in code 400 Bad Request", async () => {
    const blog400 = {
      author: "Liam Carnahan",
      likes: 4,
    }

    await api.post("/api/blogs").send(blog400).expect(400)

    const response = await api.get("/api/blogs")

    expect(response.body).toHaveLength(initialBlogs.length)
  })
})

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash("sekret", 10)
    const user = new User({ username: "root", passwordHash })

    await user.save()
  })

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: "lcarnahan",
      name: "Liam Carnahan",
      password: "testpassword",
    }

    await api
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map((u) => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "testpassword",
    }

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)

    expect(result.body.error).toContain("`username` to be unique")

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test("creation fails with proper status code and message if username is too short", async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: "LC",
      name: "Liam Carnahan",
      password: "testpassword",
    }

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)

    expect(result.body.error).toContain(
      "is shorter than the minimum allowed length"
    )

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test("creation fails with proper status code and message if password is too short", async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: "lcarnahan",
      name: "Liam Carnahan",
      password: "pw",
    }

    const result = await api
      .post("/api/users")

      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)

    expect(result.body.error).toContain(
      "Password must be at least 3 characters."
    )

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
