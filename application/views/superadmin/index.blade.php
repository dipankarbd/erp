<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<title>Super Administration</title>
	<meta name="viewport" content="width=device-width">  
    {{ HTML::style('bootstrap/css/bootstrap.css') }}
    {{ HTML::style('bootstrap/css/bootstrap-responsive.css') }} 

    {{ HTML::style('sadmin/main.css') }} 
</head>
<body>
   
    <div class="navbar">
        <div class="navbar-inner">
            <a class="brand" href="#">dipankar.com</a>
            <ul class="nav">
                <li class="active"><a href="#">Super Administration</a></li> 
            </ul>
            <ul class="nav pull-right">
                <li><a><span class="text-info">{{ Auth::user()->firstname }} {{ Auth::user()->lastname }}</span></a></li>
                <li><a href="{{ URL::to('logout') }}">Logout</a></li>
            </ul>
        </div>
    </div>
	<div class="container-fluid" id="container"> 
         
    </div>  
     
     <!-- Templates -->
    <script id="main-layout" type="text/html">
        <div class="row-fluid" id="top-region"></div>
        <div class="row-fluid">
            <div class="span2" id="left-region"></div>
            <div class="span10" id="center-region"></div>
        </div>
    </script>
    <script id="topview-template" type="text/html">
        <div style="background-color:red;">Top View</div>
    </script>
    <script id="leftview-template" type="text/html">
        <div style="background-color:green;">left View</div>
    </script>
    <script id="centerview-template" type="text/html">
        <div style="background-color:yellow;">Center View</div>
    </script>
    <script id="useritemview-template" type="text/html"> 
        <div class="user<%= (isSelected == true)?' selected':'' %>">
            <h1><%= firstname %> <%= lastname %></h1>
            <h2><%= email %></h2>  
        </div> 
    </script>
    <script id="no-users-template" type="text/html"> 
        <div class="user">
            <p class="text-warning">No user available.Please add a user</p>
        </div>
    </script>
  
    <script id="user-tab-header-item-template" type="text/html">  
        <a href="#<%= index %>"><%= text %></a>
    </script>

    <!-- -->
    
</ul>

    <!-- Scripts -->
    {{ HTML::script('js/jquery-1.9.1.min.js') }}

    {{ HTML::script('bootstrap/js/bootstrap.js') }} 

    {{ HTML::script('js/backbone.marionette/underscore.js') }} 
    {{ HTML::script('js/backbone.marionette/backbone.js') }} 

    {{ HTML::script('js/backbone.marionette/backbone.marionette.js') }} 
      
    {{ HTML::script('sadmin/main.js') }} 
     
</body>
</html>
