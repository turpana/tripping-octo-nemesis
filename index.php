<?php include "app.php"; ?>
<!DOCTYPE html>
<html>
  <head>
    <title>Hello</title>
    <script type="text/javascript" src="js/lib/jquery-1.8.0.min.js"></script>
    <script type="text/javascript" src="js/tripping-octo-nemesis.js"></script>
  </head>
  <body>
    <div id="fb-root"></div>
    <script>
      window.fbAsyncInit = function() {
        FB.init({
          appId : '<?php echo APPID; ?>',
          channelUrl : 'http://app.turpana.com/channel.html',
          status : true,
          cookie : true,
          xfbml : true
        });
        trippingOctoNemeses = new TrippingOctoNemesis (jQuery, FB);
      };
      // Load the SDK Asynchronously
      (function (d) {
        var js, id = 'facebook-jssdk', ref = d.getElementsByTagName ('script')[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement('script'); js.id = id; js.async = true;
        js.src = "//connect.facebook.net/en_US/all.js";
        ref.parentNode.insertBefore(js, ref);
      }(document));
    </script>

    <a href="#" id="fb-trigger">start</a>
  </body>
</html>