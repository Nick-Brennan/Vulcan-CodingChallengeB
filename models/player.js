var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PlayerSchema = new Schema({
	owner: String,
	strength: Number,
	agility: Number,
	intelligence: Number,
	stamina: Number,
	charisma: Number,
	wisdom: Number,
	name: String
});


var Player = mongoose.model("Player", PlayerSchema);

module.exports = Player;

