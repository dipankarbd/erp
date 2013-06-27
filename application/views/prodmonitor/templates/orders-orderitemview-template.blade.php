<script id="orders-orderitemview-template" type="text/html"> 
    <td><%= id %></td>
    <td><%= buyername %></td>
    <td><%= style %></td>
    <td><%= gg %></td>
    <td><%= machinecount %></td>
    <td><%= timeperpcs %></td>
    <td><%= quantity %></td>
    <td><%= previousdaytotal %></td>
    <td><%= totalproduction %></td>  
    <td>
     <% if(delivered === 1){ %> 
          Delivered
     <% } else{%> 
        In Production
     <%}%> 
    </td> 
</script>