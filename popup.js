



$(function() {
	$('#ver').text(function(){
		var manifest = chrome.runtime.getManifest();
		console.log(manifest);
		return "v" + manifest.version;
	});
});


function getTier(rating, mode){
	var img;

	if(mode == 1){
		img = document.getElementById('soloImg');
	}
	else if(mode == 2){
		img = document.getElementById('duoImg');
	}
	else if(mode == 3){
		img = document.getElementById('squadImg');
	}

	if(rating >= 0 && rating < 1500){
		img.src = 'images/tier1.png';
	}
	else if(rating >= 1500 && rating < 3000){
		img.src = 'images/tier2.png';
	}
	else if(rating >= 3000 && rating < 4000){
		img.src = 'images/tier3.png';
	}
	else if(rating >= 4000 && rating < 4500){
		img.src = 'images/tier4.png';
	}
	else if(rating >= 4500){
		img.src = 'images/tier5.png';
	}
	// else if(rating >= 1500 && rating < 3000){
		
	// }
}

function getStats(url){

	var param;

	/* To be used for special effects */
	$("#name").hide();
	$("#allStats").hide();
	/* ------------------------------ */

	$.get("includes/help.stats", function(data) { 

		param = {
			headers:{
				"trn-api-key": data
			},
			method: "GET"
		};
		// console.log(param);
		fetch(url,param)
		  .then(data=>{	//Data Check
		  	if(!data.ok) throw Error(data.statusText);
		  	return data.json()
		  })
		  .then(res=>{
		  	if(res.error){	//Player name not found
		  		alert("Player not found");
		  		document.getElementById('inputName').value = '';
		  		document.getElementById('inputName').focus();
		  	} 
		  	else{

			  	document.getElementById('text').innerHTML = res.epicUserHandle; // Display name

			  	// Solo stats
			  	document.getElementById('winsSolo').innerHTML = res.stats.curr_p2.top1.displayValue;
			  	document.getElementById('killsSolo').innerHTML = res.stats.curr_p2.kills.displayValue;
			  	document.getElementById('winPerSolo').innerHTML = res.stats.curr_p2.winRatio.displayValue+"%";
			  	document.getElementById('kdSolo').innerHTML = res.stats.curr_p2.kd.displayValue;
			  	document.getElementById('soloRank').innerHTML = res.stats.curr_p2.trnRating.displayValue;

			  	getTier(res.stats.curr_p2.trnRating.valueInt, 1); //Icons
			  	
			  	// Duo stats
			  	document.getElementById('winsDuo').innerHTML = res.stats.curr_p10.top1.displayValue;
			  	document.getElementById('killsDuo').innerHTML = res.stats.curr_p10.kills.displayValue;
			  	document.getElementById('winPerDuo').innerHTML = res.stats.curr_p10.winRatio.displayValue+"%";
			  	document.getElementById('kdDuo').innerHTML = res.stats.curr_p10.kd.displayValue;

			  	document.getElementById('duoRank').innerHTML = res.stats.curr_p10.trnRating.displayValue;

			  	getTier(res.stats.curr_p10.trnRating.valueInt, 2); //Icons

			  	//Squad stats
			  	document.getElementById('winsSquad').innerHTML = res.stats.curr_p9.top1.displayValue;
			  	document.getElementById('killsSquad').innerHTML = res.stats.curr_p9.kills.displayValue;
			  	document.getElementById('winPerSquad').innerHTML = res.stats.curr_p9.winRatio.displayValue+"%";
			  	document.getElementById('kdSquad').innerHTML = res.stats.curr_p9.kd.displayValue;
			  	document.getElementById('squadRank').innerHTML = res.stats.curr_p9.trnRating.displayValue;

			  	getTier(res.stats.curr_p9.trnRating.valueInt, 3); //Icons

			  	// Input focus
			  	document.getElementById('inputName').value = '';
		  		document.getElementById('inputName').focus();

		  		jQuery("#allStats").show();
		  		jQuery("#name").show();
			  }
		  }).
		  catch(error=>{
		  	console.log(error);
		  	alert("Please enter username")
		  	// Input focus
		  	document.getElementById('inputName').value = '';
	  		document.getElementById('inputName').focus();
		  });
	});
}


window.addEventListener('load', function load(event){
	$(document).ready(function() {
		$("#name").hide();
		$("#allStats").hide();
	});


	// If username is stored
	chrome.storage.sync.get(['epicName'], function(result) {
		if(result.epicName != 'undefined'){
			var url = 'https://api.fortnitetracker.com/v1/profile/';
			var platform = document.getElementById('platform');
			var platformChoice = platform.options[platform.selectedIndex].value;
	    	var epicName = result.epicName;
	    	url = url + platformChoice + '/' + epicName;

			getStats(url);
		}
	});
	
	
	//If searched
    document.getElementById('inputName').addEventListener("keyup", function(event){

    	event.preventDefault();
    	if(event.keyCode == 13){

    		var url = 'https://api.fortnitetracker.com/v1/profile/';
			var platform = document.getElementById('platform');
			var platformChoice = platform.options[platform.selectedIndex].value;
	    	var epicName = document.getElementById('inputName').value;
	    	url = url + platformChoice + '/' + epicName;

			getStats(url);
    		
    	}
    });
});
