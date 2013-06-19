<script id="buyers-editbuyer-template" type="text/html"> 
    <form>
        <fieldset>
            <legend>Buyer Details</legend>
            <label>Company Name</label>
            <input id="companyname" type="text" value="<%= company %>" required/>
            <label>Country</label>
            <select id="country">
                <% for(var i=0;i<countries.length;i++){ 
                    if(countryid === countries.at(i).get('id')){ %> 
                        <option selected="selected" value="<%= countries.at(i).get('id') %>"><%= countries.at(i).get('name') %></option>  
                    <%
                    }
                    else{%> 
                        <option value="<%= countries.at(i).get('id') %>"><%= countries.at(i).get('name') %></option>  
                    <%}
                 %>  
                <% } %>
            </select>
            <label>Address</label>
            <textarea id="address"><%= address %></textarea>
            <label>Email</label>
            <input id="email" type="text"  value="<%= email %>" required/>
            <label>Phone</label>  
            <input id="phone" type="text" value="<%= phone %>" required/>
            <label>Website</label>  
            <input id="website"  value="<%= website %>" type="text" />  
        </fieldset>  
        <hr/>
        <div>
            <button id="savebuyerdetails" type="button" class="btn btn-primary">Save changes</button>
            <button id="cancelsavingbuyerdetails" type="button" class="btn">Cancel</button>
        </div>   
    </form>  
</script>