<script id="orders-createneworder-template" type="text/html">
    
    <form>
        <fieldset>
            <legend>New Order Details</legend>
    
            <label>Buyer</label>  
            <select id="buyer">
                 <% for(var i=0;i<buyers.length;i++){ %> 
                    <option value="<%= buyers.at(i).get('id') %>"><%= buyers.at(i).get('company') %></option>  
                <% } %>
            </select>
    
            <label>Style</label>
            <input id="style" type="text" required/>
            <label>GG</label>
            <input id="gg" type="text" required/>
            <label>Quantity</label>
            <input id="quantity" type="text" required/>
            <label>No. of Machine</label>  
            <input id="machinecount" type="text" required/>
            <label>Time per Pcs</label>  
            <input id="timeperpcs" type="text" required/> 
        </fieldset> 
        <hr/>
        <div>
            <button id="saveneworder" type="button" class="btn btn-primary">Save changes</button>
            <button id="cancelsavingneworder" type="button" class="btn">Cancel</button>
        </div>   
    </form>  
</script>