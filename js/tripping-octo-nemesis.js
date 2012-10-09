/* Main app */
TrippingOctoNemesis = (function() {

  // Private static
  var displayStatus = {};

  // Private static
        
  // Return constructor
  return function ($, FB) {
    // Private attrs
    var $loginStatus = $('#login-status');
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
    function loadLoginTrigger() {
      $('#fb-trigger').html('login');
      $('#fb-trigger').click(
        function() {
          FB.login(
            function(response) {
              if (response.authResponse) {
                console.log('fetching info ...');
                FB.api('/me', function (response) {
                  console.log(response);
                });
              } else {
                console.log('login unsuccessful');
              }
            }, 
            {
              scope: 'email,user_likes'
            }
          );
        return false;
      });
    }

    function loadApiTrigger() {
      $('#fb-trigger').html('start');
      $('#fb-trigger').click(function () {
        FB.api('/me', function(response) {console.info(response);});
      });
    }

    function loadGetAuth() {
    }

    // Constructor code
    FB.Event.subscribe('auth.statusChange', function (response) {
      console.info(response);
      if (response.authResponse) {
        octoNemesisUpdate({loginStatus: true});
      } else {
        octoNemesisUpdate({loginStatus: false});
      }
    });
  }
})();

