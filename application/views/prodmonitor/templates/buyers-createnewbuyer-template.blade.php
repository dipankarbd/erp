<script id="buyers-createnewbuyer-template" type="text/html">
    
    <form>
        <fieldset>
            <legend>New Buyer Details</legend>
            <label>Company Name</label>
            <input id="companyname" type="text" required/>
            <label>Country</label>
            <select id="country">
                <% for(var i=0;i<countries.length;i++){ %> 
                    <option value="<%= countries.at(i).get('id') %>"><%= countries.at(i).get('name') %></option>  
                <% } %>
            </select>
            <label>Email</label>
            <input id="email" type="text" required/>
            <label>Phone</label>  
            <input id="phone" type="text" required/>
            <label>Website</label>  
            <input id="website" type="text" />  
        </fieldset> 
        <fieldset>
            <legend>Buyer's User Details</legend>
     
            <label>First Name</label>
            <input id="firstname" type="text" required/>
            <label>Last Name</label>
            <input id="lastname" type="text" required/>
            <label>Email</label>
            <input id="email" type="text" required/>
            <label>User Id</label>  
            <input id="userid" type="text" required/> 
            <label>Password</label>  
            <input id="password" type="password" required/>
            <label>Confirm Password</label>  
            <input id="confirmpassword" type="password" required/> 
        </fieldset>  
        <hr/>
        <div>
            <button id="savenewuserdetails" type="button" class="btn btn-primary">Save changes</button>
            <button id="cancelsavingnewuserdetails" type="button" class="btn">Cancel</button>
        </div>   
    </form>  
</script>