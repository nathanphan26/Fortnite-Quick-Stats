// Takes value from input and stores it via chrome storage
function saveUser(){
  var name = $('#formEpicUsername').val();
  chrome.storage.sync.set({epicName: name}, function(){
    var empty = (name === '');
    chrome.storage.sync.set({optionsSwitch: empty}, function() {
      console.log("optionsSwitch " + empty); // Boolean value if name is empty
    });
  });

  // Animate.css
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

// Onload functions
$(function() {
  chrome.storage.sync.get(['epicName'], function(result) {
    var name = result.epicName;
    document.getElementById('formEpicUsername').value = name;
  });

  $('#formEpicUsername').focus();

  $('#save').click(saveUser);

  $("#formEpicUsername").keydown(function (e) {
    if (e.keyCode == 13) {
      saveUser();
    }
  });

});