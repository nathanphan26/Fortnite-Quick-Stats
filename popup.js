var usernameContainer = document.querySelector('#usernameContainer');
var profileContainer = document.querySelector('#profileContainer');

var searchBar = document.querySelector('#epicUsername');
var username = document.querySelector('#username');
var platformSelect = document.querySelector('#platformSelect');

var soloImg = document.querySelector('#soloImg')
var duoImg = document.querySelector('#duoImg')
var squadImg = document.querySelector('#squadImg')
var soloRank = document.querySelector('#soloRank');
var soloWins = document.querySelector('#soloWins');
var soloWinsPercent = document.querySelector('#soloWinsPercent');
var soloKills = document.querySelector('#soloKills');
var soloKD = document.querySelector('#soloKD');

var duoRank = document.querySelector('#duoRank');
var duoWins = document.querySelector('#duoWins');
var duoWinsPercent = document.querySelector('#duoWinsPercent');
var duoKills = document.querySelector('#duoKills');
var duoKD = document.querySelector('#duoKD');

var squadRank = document.querySelector('#squadRank');
var squadWins = document.querySelector('#squadWins');
var squadWinsPercent = document.querySelector('#squadWinsPercent');
var squadKills = document.querySelector('#squadKills');
var squadKD = document.querySelector('#squadKD');

searchBar.addEventListener('keydown', searchProfile);

function searchProfile(e) {
  console.log(e.keyCode)
  if(e.keyCode === 13) {
    createRequest(searchBar.value, platformSelect.value)
  }
}

function createRequest(username, platform) {
  let url = `https://api.fortnitetracker.com/v1/profile/${platform}/${username}`;
  console.log(url);
  let request = new Request(url, {
    method: 'GET',
    headers: new Headers({
      'trn-api-key': 'e4060f2a-df44-45a7-8ca5-3938e2c2a631'
    })
  });
  getProfile(request);
}

function getProfile(request) {
  fetch(request)
    .then(res => res.json())
    .then(data => parseProfile(data))
    .catch(err => console.error(err));
}

function parseProfile(data) {
  let solo = data.stats.p2;
  let duo = data.stats.p10;
  let squad = data.stats.p9;

  username.textContent = data.epicUserHandle;
  // Solo Stats
  soloRank.textContent = solo.trnRating.displayValue;
  soloWins.textContent = solo.top1.displayValue;
  soloWinsPercent.textContent = solo.winRatio.displayValue;
  soloKills.textContent = solo.kills.displayValue;
  soloKD.textContent = solo.kd.displayValue;
  // Duo Stats
  duoRank.textContent = duo.trnRating.displayValue; 
  duoWins.textContent = duo.top1.displayValue;
  duoWinsPercent.textContent = duo.winRatio.displayValue;
  duoKills.textContent = duo.kills.displayValue;
  duoKD.textContent = duo.kd.displayValue;
  // Squad Stats
  squadRank.textContent = squad.trnRating.displayValue;
  squadWins.textContent = squad.top1.displayValue;
  squadWinsPercent.textContent = squad.winRatio.displayValue;
  squadKills.textContent = squad.kills.displayValue;
  squadKD.textContent = squad.kd.displayValue;

  setRankImage(solo.trnRating.valueInt, duo.trnRating.valueInt, squad.trnRating.valueInt);
}

function between(num, min, max) {
  return num<=max && num>=min;
}

function setRankImage(soloRank, duoRank, squadRank) {
  if(between(soloRank, 0, 1499)) soloImg.src = 'images/tier1.png';
  else if(between(soloRank, 1500, 2999)) soloImg.src = 'images/tier2.png';
  else if(between(soloRank, 3000, 3999)) soloImg.src = 'images/tier3.png';
  else if(between(soloRank, 4000, 4499)) soloImg.src = 'images/tier4.png';
  else if(soloRank >= 4500) soloImg.src = 'images/tier5.png';

  if(between(duoRank, 0, 1499)) duoImg.src = 'images/tier1.png';
  else if(between(duoRank, 1500, 2999)) duoImg.src = 'images/tier2.png';
  else if(between(duoRank, 3000, 3999)) duoImg.src = 'images/tier3.png';
  else if(between(duoRank, 4000, 4499)) duoImg.src = 'images/tier4.png';
  else if(duoRank >= 4500) duoImg.src = 'images/tier5.png';

  if(between(squadRank, 0, 1499)) squadImg.src = 'images/tier1.png';
  else if(between(squadRank, 1500, 2999)) squadImg.src = 'images/tier2.png';
  else if(between(squadRank, 3000, 3999)) squadImg.src = 'images/tier3.png';
  else if(between(squadRank, 4000, 4499)) squadImg.src = 'images/tier4.png';
  else if(squadRank >= 4500) squadImg.src = 'images/tier5.png';
}

document.addEventListener("DOMContentLoaded", function(){
  // Handler when the DOM is fully loaded
  usernameContainer.style.display = "none";
  profileContainer.style.display = "none";
});