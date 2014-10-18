// Execute the inject.js in a tab and call a method,
// passing the result to a callback function.
function injectedMethod (tab, method, callback) {
  chrome.tabs.executeScript(tab.id, { file: 'inject.js' }, function(){
    chrome.tabs.sendMessage(tab.id, { method: method }, callback);
  });
}

function copyToClipboard( text ){
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

function getTeam (tab) {
  // When we get a result back from the getTeam
  // method, copy the team info to the clipboard
  injectedMethod(tab, 'getTeam', function (response) {
    var team = response.data;
    var mstring = ""
    for (var i = 0; i < team.length; i++) {
      mstring += "* " + (team[i].name + " " + team[i].position + " vs " + team[i].opponent) + "  \r\n";
    }
    copyToClipboard(mstring);
    alert("Your team has been copied to the clipboard!");
    return true;
  });
}

// When the browser action is clicked, call the
// getTeam function.
chrome.browserAction.onClicked.addListener(getTeam);