<script id="navbar-template" type="text/html">
    <a class="brand" href="#"><%= brand %></a>
    <ul class="nav">
        <% for(var i=0;i<navitems.length;i++){ %> 
            <li <%= (navselected===navitems[i])?'class="active"' :'' %> ><a href="#<%= navitems[i].toLowerCase() %>"><%= navitems[i] %></a></li>
        <% } %> 
    </ul>
    <ul class="nav pull-right">
        <li><a><span class="text-success"><%= today %></span></a></li>
        <li><a><span class="text-info"><%= firstname %> <%= lastname %></span></a></li>
        <li><a href="{{ URL::to('logout') }}">Logout</a></li>
    </ul>
</script>