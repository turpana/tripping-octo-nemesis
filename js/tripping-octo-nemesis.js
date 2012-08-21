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

    // Constructor code
    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        uid = response.authResponse.userID;
        accessToken = response.authResponse.accessToken;
        FB.api('/me', function(response) {console.info(response);});
      } else (response.status === 'not_authorized') {
        loginStatus = response.status;
      }
    });
    console.log(loginStatus);
    if (loginStatus != 'connected') {
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
  }
})();

