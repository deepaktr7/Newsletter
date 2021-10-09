  const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.listen(process.env.PORT || 3000,function(){
  console.log("server is running on port 3000")
})


app.get("/", function(req,res){
  res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){
  var FName = req.body.FName;
  var LName = req.body.LName;
  var Email = req.body.Email;
  console.log([FName,LName,Email]);

const data =  { members: [{
  email_address: Email,
  status: "subscribed",
  merge_fields: {
	FNAME: FName,
	LNAME: LName
  }
}]
}
var jsonData = JSON.stringify(data);
console.log(jsonData);
const key = "3573da68b931306dd051f4ef7a9f8e8e-us2";
const listId = "199fe2ad6f";

  // console.log(req.body);


const url = "https://us2.api.mailchimp.com/3.0/lists/199fe2ad6f";
const options ={
  method: "POST",
  auth: "deepaktr:3573da68b931306dd051f4ef7a9f8e8e-us2"
}

const request = https.request(url, options, function(response){

if(response.statusCode === 200){
    res.send("You have successfully subscribed for the NewsLetter !")
}else{
    res.send("Subscription was not successfull !")
}

response.on("data",function(data){
  console.log(JSON.parse(data));
})
});

request.write(jsonData);
request.end();

});

//3573da68b931306dd051f4ef7a9f8e8e-us2
//199fe2ad6f
//comment
