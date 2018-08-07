function saveUsername() {
  var name = document.getElementById('epicName').value;
  chrome.storage.sync.set({epicUsername: name}, function
}
