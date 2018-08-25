document.addEventListener('DOMContentLoaded', function() {
  chrome.storage.sync.get(['epicName'], function(result) {
    var name = result.epicName;
    document.getElementById('formEpicUsername').value = name;
  });

  $('#formEpicUsername').focus();
}, false);

function saveUser(){
  var name = $('#formEpicUsername').val();
  chrome.storage.sync.set({epicName: name}, function(){
    console.log("storage click " + name);
    if(name === ''){
      chrome.storage.sync.set({optionsSwitch: 'true'}, function() {
        console.log("optionsSwitch true");
      });
    } else {
      chrome.storage.sync.set({optionsSwitch: 'false'}, function() {
        console.log("optionsSwitch false");
      });
    }
  });

  $('#saved').show();
  $('#saved').removeClass('fadeIn fadeOut');
  $('#saved').addClass('fadeIn');
  setTimeout(function(){
    $('#saved').addClass('fadeOut');
  }, 2000);
  setTimeout(function(){
    $('#saved').hide();
  }, 3000);
}

$('#save').click(saveUser);

$("#formEpicUsername").keydown(function (e) {
  if (e.keyCode == 13) {
    saveUser();
  }
});