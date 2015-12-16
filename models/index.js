var mongoose = require("mongoose");
mongoose.connect(process.env.MONGOLAB_URI ||
				process.env.MONGOHQ_URL ||
				"mongodb://localhost/vulcan-codingchallengeb");

module.exports.Player = require("./player.js");