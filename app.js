var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
const Blog = require("./models/blog");
const emailvalidator = require("email-validator");

var app = express();
app.set("view engine", "ejs");
app.set('views', 'views');

var urlencodedParser = bodyParser.urlencoded({ extended: true });

//connect mongodb
const dbURI =
  "mongodb+srv://form:forn@cluster0.m3bbj.mongodb.net/Users?retryWrites=true&w=majority";

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log("connected db..."))
  .catch((err) => console.log("error"));

app.get("/", function (req, res) {
  res.render("index");
});


app.post("/", urlencodedParser, async (req, res) => {
  const blogInfo = req.body;

  if(emailvalidator.validate(blogInfo.Email)){
    
  }else{
    return res.status(400).send('Invalid Email');
  }
  const email = await Blog.findOne({ Email: blogInfo.Email })

  if (email !== null) {
    return res.send('email is already exist')
     
  }
  const blog = new Blog({
    Name: blogInfo.Name,
    Email: blogInfo.Email,
    password: blogInfo.password,
    address: blogInfo.Address,
    country: blogInfo.country,
    state: blogInfo.state,
    city: blogInfo.city,
    Zipcode: blogInfo.Zipcode,
    gender: blogInfo.Gender,
  });
  await blog.save();

  res.send('Form submitted!!!!');
});

app.listen(3000);
