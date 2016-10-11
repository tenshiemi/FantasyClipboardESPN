// Execute the inject.js in a tab and call a method,
// passing the result to a callback function.
function injectedMethod(tab, method, callback) {
  chrome.tabs.executeScript(tab.id, { file: 'inject.js' }, function() {
    chrome.tabs.sendMessage(tab.id, { method: method }, callback);
  });
}

function copyToClipboard(text) {
  var copyDiv = document.createElement('div');
  copyDiv.contentEditable = true;
  document.body.appendChild(copyDiv);
  copyDiv.innerHTML = text;
  copyDiv.unselectable = "off";
  copyDiv.focus();
  document.execCommand('SelectAll');
  document.execCommand("Copy", false, null);
  document.body.removeChild(copyDiv);
}

function filterResults(players, scope) {
  return players.filter(function(player) {
    switch(scope) {
      case 'qb-roster':
          return player.position === 'QB';
          break;
      case 'rb-roster':
          return player.position === 'RB';
          break;
      case 'wr-roster':
          return player.position === 'WR';
          break;
      case 'te-roster':
          return player.position === 'TE';
          break;
      case 'flex-roster':
          return player.position === 'RB' ||
            player.position === 'WR' ||
            player.position === 'TE';
          break;
      case 'qb-flex-roster':
          return player.position === 'RB' ||
            player.position === 'WR' ||
            player.position === 'TE' ||
            player.position === 'QB';
          break;
      default:
        return true;
    }
  });
}

function getTeam(tab, scope) {
  // When we get a result back from the getTeam
  // method, copy the team info to the clipboard
  injectedMethod(tab, 'getTeam', function(response) {
    var players = filterResults(response.data, scope);
    if (players.length >= 1) {
      var mstring = "";
      for (var i = 0; i < players.length; i++) {
        mstring += players[i].name + " (" + players[i].team + " - " +
        players[i].position + ") vs " + players[i].opponent + "<br /><br />";
      }
      copyToClipboard(mstring);
      alert("Your team has been copied to the clipboard!");
    } else {
      alert("All your players for this position are locked.");
    }
    return true;
  });
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    getTeam(tabs[0], request.type);
  });
});
