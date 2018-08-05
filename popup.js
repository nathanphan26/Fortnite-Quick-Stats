const params = {
  headers:{
    "trn-api-key": "e4060f2a-df44-45a7-8ca5-3938e2c2a631"
  },
  method: "GET"
};

function getTier(rating, mode){
	var img = document.createElement("img");
	img.classList.add('tier');
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
	else if(rating >= 4500 && rating < 5000){
		img.src = 'images/tier5.png';
	}
	// else if(rating >= 1500 && rating < 3000){
		
	// }
	if(mode == 1){
		var solo = document.getElementById('ratingSolo');
		solo.insertBefore(img, solo.firstChild);
	}
	else if(mode == 2){
		var solo = document.getElementById('ratingDuo');
		solo.insertBefore(img, solo.firstChild);
	}
	else if(mode == 3){
		var solo = document.getElementById('ratingSquad');
		solo.insertBefore(img, solo.firstChild);
	}
}

window.addEventListener('load', function load(event){

    document.getElementById('inputName').addEventListener("keyup", function(event){

    	event.preventDefault();
    	if(event.keyCode == 13){

			var url = 'https://api.fortnitetracker.com/v1/profile/';
			var platform = document.getElementById('platform');
			var platformChoice = platform.options[platform.selectedIndex].value;
	    	var epicName = document.getElementById('inputName').value;
	    	url = url + platformChoice + '/' + epicName;

			fetch(url,params)
			  .then(data=>{
			  	if(!data.ok) throw Error(data.statusText);
			  	return data.json()
			  })
			  .then(res=>{
			  	if(res.error){
			  		alert("Player not found");
			  		document.getElementById('inputName').value = '';
			  		document.getElementById('inputName').focus();
			  	} 
			  	else{
				  	console.log(res);
				  	console.log("url: " + url);
				  	document.getElementById('text').innerHTML = res.epicUserHandle;

				  	// Solo stats
				  	document.getElementById('winsSolo').innerHTML = res.stats.curr_p2.top1.displayValue;
				  	document.getElementById('killsSolo').innerHTML = res.stats.curr_p2.kills.displayValue;
				  	document.getElementById('winPerSolo').innerHTML = res.stats.curr_p2.winRatio.displayValue+"%";
				  	document.getElementById('kdSolo').innerHTML = res.stats.curr_p2.kd.displayValue;
				  	// document.getElementById('top10Solo').innerHTML = res.stats.curr_p2.top10.displayValue;
				  	// document.getElementById('kpmSolo').innerHTML = res.stats.curr_p2.kpg.displayValue;
				  	// document.getElementById('top25Solo').innerHTML = res.stats.curr_p2.top25.displayValue;
				  	// document.getElementById('scoreSolo').innerHTML = res.stats.curr_p2.score.displayValue;
				  	document.getElementById('soloRank').innerHTML = res.stats.curr_p2.trnRating.displayValue;
				  	// if(res.stats.curr_p2.trnRating.valueInt >= 1500 && res.stats.curr_p2.trnRating.valueInt <3000){
				  	// 	var img = document.createElement("img");
				  	// 	img.src = 'images/tier2.png';
				  	// 	img.classList.add('tier');
				  	// 	document.getElementById('ratingSolo').insertBefore(img, document.getElementById('ratingSolo').firstChild);
				  	// }
				  	getTier(res.stats.curr_p2.trnRating.valueInt, 1);
				  	
				  	// Duo stats
				  	document.getElementById('winsDuo').innerHTML = res.stats.curr_p10.top1.displayValue;
				  	document.getElementById('killsDuo').innerHTML = res.stats.curr_p10.kills.displayValue;
				  	document.getElementById('winPerDuo').innerHTML = res.stats.curr_p10.winRatio.displayValue+"%";
				  	document.getElementById('kdDuo').innerHTML = res.stats.curr_p10.kd.displayValue;
				  	// document.getElementById('top5Duo').innerHTML = res.stats.curr_p10.top5.displayValue;
				  	// document.getElementById('kpmDuo').innerHTML = res.stats.curr_p10.kpg.displayValue;
				  	// document.getElementById('top12Duo').innerHTML = res.stats.curr_p10.top12.displayValue;
				  	// document.getElementById('scoreDuo').innerHTML = res.stats.curr_p10.score.displayValue;
				  	document.getElementById('duoRank').innerHTML = res.stats.curr_p10.trnRating.displayValue;
				  	getTier(res.stats.curr_p10.trnRating.valueInt, 2);

				  	//Squad stats
				  	document.getElementById('winsSquad').innerHTML = res.stats.curr_p9.top1.displayValue;
				  	document.getElementById('killsSquad').innerHTML = res.stats.curr_p9.kills.displayValue;
				  	document.getElementById('winPerSquad').innerHTML = res.stats.curr_p9.winRatio.displayValue+"%";
				  	document.getElementById('kdSquad').innerHTML = res.stats.curr_p9.kd.displayValue;
				  	// document.getElementById('top3Squad').innerHTML = res.stats.curr_p9.top3.displayValue;
				  	// document.getElementById('kpmSquad').innerHTML = res.stats.curr_p9.kpg.displayValue;
				  	// document.getElementById('top6Squad').innerHTML = res.stats.curr_p9.top6.displayValue;
				  	// document.getElementById('scoreSquad').innerHTML = res.stats.curr_p9.score.displayValue;
				  	document.getElementById('squadRank').innerHTML = res.stats.curr_p9.trnRating.displayValue;
				  	getTier(res.stats.curr_p9.trnRating.valueInt, 3);

				  	document.getElementById('inputName').value = '';
			  		document.getElementById('inputName').focus();
				  }
			  }).
			  catch(error=>{
			  	console.log(error);
			  	alert("Please enter username")
			  });
    		
    	}
    });

});