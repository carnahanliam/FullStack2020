const app = require("./app");
const http = require("http");
const config = require("./utils/config");
const logger = require("./utils/logger");

const server = http.createServer(app);

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});

// const express = require("express");
// const app = express();
// const cors = require("cors");
// require("dotenv").config();

// const Blog = mongoose.model("Blog", blogSchema);

// const mongoUrl = process.env.MONGODB_URI;
// mongoose.connect(mongoUrl, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
//   useCreateIndex: true,
// });

// app.use(cors());
// app.use(express.json());

// const PORT = process.env.PORT;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
