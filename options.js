// Takes value from input and stores it via chrome storage
function saveUser(){

  // Saves Epic Username to chrome storage
  var name = $('#formEpicUsername').val();
  chrome.storage.sync.set({epicName: name}, function(){
    var empty = (name === '');
    chrome.storage.sync.set({optionsSwitch: empty}, function() {
      console.log("optionsSwitch " + empty); // Boolean value if name is empty
    });
  });

  // Saves platform to chrome storage
  var platform = $('#formPlatform').val();
  chrome.storage.sync.set({epicPlatform: platform}, function() {
    console.log(`platform: ${platform}`);
  });

  /***** Animate.css *****/
  $('#saved').show();
  $('#saved').removeClass('fadeIn fadeOut');
  $('#saved').addClass('fadeIn');
  setTimeout(function(){
    $('#saved').addClass('fadeOut');
  }, 2000);
  setTimeout(function(){
    $('#saved').hide();
  }, 3000);
  /***** Animate.css *****/

}

// Onload functions
$(function() {
  chrome.storage.sync.get(['epicName'], function(result) { // Retrieves username from chrome storage
    var name = result.epicName;
    $('#formEpicUsername').val(name); // Sets input to name
  });

  chrome.storage.sync.get(['epicPlatform'], function(result) { // Retrieves username from chrome storage
    var platform = result.epicPlatform;
    $('#formPlatform').val(platform); // Sets input to name
  });

  $('#formEpicUsername').focus(); // Sets focus to input field

  $('#save').click(saveUser); // Event listener for button click

  $("#formEpicUsername").keydown(function (e) { // Event listener for enter key
    if (e.keyCode == 13) {
      saveUser();
    }
  });
});
