//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require('lodash');

mongoose.connect("mongodb://127.0.0.1:27017/blog-page" , {useNewUrlParser : true});

const composeDetails = [];


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vesthhbdvbfvnofdnbdfnbofdnbdofnbdofbindfsbisdfmbifdbispfdmbfdpmbdfmbdfbmpifdbmdibmdfbmdfobigfibmoigjbdoibnodhdfijgidhgnsv  j hi my name is Ankit Dey I would love say something about my lifes history today in front of everyone it is smething that i have been dieing to share with everyone bcz people can leanrn a lot from it as my past days were full off struggle specially not for me its was my father who did the maximum struggle for me ibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const composeSchema = new mongoose.Schema({
  name : String,
  blogPost : String
});

const List = new mongoose.model("List",composeSchema);

app.get("/",function(req,res){
  List.find({})
    .then(function(postList){
      res.render('home',{
        homeContent:homeStartingContent,
        newPost: postList});
    }).catch((err)=> console.log(err));
});

app.get('/post/:postId', (req, res) => {
  const routeid = req.params.postId;

  List.findOne({_id : routeid})
    .then(function(listItem){
      res.render("post",{
        newheading : listItem.name,
        newcontent : listItem.blogPost
      });
    }).catch((err)=>console.log(err));
  // composeDetails.forEach(function(composeDetail){

  //   const storedTitle = _.lowerFirst(composeDetail.name);

  //   if(routedata===storedTitle){
  //     res.render("post",{
  //       newheading : composeDetail.name,
  //       newcontent : composeDetail.blogPost
  //     })
      
  //   }

  // });
});

app.get("/about",function(req,res){
  res.render('about',{about:aboutContent});
});


app.get("/contact",function(req,res){
  res.render('contact',{contact:contactContent});
});

app.get("/compose",function(req,res){
  res.render('compose');
 
});



app.post("/compose",function(req,res){
   const heading = req.body.journalPost;
   const title = req.body.journalTitle;
   const newPost = new List({
    name : heading,
    blogPost : title
   });
   newPost.save()
    .then(()=>res.redirect("/")) 
    .catch((err)=>console.log(err)); 
  
 
});




app.listen(3000, function() {
  console.log("Server started on port 3000");
});


// <% for(let i =0;i<newPost.length;i++){ %>
//   <h1> <%= newPost[i].postPost %> </h1>
//   <p> 
//     <%= newPost[i].postTitle.substring(0,100) + "..." %>
//     <a href="/post/<%=newPost[i].postPost%>">Read more</a>
//   </p>
// <%}%>
    