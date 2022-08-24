//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const homeStartingContent = "Blog website for you where you will find articles about MERN stack.This guide will provide you with useful information and actionable steps, but if you truly want to dominate the competition and secure a high-paying job as a full-stack software developer, this blog is the anwser. We will posting content on regular basis. MERN Stack is a Javascript Stack that is used for easier and faster deployment of full-stack web applications. MERN Stack comprises of 4 technologies namely: MongoDB , Express , React and Node. js . It is designed to make the development process smoother and easier The MERN architecture allows you to easily construct a 3-tier architecture (frontend, backend, database) entirely using JavaScript and JSON Using these four technologies you can create absolutely any application that you can think of everything that exists in this world today. Now let’s understand each technology one by one.";
const aboutContent = "I am Pulkit, Student of IIIT Lucknow and I have a good grip on Data Stuctures and Algorithm. I am currently learning MERN stack to build my skills in development. I have made some basic projects like blog websites, ToDo List and js games. Currently i am working on a team project to implement some new ideas and to learn to work in team and improve personalities and social skills.";
const contactContent = "If you want to connect then you can drop a mail to: pulkitgupta045@gmail.com or can message to me to my Linkeldin: https://www.linkedin.com/in/pulkit-gupta-07bb85200/ .";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://pulkit045:pulkit045@cluster0.w9wiqfv.mongodb.net/blogDB");

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });


  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});


let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

app.listen(port, function() {
  console.log("Server started on port 3000");
});