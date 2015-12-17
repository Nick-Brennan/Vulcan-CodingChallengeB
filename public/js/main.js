$(function(){
	getPlayer();
	getOpponents();
});


function getPlayer(){
	$.get("/player", function(player){
		$("#strength").html(player.strength);
		$("#agility").html(player.agility);
		$("#intelligence").html(player.intelligence);
		$("#stamina").html(player.stamina);
		$("#charisma").html(player.charisma);
		$("#wisdom").html(player.wisdom);
		$("#target").html(player.name || " ");
	});
}

function getOpponents(){
	$.get("/players", function(players){
		$('#playersPlaceholder').empty();
		var template = _.template($('#playerListTemplate').html());
		var playerArr = $.map(players, function(val, ind){
			return val;
		});
		playerArr.forEach(function(enemy){
			$('#playersPlaceholder').append(template(enemy));
		});
	});
}

function battle(enemyOwnerId){
	$.ajax({
		method: "POST",
		url: "/fight",
		data: {enemy: enemyOwnerId}
	})
	  .done(function(msg){
	  	alert("Battle Result: " + msg);
	  	getPlayer();
	  });
}