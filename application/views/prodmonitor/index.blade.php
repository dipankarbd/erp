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
        <div class="container-fluid" id="alert"></div>
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

        <!-- Layout Templates -->
        <script id="container-layout" type="text/html">
            <div class="row-fluid">
                <div class="span6" id="leftpanel"> 
                </div>
                <div class="span3 pull-right">
                    <div class="row-fluid" id="filterpanel"> 
                    </div>
                    <div class="row-fluid" id="commandpanel">  
                    </div>
                </div>
            </div>
        </script>


        <!-- Users Templates -->
        <script id="users-useritemview-template" type="text/html">








            
            
            
            
            
            
            
            
            <td><%= username %></td>
            <td><%= firstname %></td>
            <td><%= lastname %></td>
            <td><%= email %></td>
            <td>
                <% for(var i=0;i<roles.length;i++){ %>  
                    <span class="label label-info"><%= roles[i].rolename %></span> 
                <% } %> 
            </td> 
        </script>
        <script id="users-usersview-template" type="text/html">
            <thead>
                <tr>
                    <th>User Id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Role</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </script>
        <script id="users-filterview-template" type="text/html">
            TODO:: FILTERVIEW
        </script>
        <script id="users-commandview-usernotselected-template" type="text/html">
            <p>
                <a id="createnewuser" href="#" class="btn" style="display:block;width:200px;"><i class="icon-pencil"></i> <strong>Create New User</strong></a>
            </p> 
        </script>
        <script id="users-commandview-userselected-template" type="text/html">
            <p>
                <a id="createnewuser" href="#" class="btn" style="display:block;width:200px;"><i class="icon-pencil"></i> <strong>Create New User</strong></a>
            </p>
            <p>
                <a id="editselecteduser" href="#" class="btn" style="display:block;width:200px;"><i class="icon-edit"></i> <strong>Edit Selected User</strong></a>
            </p>
            <hr/>
            <p>
                <a id="deleteselecteduser" href="#" class="btn btn-danger" style="display:block;width:200px;"><i class="icon-trash"></i> <strong>Delete Selected User</strong></a>
            </p>
        </script>
        <script id="users-commandview-createnewuser-template" type="text/html">
            <p>
                <button  id="savenewuser" class="btn btn-success">Save Changes</button> 
            </p> 
            <p>
                 <button  id="cancelchanges" class="btn">Cancel</button> 
            </p> 
        </script>
        <script id="users-createnewuser-template" type="text/html"> 
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
                    <label>User Type</label>  
                    <select id="usertype">
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                    <label>Password</label>  
                    <input id="password" type="password" required/>
                    <label>Confirm Password</label>  
                    <input id="confirmpassword" type="password" required/>
                </fieldset> 
            </form>  
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
        {{ HTML::script('production/js/PMonitor.Users.Models.js') }}
        {{ HTML::script('production/js/PMonitor.Layout.js') }}
        {{ HTML::script('production/js/PMonitor.Navbar.Views.js') }}
        {{ HTML::script('production/js/PMonitor.Users.Views.js') }}
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
