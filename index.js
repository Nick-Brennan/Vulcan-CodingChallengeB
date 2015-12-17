
////////////////////////////////
///// Server Config ////////////
////////////////////////////////

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
	secret: "notsecure",
	resave: false,
	saveUninitialized: true
}));

///////////////////////////////
//////// Routes ///////////////
///////////////////////////////

app.get('/', function(req, res){
	res.sendFile(views + "main.html");
});

app.get('/session', function(req, res){
	res.send(req.sessionID);
});

app.get('/player', function(req, res){
	db.Player.find({owner: req.sessionID}, function(err, player){
		if(err){console.log(err);}

     // Initializing New Users's Player with randomly genereated attribute values totaling 80 ////////		

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
		    newPlayer.owner = req.sessionID; //tying the new user's character to the session ID (w/ log-in would use User ID)//

		    db.Player.create(newPlayer, function(err, result){
		    	if(err){
		    		console.log(err);
		    	}
		    	res.send(result);
		    });
	    }else{
	    	res.send(player[0]);
	    }
    });
});

app.get('/players', function(req, res){
	db.Player.find({owner: {$ne: req.sessionID}, name: {$ne: null}}, function(err, enemies){
		res.send(enemies);
	});
});

app.post('/', function(req, res){
	db.Player.find({owner: req.sessionID}, function(err, player){
		if(err){console.log(err);}
		var playerToUpdate = player[0]
		playerToUpdate.name = req.body.name;
		playerToUpdate.save();
	});
	res.redirect('/');
});

app.post('/fight', function(req, res){
	db.Player.findOne({owner: req.sessionID}, function(err, user){
		if(err){console.log(err);}
		db.Player.findOne({owner: req.body.enemy}, function(err, enemy){
			if(err){console.log(err);}
		//logic for scoring rounds and awarding a random attribute point to the winner///////////
			var userWins = 0;
			var enemyWins = 0;
			var msg = '';
			var attribArr = ["strength", "agility", "intelligence", "stamina", "charisma", "wisdom"];
			var prize = attribArr[Math.floor(Math.random() * 6)];

			if(user.strength > enemy.strength){
				userWins++;
			}

			if(enemy.strength > user.strength){
				enemyWins++; 
			}

			if(user.agility > enemy.agility){
				userWins++;
			}

			if(enemy.agility > user.agility){
				enemyWins++; 
			}

			if(user.intelligence > enemy.intelligence){
				userWins++;
			}

			if(enemy.inteligence > user.inteligence){
				enemyWins++; 
			}

			if(user.stamina > enemy.stamina){
				userWins++;
			}

			if(enemy.stamina > user.stamina){
				enemyWins++; 
			}

			if(user.charisma > enemy.charisma){
				userWins++;
			}

			if(enemy.charisma > user.charisma){
				enemyWins++; 
			}

			if(user.wisdom > enemy.wisdom){
				userWins++;
			}

			if(enemy.wisdom > user.wisdom){
				enemyWins++; 
			}

			console.log("user wins : " + userWins);
			console.log("enemy wins : " + enemyWins);

			if(userWins > enemyWins){
				msg = "You Win! You gain 1 " + prize + " point!";
				user[prize]++;
				user.save();
			}else if(enemyWins > userWins){
				msg = "You Lost! Your enemy gained 1 " + prize + " point!";
				enemy[prize]++;
				enemy.save();
			}else{
				msg = "It's a tie...";
			}
			res.send(msg);
		});
	});
});
//Server initialization////////////////////////////////////////////////////////
app.listen(process.env.PORT || 3000, function(){
	console.log("PVP Game is running on port: " + (process.env.PORT || 3000));
});