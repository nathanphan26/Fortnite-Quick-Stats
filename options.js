document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.sync.get(['epicName'], function(result) {
       console.log('Value currently is ' + result.epicName);
       var name = result.epicName;
       console.log(name);
	    if(name != 'undefined'){
	    	document.getElementById('epicUsername').value = name;
	    }
    });
}, false);

function saveUsername() {
  var name = document.getElementById('epicUsername').value;
  chrome.storage.sync.set({epicName: name}, function(){
  	console.log(name);
  });
}

 var saveButton = document.getElementById('save');
 var submitInput = document.getElementById('epicUsername');
 saveButton.addEventListener('click', saveUsername);
 submitInput.addEventListener('keyup', e => {
	if(e.keyCode == 13){
		saveUsername();
	}
});