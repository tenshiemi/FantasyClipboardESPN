var injected = injected || (function(){

  var methods = {};

  methods.getTeam = function(){
    var nodes = document.getElementsByClassName('pncPlayerRow');
    var players = [],
        playerDets, name, opponent, position, team;
    //  Loop through all the nodes
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      // Grabs player info from each node
      if (node.getElementsByClassName('flexpop')[0] != undefined) {
        name = node.getElementsByClassName('flexpop')[0].textContent;

        var teamNode = node.getElementsByClassName('playertablePlayerName')[0].textContent.split(', ');

        team = teamNode.length > 1 ? teamNode[1].split(/(\s+)/, 1)[0] : '';

        if (node.querySelector("[title='Breaking Video']") != null ||
            node.querySelector("[title='Breaking News and Video']") != null ||
            node.querySelector("[title='Recent News']") != null ||
            node.querySelector("[title='Breaking News']") != null  ) {
          if (node.getElementsByClassName('flexpop')[2] != undefined) {
            opponent = node.getElementsByClassName('flexpop')[2].textContent;
          } else {
            opponent = "Bye";
          }
        } else if (node.getElementsByClassName('flexpop')[1] != undefined) {
          opponent = node.getElementsByClassName('flexpop')[1].textContent;
        } else {
          opponent = "Bye";
        }

        if ((/ST/).test(node.getElementsByClassName('playertablePlayerName')[0].textContent)) {
          position = "";
        } else {
          if (node.querySelector('[title="Out"]') ||
              node.querySelector('[title="Probable"]') ||
              node.querySelector('[title="Questionable"]')) {
            position = node.getElementsByClassName('playertablePlayerName')[0].textContent.slice(-5, -3);
          } else {
            position = node.getElementsByClassName('playertablePlayerName')[0].textContent.slice(-2);
          }
        }
      }
      var player = { name: name, opponent: opponent, position: position, team: team };

      players.push(player)
    }
    return players;
  };

  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    var data = {};
    if (methods.hasOwnProperty(request.method))
      data = methods[request.method]();
    sendResponse({ data: data });
    return true;
  });

  return true;
})();
