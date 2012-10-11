/* Main app */
TrippingOctoNemesis = (function() {

  // Private static
  var displayStatus = {};

  // Private static
        
  // Return constructor
  return function ($, FB, $jit) {
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
        FB.api('/me/home?limit=200', function (response) { 
          console.log(response); 
          var rawData = response.data;
          var labels = [];
          var jsonData = {};
          var jitJson = {};
          var i = rawData.length;
          labels.push('first page');
          while (i) {
            i--;
            if (! (rawData[i].from.id in jsonData) ) {
              jsonData[rawData[i].from.id] = rawData[i].from;
              jsonData[rawData[i].from.id].tally = 0;
            }
            jsonData[rawData[i].from.id].tally += 1;
          }
          jitJson.label = labels;
          jitJson.values = [];
          FB.api('/me/home?limit=200&offset=200', function (response) {
            console.info(response);
            var rawData2 = response.data;
            var i = rawData2.length;
            labels.push('second page');
            for (id in jsonData) {
              jsonData[id].tally2 = 0;
            }
            while (i) {
              i--;
              if (! (rawData2[i].from.id in jsonData)) {
                jsonData[rawData2[i].from.id] = rawData2[i].from;
                jsonData[rawData2[i].from.id].tally = 0;
                jsonData[rawData2[i].from.id].tally2 = 0;
              }
              jsonData[rawData2[i].from.id].tally2 += 1;
            }

            for (id in jsonData) {
              jitJson.values.push(
                {
                  label: jsonData[id].name,
                  values: [ jsonData[id].tally, jsonData[id].tally2 ]
                }
              );
            }
            console.info(jitJson);
            var barChart = new $jit.BarChart({
              injectInto: 'infovis',
              animate: true,
              orientation: 'horizontal',
              barsOffset: 0.5,
              Margin: {
                top: 5,
                right: 5,
                left: 5,
                bottom: 5
              },
              labelOffset: 5,
              type:'stacked',
              showLabels: true,
              Label: {  
                type: 'HTML', //Native or HTML  
                size: 13,  
                family: 'Arial',  
                color: 'orange'  
              },
              Tips: {  
                enable: true,  
                onShow: function(tip, elem) {  
                  tip.innerHTML = "<b>" + elem.name + "</b>: " + elem.value;  
                } 
              }
            });

            barChart.loadJSON(jitJson);
          });

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

