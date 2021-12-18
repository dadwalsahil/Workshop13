var express = require('express');
var mongoose = require('mongoose');
var cron = require('node-cron');
var fs = require('fs');
const Userroute = require("./route/user");
var app = express();
const bodyParser = require("body-parser");



mongoose.connect("mongodb://localhost:27017/Empdata", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", (connected) => {
    console.log("connection with database");
  });

var currentdate = new Date(); 
var datetime =  + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();

cron.schedule(" * * * * *"  , ()=>{
    fs.appendFile('log.txt', "Welcome To LeewayHertz  ", function (err) {        
        if (err) {
          console.warn(err);
        } else {
          console.log("Printed In Log.txt after every minute" +datetime);
        }
      });
});

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use("/user",Userroute);

app.listen(2000,()=>{
    console.log("server is runniug on port 2000")
});


