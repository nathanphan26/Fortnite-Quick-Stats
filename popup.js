  let text = document.getElementById('name');

  chrome.storage.sync.get('epicName', function(data) {
    text.innerHTML = data.name;
  });