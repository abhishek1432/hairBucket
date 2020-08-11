//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendfile(__dirname + "/signup.html")
})
//log user input
app.post("/", function(req, res) {
  const name = req.body.FullName;
  const mob = req.body.Mobile;
  const email = req.body.Email;
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
        VISIT: visit
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us17.api.mailchimp.com/3.0/lists/9ee9d70845";

  const options = {
    method: "POST",
    auth: "abhishek:58fb0935e4b07f613cb3c53edbd3d214-us17"
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

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running on port 3000");
});
//API Key
//58fb0935e4b07f613cb3c53edbd3d214-us17

//List ID
//9ee9d70845