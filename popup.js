function fetchTeamInfo(e) {
  chrome.runtime.sendMessage({ type: e.target.name });
}

var elements = document.getElementsByClassName('copy-team');

for (var i = 0; i < elements.length; i++) {
  elements[i].addEventListener('click', fetchTeamInfo);
}
