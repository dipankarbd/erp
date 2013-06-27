<script id="orders-editorder-template" type="text/html">  
    <form>
        <fieldset>
            <legend>Order Details</legend>
    
            <label>Buyer</label>  
            <select id="buyer">
                <% for(var i=0;i<buyers.length;i++){ 
                    if(buyerid === buyers.at(i).get('id')){ %> 
                        <option selected="selected" value="<%= buyers.at(i).get('id') %>"><%= buyers.at(i).get('company') %></option>  
                    <%
                    }
                    else{%> 
                        <option value="<%= buyers.at(i).get('id') %>"><%= buyers.at(i).get('company') %></option>  
                    <%}
                 %>  
                <% } %>
            </select> 
    
            <label>Style</label>
            <input id="style" type="text" value="<%= style %>"  required/>
            <label>GG</label>
            <input id="gg" type="text" value="<%= gg %>" required/>
            <label>Quantity</label>
            <input id="quantity" type="text" value="<%= quantity %>" required/>
            <label>No. of Machine</label>  
            <input id="machinecount" type="text" value="<%= machinecount %>" required/>
            <label>Time per Pcs <span class="text-info">(in minutes)</span></label>  
            <input id="timeperpcs" type="text"value="<%= timeperpcs %>" required/> 
            <label>Status</span></label>  
            <select id="delivered">
                    <%if(delivered === 1){ %> 
                        <option value="0">In Production</option>
                        <option value="1" selected="selected">Delevered</option>
                    <%
                    }
                    else{%> 
                        <option value="0"  selected="selected">In Production</option>
                        <option value="1">Delevered</option>
                    <%}%> 
            </select>
        </fieldset> 
        <hr/>
        <div>
            <button id="saveorder" type="button" class="btn btn-primary">Save changes</button>
            <button id="cancelsavingorder" type="button" class="btn">Cancel</button>
        </div>   
    </form> 
</script>