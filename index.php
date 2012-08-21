<?php include "app.php"; ?>
<!DOCTYPE html>
<html>
  <head>
    <title>Hello</title>
  </head>
  <body>
    <div id="fb-root"></div>
    <script>
      window.fbAsyncInit = function() {
        FB.init({
          appId : '<?php echo APPID; ?>',
          channelUrl : '//app.turpana.com/channel.html',
          status : true,
          cookie : true,
          xfbml : true
        });
      };
      // Load the SDK Asynchronously
      (function (d) {
        var js, id = 'facebook-jssdk', ref = d.getElementsByTagName ('script')[0];
        if (d.getElementById(id)) {return;}
          js = d.createElement('script'); js.id = id; js.async = true;
        js.src = "//connect.facebook.net/en+us/all.js";
      }(document));
    </script>

    <p>hello</p>
  </body>
</html>
