<?php include "app.php"; ?>
<!DOCTYPE html>
<html>
  <head>
    <title>Hello</title>
    <link type="text/css" href="css/infovis.css" rel="stylesheet" >
    <script type="text/javascript" src="js/lib/jquery-1.8.0.min.js"></script>
    <script type="text/javascript" src="js/lib/underscore.js"></script>
    <script type="text/javascript" src="js/lib/backbone-min.js"></script>
    <script type="text/javascript" src="js/lib/jit.js"></script>
    <script type="text/javascript" src="js/classes/Interface.js"></script>
    <script type="text/javascript" src="js/classes/GraphI.js"></script>
    <script type="text/javascript" src="js/classes/Graph.js"></script>
    <script type="text/javascript" src="js/Models.js"></script>
    <script type="text/javascript" src="js/Collections.js"></script>
    <script type="text/javascript" src="js/Views.js"></script>
    <script type="text/javascript" src="js/tripping-octo-nemesis.js"></script>
  </head>
<body>
<?php include "bootstrap.php"; ?>
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
        trippingOctoNemeses = new TrippingOctoNemesis (jQuery, FB, $jit);
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

    <div id="login-status"></div>
    <div id="fb-api-ui-old"></div>
    <div id="tripping-octo-nemesis">
      <div id="main-actions"></div>
    </div>
    <div id="infovis"></div>
  </body>
</html>
