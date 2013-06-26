<script id="orders-orderproductionitemview-template" type="text/html">
    <td> 
        <h3><%= date %></h3>
        <p>
            <strong>08 AM - 12 PM - </strong><span class="badge  badge-info"><%= quantity8amto12pm %></span>
        </p>
        <p>
            <strong>12 PM - 04 PM - </strong><span class="badge  badge-info"><%= quantity12pmto4pm %></span>
        </p>
        <p>
            <strong>04 PM - 08 PM - </strong><span class="badge  badge-info"><%= quantity4pmto8pm %></span>
        </p>
        <p>
            <strong>08 PM - 12 PM - </strong><span class="badge  badge-info"><%= quantity8pmto12am %></span>
        </p>
        <p>
            <strong>12 PM - 04 AM - </strong><span class="badge  badge-info"><%= quantity12amto4am %></span>
        </p>
        <p>
            <strong>04 AM - 08 AM - </strong><span class="badge  badge-info"><%= quantity4amto8am %></span>
        </p>
    </td> 
</script>