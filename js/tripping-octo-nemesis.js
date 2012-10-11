/* Main app */
TrippingOctoNemesis = (function() {

  // Private static
  var displayStatus = {};

  // Private static
        
  // Return constructor
  return function ($, FB) {
    // Private attrs
    var $loginStatus = $('#login-status');
    var $fbApiUI = $('#fb-api-ui');
    // Private method
    function octoNemesisUpdate(newStatus) {
      for (type in newStatus) {
        fireUpdate(type, newStatus[type]);
      }
    }
    function fireUpdate(type, newStatus) {
      switch (type) {
        case 'loginStatus':
          var newHtml;
          if (newStatus) {
            newHtml = '<a href="#" id="auth-logout-link">Log out</a>';
            $loginStatus.html(newHtml);
            $('#auth-logout-link').click(function() {
              FB.logout();
            });
            loadApiUI();
          } else {
            newHtml = '<a href="#" id="auth-login-link">Log in</a>';
            $loginStatus.html(newHtml);
            $('#auth-login-link').click(function() {
              FB.login();
            });
          }
          break;
      }
    }
    function loadApiUI() {
      var dialogUrl = 'https://www.facebook.com/dialog/oauth/'
        + '?client_id=275683129199939'
        + '&redirect_uri=http://apps.facebook.com/trip-octo-nemesis/'
        + '&scope=read_stream';
      var apiUiHtml = '<ul>'
        + '<li><a href="' + dialogUrl + '" id="fb-api-ui-dialog" target="_blank">dialog</a></li>'
        + '<li><a href="#" id="fb-api-me">/me</a></li>'
        + '<li><a href="#" id="fb-api-me-friends">/me/friends</a></li>'
        + '<li><a href="#" id="fb-api-me-feed">/me/feed</a></li>'
        + '<li><a href="#" id="fb-api-me-home">/me/home</a></li>'
        + '</ul>';
      $fbApiUI.html(apiUiHtml);
      $('#fb-api-me').click(function() {
        FB.api('/me', function (response) { console.log(response); });
      });
      $('#fb-api-me-friends').click(function() {
        FB.api('/me/friends', function (response) { });
      });
      $('#fb-api-me-feed').click(function() {
        FB.api('/me/feed', function (response) { 
          var rawData = response.data;
          var labels = [];
          var jsonData = {};
          var i = rawData.length;
          while (i) {
            i--;
            if (! (rawData[i].from.id in jsonData) ) {
              labels.push(rawData[i].from.name);
              jsonData[rawData[i].from.id] = rawData[i].from;
              jsonData[rawData[i].from.id].tally = 0;
            }
            jsonData[rawData[i].from.id].tally += 1;
          }
        });
      });
      $('#fb-api-me-home').click(function() {
        FB.api('/me/home', function (response) { 
          console.log(response); 
          var rawData = response.data;
          var labels = [];
          var jsonData = {};
          var jitJson = {};
          var i = rawData.length;
          while (i) {
            i--;
            if (! (rawData[i].from.id in jsonData) ) {
              labels.push(rawData[i].from.name);
              jsonData[rawData[i].from.id] = rawData[i].from;
              jsonData[rawData[i].from.id].tally = 0;
            }
            jsonData[rawData[i].from.id].tally += 1;
          }
          console.info(labels);
          console.info(jsonData);
          jitJson.label = labels;
          jitJson.values = [];
          for (id in jsonData) {
            jitJson.values.push(
              {
                label: jsonData[id].name,
                values: [ 10, 10, jsonData[id].tally ]
              }
            );
          }
          console.info(jitJson);
          var pieChart = new $jit.PieChart({
            injectInto: 'infovis',
            animate: true,
            offset: 30,  
            sliceOffset: 0,  
            labelOffset: 20,
            type: 'stacked',
            showLabels:true,
            resizeLabels: 7,
            Label: {  
              type: 'HTML', // Native or HTML  
              size: 20,  
              family: 'Arial',  
              color: 'white'  
            },  
            Tips: {  
              enable: true,  
              onShow: function(tip, elem) {  
                tip.innerHTML = "<b>" + elem.name + "</b>: " + elem.value;  
              }  
            } 
          });
          pieChart.loadJSON(jitJson);

          /**/
        });
      });
    }

    // Constructor code
    FB.Event.subscribe('auth.statusChange', function (response) {
      if (response.authResponse) {
        octoNemesisUpdate({loginStatus: true});
      } else {
        octoNemesisUpdate({loginStatus: false});
      }
    });
  }
})();

