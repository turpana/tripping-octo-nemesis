/* Main app */
TrippingOctoNemesis = (function() {

  // Private static
  // var i = 0;

  // Private static
  // function hello () {return "hello";}

  // Return constructor
  return function ($, FB) {
    // Private attrs
    // var user;

    // Constructor code
    $('#fb-trigger').click(function() {
      FB.login(function() {
        if (response.authResponse) {
          console.log('fetching info ...');
          FB.api('/me', function (response) {
            console.log(response);
          });
        } else {
          console.log('login unsuccessful');
        }
      });
      return false;
    });

  }
})();

