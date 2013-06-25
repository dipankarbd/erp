<script id="orders-orderdetailsview-template" type="text/html">
    <tbody>
        <tr> 
           <th>SL No</th>
           <td><%= id %></td>
        </tr>
        <tr> 
           <th>Buyer</th>
           <td><%= buyername %></td>
        </tr>
        <tr> 
           <th>Style</th>
           <td><%= style %></td>
        </tr>
        <tr> 
           <th>GG</th>
           <td><%= gg %></td>
        </tr>
        <tr> 
           <th>No of Machine</th>
           <td><%= machinecount %></td>
        </tr>
        <tr> 
           <th>Time/Pcs</th>
           <td><%= timeperpcs %></td>
        </tr>
        <tr> 
           <th>Per 4 hours target/machine</th>
           <td><%= (4 * 60 / timeperpcs) %></td>
        </tr>
        <tr> 
           <th>Order Quantity</th>
           <td><%= quantity %></td>
        </tr>
        <tr> 
           <th>Previous Day Total</th>
           <td><%= previousdaytotal %></td>
        </tr>
        <tr> 
           <th>Total Production</th>
           <td><%= totalproduction %></td>
        </tr>
        <tr> 
           <th>Grand Total</th>
           <td><%= (previousdaytotal + totalproduction) %></td>
        </tr>
        <tr> 
           <th>Balance</th>
           <td><%= (quantity - (previousdaytotal + totalproduction)) %></td>
        </tr>
    </tbody>
</script>