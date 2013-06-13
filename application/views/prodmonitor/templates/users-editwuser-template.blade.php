<script id="users-editwuser-template" type="text/html">
    
    <form>
        <fieldset>
            <legend>User Details</legend>
            <label>First Name</label>
            <input id="firstname" type="text" value="<%= firstname %>" required/>
            <label>Last Name</label>
            <input id="lastname" type="text"  value="<%= lastname %>" required/>
            <label>Email</label>
            <input id="email" type="text" value="<%= email %>" required/>
            <label>User Id</label>  
            <span class="input uneditable-input"><%= username %></span> 
            <label>User Type</label>  
            <select id="usertype">
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </select> 
        </fieldset> 
    </form>  
</script>