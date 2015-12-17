var express = require("express");
var app = express();
var session = require("express-session");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var uuid = require("uuid");
var path = require("path");
var views = path.join(process.cwd(), "views/");
var db = require("./models");

app.use(bodyParser.urlencoded({ extended: true }));
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

app.get('/session', function(req, res){
	res.send(req.sessionID);
});

app.get('/player', function(req, res){
	console.log("why doesn't it work here!? " + req.sessionID);
	db.Player.find({owner: req.sessionID}, function(err, player){
		console.log("first up: " + player[0] + " <--anything there?");
		if(err){console.log(err);}

		if(player[0] === undefined){
			var newPlayer = {};
		    var r1 = Math.random();
		    var r2 = Math.random();
		    var r3 = Math.random();
		    var r4 = Math.random();
		    var r5 = Math.random();
		    var r6 = Math.random();
		    var sum = r1 + r2 + r3 + r4 + r5 + r6;

		    n1 = Math.floor((r1/sum)*80);
		    n2 = Math.floor((r2/sum)*80);
		    n3 = Math.floor((r3/sum)*80);
		    n4 = Math.floor((r4/sum)*80);
		    n5 = Math.floor((r5/sum)*80);
		    n6 = Math.floor((r6/sum)*80);

		    n1 += 80-(n1+n2+n3+n4+n5+n6);

		    newPlayer.strength = n1;
		    newPlayer.agility = n2;
		    newPlayer.intelligence = n3;
		    newPlayer.stamina = n4;
		    newPlayer.charisma = n5;
		    newPlayer.wisdom = n6;
		    newPlayer.owner = req.sessionID;

		    console.log(newPlayer);

		    db.Player.create(newPlayer, function(err, result){
		    	if(err){
		    		console.log("here is the ERROR!!!:" + err);
		    	}
		    	console.log(result);
		    	res.send(result);
		    });
	    }else{
	    	console.log(player[0]);
	    	res.send(player[0]);
	    }
    });
});

app.post('/', function(req, res){
	console.log("check button pressed");
	console.log("what's this?: " + req.body.name);
	db.Player.find({owner: req.sessionID}, function(err, player){
		if(err){console.log(err);}
		var playerToUpdate = player[0]
		playerToUpdate.name = req.body.name;
		playerToUpdate.save();
	});
	res.redirect('/');
});

app.listen(process.env.PORT || 3000, function(){
	console.log("PVP Game is running on port: " + (process.env.PORT || 3000));
});