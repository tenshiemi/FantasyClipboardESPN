var injected = injected || (function(){

  var methods = {};

  methods.getTeam = function(){
    var nodes = document.getElementsByClassName('pncPlayerRow');
    var players = [],
        playerDets, n, o, p;
    //  Loop through all the nodes
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      // Grabs player info from each node
      if (node.getElementsByClassName('flexpop')[0] != undefined) {
        n = node.getElementsByClassName('flexpop')[0].textContent;
        if (node.querySelector("[title='Breaking Video']") != null ||
            node.querySelector("[title='Breaking News and Video']") != null ||
            node.querySelector("[title='Recent News']") != null ||
            node.querySelector("[title='Breaking News']") != null  ) {
          if (node.getElementsByClassName('flexpop')[2] != undefined) {
            o = node.getElementsByClassName('flexpop')[2].textContent;
          } else {
            o = "Bye";
          }
        } else if (node.getElementsByClassName('flexpop')[1] != undefined) {
          o = node.getElementsByClassName('flexpop')[1].textContent;
        } else {
          o = "Bye";
        }
        if ((/ST/).test(node.getElementsByClassName('playertablePlayerName')[0].textContent)) {
          p = "";
        } else {
          if (node.querySelector('[title="Out"]') ||
              node.querySelector('[title="Probable"]') ||
              node.querySelector('[title="Questionable"]')) {
            p = node.getElementsByClassName('playertablePlayerName')[0].textContent.slice(-5, -3);
          } else {
            p = node.getElementsByClassName('playertablePlayerName')[0].textContent.slice(-2);
          }
        }
      }
      var player = { name: n, position: p, opponent: o };
      console.log(player);
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