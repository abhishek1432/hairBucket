//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
require('dotenv').config();
const api_key=process.env.API_KEY;
const list_id=process.env.LIST_ID;
console.log("abhishek:"+api_key);
console.log("https://us17.api.mailchimp.com/3.0/lists/"+list_id);
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  //res.sendfile(__dirname + "/signup.html")
  res.sendfile(__dirname + "/index2.html")
})
//log user input
app.post("/", function(req, res) {
  const name = req.body.FullName;
  const mob = req.body.Mobile;
  const email = req.body.Email;

  const plan = req.body.Plan;

  const visit = req.body.dateOfVisit;

  const data =
  {
    members:
    [
      {
        email_address: email,
        status: "subscribed",

        merge_fields:
        {
        NAME: name,
        PHONE: mob,
        PLAN:plan,

        VISIT: visit
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);
const api_key=process.env.API_KEY;
const list_id=process.env.LIST_ID;
  const url = "https://us17.api.mailchimp.com/3.0/lists/"+list_id;
console.log("hello");
  const options = {
    method: "POST",

    auth: "abhishek:"+api_key
  }

  const request = https.request(url, options, function(response) {

if (response.statusCode===200){
  res.sendFile(__dirname+"/success.html");
}
else{
  res.sendFile(__dirname+"/failure.html");
}
    response.on("data", function(data) {
      console.log(JSON.parse(data));
    })
  })
  request.write(jsonData);
  request.end();

});
app.post("/failure",function(req,res){
  res.redirect("/")
});

app.post("/success",function(req,res){
  res.redirect("/")
});

app.post("/signup",function(req,res){
  res.sendFile(__dirname+"/signup.html")
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running on port 3000");

});
