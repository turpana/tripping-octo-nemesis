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
      var apiUiHtml = '<ul>'
        + '<li><a href="#" id="fb-api-me">/me</a></li>'
        + '<li><a href="#" id="fb-api-me-friends">/me/friends</a></li>'
        + '<li><a href="#" id="fb-api-me-feed">/me/feed</a></li>'
        + '</ul>';
      $fbApiUI.html(apiUiHtml);
      $('#fb-api-me').click(function() {
        FB.api('/me', function (response) { console.log(response); });
      });
      $('#fb-api-me-friends').click(function() {
        FB.api('/me/friends', function (response) { console.log(response); });
      });
      $('#fb-api-me-feed').click(function() {
        FB.api('/me/feed', function (response) { console.log(response); });
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

