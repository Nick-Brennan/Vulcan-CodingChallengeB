var express = require("express");
var app = express();
var session = require("express-session");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var uuid = require("uuid");
var path = require("path");
var views = path.join(process.cwd(), "views/");
var db = require("./models");

app.use(cookieParser());
app.use("/static", express.static("public"));
app.use("/vendor", express.static("bower_components"));
app.use(session({
	// genid: function(req) {
	//     return uuid.v1();
 //  	},
	secret: "notsecure",
	resave: false,
	saveUninitialized: true
}));

app.get('/', function(req, res){
	console.log(req.sessionID);
	res.sendFile(views + "main.html");
});

app.listen(process.env.PORT || 3000, function(){
	console.log("PVP Game is running on port: " + (process.env.PORT || 3000));
});