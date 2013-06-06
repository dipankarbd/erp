<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"> 
        <meta name="viewport" content="width=device-width">

        <title>Production Monitor</title>

        {{ HTML::style('bootstrap/css/bootstrap.css') }}
        {{ HTML::style('bootstrap/css/bootstrap-responsive.css') }}
        {{ HTML::style('production/css/style.css') }}

    </head>
    <body> 
        <!-- Scripts -->
        {{ HTML::script('js/jquery-1.9.1.min.js') }}
        {{ HTML::script('bootstrap/js/bootstrap.js') }} 
        {{ HTML::script('js/bootbox/bootbox.min.js') }}
        {{ HTML::script('js/backbone.marionette/underscore.js') }}
        {{ HTML::script('js/backbone.marionette/backbone.js') }}
        {{ HTML::script('js/backbone.marionette/backbone.marionette.js') }}
        
      
        <script>
            $(function(){ 
                $.ajaxPrefilter(function (options) {
                    options.url = "http://localhost:41756/public/index.php/api/" +  options.url;
                }); 
                SAdmin.start();
            });
        </script> 
    </body>
</html>
