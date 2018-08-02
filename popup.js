  let text = document.getElementById('name');

  chrome.storage.sync.get('epicName', function(data) {
    text.textContent = data.name;
  });