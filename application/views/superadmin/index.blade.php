<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<title>Super Administration</title>
	<meta name="viewport" content="width=device-width">  
    {{ HTML::style('bootstrap/css/bootstrap.css') }}
    {{ HTML::style('bootstrap/css/bootstrap-responsive.css') }} 

    {{ HTML::style('sadmin/css/style.css') }} 
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
        <div class="row-fluid" id="messagebar-region"></div> 
        <div class="row-fluid" id="top-region"></div>
        <div class="row-fluid">
            <div class="span3 well well-small" id="left-region"></div>
            <div class="span9" id="center-region"></div>
        </div>
    </script>

    <script id="topmessagebar-template" type="text/html"> 
              <button type="button" class="close" data-dismiss="alert">&times;</button> 
              <h4 class="alert-heading"><%= title %></h4>
              <%= message %> 
    </script>

    <script id="alert-template" type="text/html"> 
        <button type="button" class="close" data-dismiss="alert">&times;</button>       
        <h4 class="alert-heading"><%= heading %></h4>
        <%= body %> 
    </script>

    <script id="details-layout" type="text/html">
        <div class="row" id="tabheader-region"></div>
        <div class="row well" id="tabpane-region"></div> 
    </script>
    <script id="apps-layout" type="text/html"> 
        <div class="span2"  id="apps-list">TODO: APPS GRID</div>
        <div id="apps-details">TODO: DETAILS</div> 
    </script>

    <script id="topview-template" type="text/html">
        <div class="clearfix ">
            <div class="span8">
                <p>
                    TODO: Filter<br/> TODO: Filter<br/> TODO: Filter
                </p> 
            </div> 
            <button id="createuser" type="button" class="btn btn-success pull-right">New User</button> 
        </div> 
    </script>

    <script id="leftview-template" type="text/html">
        <div style="background-color:green;">left View</div>
    </script>
    <script id="centerview-template" type="text/html">
        <div style="background-color:yellow;">Center View</div>
    </script>
    <script id="useritemview-template" type="text/html"> 
        <div class="user<%= (selected == true)?' selected':'' %>">
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
   

    <script id="user-details-view-template" type="text/html">   
        <div class="span1">  <img src="{{URL::to_asset('sadmin/images/people.png') }}" alt=""> </div>
		<div class="span3">
	        <p class="label label-info"><%= username %></p> 
          	<p><strong><%= firstname %> <%= lastname %></strong></p>
            <p><i class="icon-envelope"></i><%= email %></p> 
		</div> 
        <div class="span1 pull-right"><button id="edituser" class="btn btn-small" type="button">Edit</button></div>
        <div class="clearfix"></div> 
        <hr/>
        <button id="deleteuser" class="btn btn-danger" type="button">Delete</button> 
    </script>
    <script id="user-details-editview-template" type="text/html">   
        <form>
            <fieldset>
                <legend>Editing User Details</legend>
                <label>First Name</label>
                <input type="text" value="<%= firstname %>" required/>
                <label>Last Name</label>
                <input type="text" value="<%= lastname %>" required/>
                <label>Email</label>
                <input type="text" value="<%= email %>" required/>
                <label>User Id</label> 
                <span class="input uneditable-input"><%= username %></span> 
            </fieldset>
            <hr/>
            <div>
                <button id="saveuserdetails" type="submit" class="btn btn-primary">Save changes</button>
                <button id="cancelsavinguserdetails" type="button" class="btn">Cancel</button>
            </div> 
        </form>  
    </script>
    <script id="user-details-newview-template" type="text/html">   
        <form>
            <fieldset>
                <legend>New User Details</legend>
                <label>First Name</label>
                <input id="firstname" type="text" required/>
                <label>Last Name</label>
                <input id="lastname" type="text" required/>
                <label>Email</label>
                <input id="email" type="text" required/>
                <label>User Id</label>  
                <input id="userid" type="text" required/>
                <label>Password</label>  
                <input id="password" type="password" required/>
                <label>Confirm Password</label>  
                <input id="confirmpassword" type="password" required/>
            </fieldset>
            <hr/>
            <div>
                <button id="savenewuserdetails" type="button" class="btn btn-primary">Save changes</button>
                <button id="cancelsavingnewuserdetails" type="button" class="btn">Cancel</button>
            </div> 
        </form>  
    </script>
    <!-- -->
    
</ul>

    <!-- Scripts -->
    {{ HTML::script('js/jquery-1.9.1.min.js') }}

    {{ HTML::script('bootstrap/js/bootstrap.js') }} 

    <script type="text/javascript" src="https://raw.github.com/makeusabrew/bootbox/v3.2.0/bootbox.js"></script>
    {{ HTML::script('js/backbone.marionette/underscore.js') }} 
    {{ HTML::script('js/backbone.marionette/backbone.js') }} 

    {{ HTML::script('js/backbone.marionette/backbone.marionette.js') }}  

  
    <!-- application -->
    {{ HTML::script('sadmin/js/SAdmin.js') }} 
    {{ HTML::script('sadmin/js/SAdmin.Alert.Models.js') }} 
    {{ HTML::script('sadmin/js/SAdmin.Tab.Models.js') }} 
    {{ HTML::script('sadmin/js/SAdmin.User.Models.js') }} 
    {{ HTML::script('sadmin/js/SAdmin.Layout.js') }} 
    {{ HTML::script('sadmin/js/SAdmin.Tab.Views.js') }} 
    {{ HTML::script('sadmin/js/SAdmin.Alert.Views.js') }}  
    {{ HTML::script('sadmin/js/SAdmin.Filter.Views.js') }} 
    {{ HTML::script('sadmin/js/SAdmin.User.Views.js') }} 
    {{ HTML::script('sadmin/js/SAdmin.Main.js') }} 
 
    <script>
        $(function(){ 
            $.ajaxPrefilter(function (options) {
                options.url = "http://localhost:41756/public/index.php/api/" + encodeURIComponent(options.url);
            });

            SAdmin.start();
        });
    </script>

     
</body>
</html>
