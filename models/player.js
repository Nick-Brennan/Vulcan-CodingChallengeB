var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PlayerSchema = new Schema({
	userId: {type: String, required: true, unique: true},
	strength: {type: Number},
	agility: {type: Number},
	intelligence: {type: Number},
	stamina: {type: Number},
	charisma: {type: Number},
	wisdom: {type: Number}
});

PlayerSchema.statics.createRandom = function(cb){
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
    newPlayer.intellegence = n3;
    newPlayer.stamina = n4;
    newPlayer.charisma = n5;
    newPlayer.wisdom = n6;

    this.create(newPlayer, cb);
}

var Player = mongoose.model("Player", PlayerSchema);

module.exports = Player;

