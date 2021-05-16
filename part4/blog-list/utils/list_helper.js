const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let total = 0;
  for (let blog of blogs) {
    total += blog.likes;
  }

  return total;
};

const favoriteBlog = (blogs) => {
  const mostLiked = blogs.reduce(
    (prev, current) => (prev.likes > current.likes ? prev : current),
    0
  );

  const fav = {
    title: mostLiked.title,
    author: mostLiked.author,
    likes: mostLiked.likes,
  };

  return fav;
};

const mostBlogs = (blogs) => {
  let authors = [];
  for (let blog of blogs) {
    let authorIndex = authors.findIndex((a) => a.author === blog.author);
    if (authorIndex === -1) {
      authors.push({ author: blog.author, blogs: 1 });
    } else {
      authors[authorIndex].blogs++;
    }
  }

  const result = authors.reduce(
    (prev, current) => (prev.blogs > current.blogs ? prev : current),
    0
  );

  return result;
};

const mostLikes = (blogs) => {
  let authors = [];
  for (let blog of blogs) {
    let authorIndex = authors.findIndex((a) => a.author === blog.author);
    if (authorIndex === -1) {
      authors.push({ author: blog.author, likes: blog.likes });
    } else {
      authors[authorIndex].likes += blog.likes;
    }
  }

  const result = authors.reduce(
    (prev, current) => (prev.likes > current.likes ? prev : current),
    0
  );

  return result;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
