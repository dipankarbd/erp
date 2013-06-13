<script id="users-createnewuser-template" type="text/html"> 
    <form>
        <fieldset>
            <legend>New User Details</legend>
            <label>First Name</label>
            <input id="firstname" type="text" required/>
            <label>Last Name</label>
            <input id="lastname" type="text" required/>
            <label>Email</label>
            <input id="email" type="text" required/>
            <label>User Id</label>  
            <input id="userid" type="text" required/>
            <label>User Type</label>  
            <select id="usertype">
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </select>
            <label>Password</label>  
            <input id="password" type="password" required/>
            <label>Confirm Password</label>  
            <input id="confirmpassword" type="password" required/>
        </fieldset> 
    </form>  
</script>