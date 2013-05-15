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
            <div class="span3 well well-small" id="left-region"></div>
            <div class="span9" id="center-region"></div>
        </div>
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
                <input type="text" required/>
                <label>Last Name</label>
                <input type="text" required/>
                <label>Email</label>
                <input type="text" required/>
                <label>User Id</label>  
                <input type="text" required/>
                <label>Password</label>  
                <input type="text" required/>
                <label>Confirm Password</label>  
                <input type="text" required/>
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

    {{ HTML::script('js/backbone.marionette/underscore.js') }} 
    {{ HTML::script('js/backbone.marionette/backbone.js') }} 

    {{ HTML::script('js/backbone.marionette/backbone.marionette.js') }}  

    {{ HTML::script('sadmin/main.js') }} 
     
</body>
</html>
