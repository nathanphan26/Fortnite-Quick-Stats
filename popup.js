const params = {
  headers:{
    "trn-api-key": "e4060f2a-df44-45a7-8ca5-3938e2c2a631"
  },
  method: "GET"
};


window.addEventListener('load', function load(event){
    var nameButton = document.getElementById('nameButton');

    nameButton.addEventListener('click', function() { 
		var url = 'https://api.fortnitetracker.com/v1/profile/pc/';
    	var epicName = document.getElementById('inputName').value;
    	url = url + epicName

		fetch(url,params)
		  .then(data=>{return data.json()})
		  .then(res=>{
		  	console.log(res);
		  	console.log("url: " + url);
		  	document.getElementById('text').innerHTML = res.epicUserHandle;
		  	document.getElementById('kdSolo').innerHTML = res.stats.curr_p2.kd.displayValue;
		  	document.getElementById('kdDuo').innerHTML = res.stats.curr_p9.kd.displayValue;
		  	document.getElementById('kdSquad').innerHTML = res.stats.curr_p10.kd.displayValue;
		  });
    });
});