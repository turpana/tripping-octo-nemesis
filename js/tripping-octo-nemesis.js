/* Main app */
TrippingOctoNemesis = (function() {

  // Private static
  // var i = 0;

  // Private static
  // function hello () {return "hello";}

  // Return constructor
  return function ($, FB) {
    // Private attrs
    var uid, accessToken, loginStatus;
    // Private method
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

    // Constructor code
    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        uid = response.authResponse.userID;
        accessToken = response.authResponse.accessToken;
        loadApiTrigger();
      } else {
        loginStatus = response.status;
        loadLoginTrigger();
      }
    });
  }
})();

