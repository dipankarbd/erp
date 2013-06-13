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