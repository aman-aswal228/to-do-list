const express = require("express");
const bodyParser = require("body-parser");
const date =require(__dirname + "/date.js");


const app = express();
var items = [];
var workitems =[];


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/" , function(req,res){


 var day = date.getDate();
   res.render("list" , {listTitle: day , newListItems: items});

});

app.post("/" ,function(req,res){
  console.log(req.body.list);

  item = req.body.newItem;

  if(req.body.list === "Work List"){
    workitems.push(item);
    res.redirect("/work");
  }
  else {
    items.push(item);
    res.redirect("/");
  }

});

app.get("/work" ,function(req,res){

  res.render("list" , {listTitle: "Work List" , newListItems: workitems});
});

app.listen(process.env.PORT || 3000 , function(){
  console.log("server has started at port 3000");
});
