<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<title>Login</title>
	<meta name="viewport" content="width=device-width">
	<link href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.1/css/bootstrap-combined.min.css" rel="stylesheet">
</head>
<body>
	<div class="container">
        <br/><br/><br/><br/>
	    <div class="row">
		    <div class="span4 offset4 well">
			    <legend>Please Sign In</legend>
                @if (Session::has('login_errors'))
                <div class="alert alert-error">
                    <a class="close" data-dismiss="alert" href="#">×</a>Incorrect Username or Password!
                </div> 
                @endif 
			    <form method="POST" action="" accept-charset="UTF-8">
			    <input type="text" id="username" class="span4" name="username" placeholder="Username">
			    <input type="password" id="password" class="span4" name="password" placeholder="Password">
                <!--<label class="checkbox">
            	    <input type="checkbox" name="remember" value="1"> Remember Me
                </label>-->
			    <button type="submit" name="submit" class="btn btn-info btn-block">Sign in</button>
			    </form>    
		    </div>
	    </div>
    </div>
</body>
</html> 

