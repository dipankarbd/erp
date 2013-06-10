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
        <div class="navbar" id="navbar"></div>
        <div class="container-fluid" id="container"></div>

        <!-- Navbar Templates -->
        <script id="navbar-template" type="text/html">
            <a class="brand" href="#"><%= brand %></a>
            <ul class="nav">
                <% for(var i=0;i<navitems.length;i++){ %> 
                    <li <%= (navselected===navitems[i])?'class="active"' :'' %> ><a href="#<%= navitems[i].toLowerCase() %>"><%= navitems[i] %></a></li>
                <% } %> 
            </ul>
            <ul class="nav pull-right">
                <li><a><span class="text-info"><%= firstname %> <%= lastname %></span></a></li>
                <li><a href="{{ URL::to('logout') }}">Logout</a></li>
            </ul>
        </script>

        <!-- Scripts -->
        {{ HTML::script('js/jquery-1.9.1.min.js') }}
        {{ HTML::script('bootstrap/js/bootstrap.js') }}
        {{ HTML::script('js/bootbox/bootbox.min.js') }}
        {{ HTML::script('js/backbone.marionette/underscore.js') }}
        {{ HTML::script('js/backbone.marionette/backbone.js') }}
        {{ HTML::script('js/backbone.marionette/backbone.marionette.js') }}
        <!-- application -->
        {{ HTML::script('production/js/PMonitor.js') }}
        {{ HTML::script('production/js/PMonitor.Navbar.Models.js') }}
        {{ HTML::script('production/js/PMonitor.Navbar.Views.js') }}
        {{ HTML::script('production/js/PMonitor.Controllers.Dashboard.js') }}
        {{ HTML::script('production/js/PMonitor.Controllers.Orders.js') }}
        {{ HTML::script('production/js/PMonitor.Controllers.Buyers.js') }}
        {{ HTML::script('production/js/PMonitor.Controllers.Users.js') }}
        {{ HTML::script('production/js/PMonitor.Controllers.Navbar.js') }}
        {{ HTML::script('production/js/PMonitor.Main.js') }}
        <script type="text/javascript">
            $(function(){ 
                $.ajaxPrefilter(function (options) {
                    options.url = "http://localhost:41756/public/index.php/api/" +  options.url;
                }); 
                PMonitor.start();
            });
        </script>
    </body>
</html>
