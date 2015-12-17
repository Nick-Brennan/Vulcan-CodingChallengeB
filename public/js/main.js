$(function(){
	console.log("jquery running");

	

	getPlayer();

});

function getSessionID(){
	$.get("/session", function(data){
		console.log(data);
		$("#target").html(data);
	});
}

function getPlayer(){
	$.get("/player", function(player){
		console.log(player);
		$("#strength").html(player.strength);
		$("#agility").html(player.agility);
		$("#intelligence").html(player.intelligence);
		$("#stamina").html(player.stamina);
		$("#charisma").html(player.charisma);
		$("#wisdom").html(player.wisdom);
		$("#target").html(player.name || " ");
	});
}