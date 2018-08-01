var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
       chrome.storage.sync.set({epicName: JSON.parse(xhttp.responseText).epicUserHandle}, function() {
        console.log("epicUserHandle: " + JSON.parse(xhttp.responseText).epicUserHandle);
       });
       console.log(xhttp.responseText);
    }
};
xhttp.open("GET", "https://api.fortnitetracker.com/v1/profile/pc/daddy%20natty", true);
xhttp.setRequestHeader('trn-api-key', 'e4060f2a-df44-45a7-8ca5-3938e2c2a631');
xhttp.send();