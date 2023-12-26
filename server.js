const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;
const methodOverride = require("method-override");

const blogRoutes = require("./routes/blogRoutes");
const Blog = require("./models/BlogPost");
const dotenv = require('dotenv');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

mongoose.connect('mongodb+srv://ananyaverma0205:sywfJgnsQ9Tiysv1@cluster0.e05wpom.mongodb.net/')
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((err) => {
    console.error('Error connecting to the database', err);
  });

// Lets set template engine
app.set("view engine", "ejs");
// set() is a method that is used to set a value for a key
app.use(express.urlencoded({ extended: false }));
// use() is a method that is used to use a middleware
// express.urlencoded() is a middleware that is used to parse the data sent by the user
app.use(methodOverride("_method"));
// methodOverride() is a middleware that is used to override the method

// Route for index
app.get("/", async (req, res) => {
  const blogRoutes = await Blog.find().sort({ timeCreated: "desc" });
  // find() => this method finds and returns all documents that match the query criteria.
  // sort() => this method sorts the documents in the collection.
  res.render("index", { blogRoutes: blogRoutes });
});
app.use(express.static("public"));
// use() is a method that is used to use a middleware
// express.static() is a middleware that is used to serve static files
app.use("/blogRoutes", blogRoutes);

var port = process.env.PORT || 5000;
app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Server listening on port http://localhost:${port}`);
});
