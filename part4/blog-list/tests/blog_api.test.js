const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const api = supertest(app);
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
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(initialBlogs.length);
});

test("unique identifier of blogs is named 'id'", async () => {
  const response = await api.get("/api/blogs");
  response.body.forEach((blog) => {
    expect(blog.id).toBeDefined;
  });
});

test("a valid blog can be added", async () => {
  const newBlog = {
    title: "Blooooooog",
    author: "Liam Carnahan",
    url: "blog.com",
    likes: 15,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  const blogTitles = response.body.map((blog) => blog.title);

  expect(response.body).toHaveLength(initialBlogs.length + 1);
  expect(blogTitles).toContain("Blooooooog");
});

test("missing 'likes' property defaults to 0", async () => {
  const blogMissingLikes = {
    title: "No one likes this blog",
    author: "Liam",
    url: "nolikes.blog",
  };

  await api
    .post("/api/blogs")
    .send(blogMissingLikes)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  const noLikesBlog = response.body.find(
    (blog) => blog.title === "No one likes this blog"
  );

  expect(noLikesBlog.likes).toBeDefined();
  expect(noLikesBlog.likes).toEqual(0);
});

test("missing 'title' and 'url' properties results in code 400 Bad Request", async () => {
  const blog400 = {
    author: "Liam Carnahan",
    likes: 4,
  };

  await api.post("/api/blogs").send(blog400).expect(400);

  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(initialBlogs.length);
});

afterAll(() => {
  mongoose.connection.close();
});
