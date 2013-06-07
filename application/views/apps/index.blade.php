<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<title>Apps</title>
	<meta name="viewport" content="width=device-width">  
    {{ HTML::style('bootstrap/css/bootstrap.css') }}
    {{ HTML::style('bootstrap/css/bootstrap-responsive.css') }}
</head>
<body>
    <div class="navbar">
        <div class="navbar-inner">
            <a class="brand" href="#">dipankar.com</a>
            <ul class="nav">
                <li class="active"><a href="#">Apps</a></li> 
            </ul>
            <ul class="nav pull-right">
                <li><a><span class="text-info">{{ Auth::user()->firstname }} {{ Auth::user()->lastname }}</span></a></li>
                <li><a href="{{ URL::to('logout') }}">Logout</a></li>
            </ul>
        </div>
    </div>
	<div class="container-fluid">
         
        <ul class="nav nav-tabs"> 
            @foreach ($clients as $index => $client)
                  @if( ($selectedClientId ===0 && $index===0) ||   $client->id === $selectedClientId)
                      <li class="active">
                        <a href="apps?clientid={{$client->id}}">{{ $client->clientname }}</a>
                      </li> 
                  @else
                    <li>
                        <a href="apps?clientid={{$client->id}}">{{ $client->clientname }}</a>
                    </li>
                  @endif 
            @endforeach
        </ul>
         
         <ul class="thumbnails"> 
            @foreach ($apps as $app)
            <li class="span4"> 
                <a href="{{ URL::to('appredirect?appid='.$app->appid . '&clientid=' . $selectedClientId) }}">
                    <div class="thumbnail"> 
                        <div class="caption">
                            <h3>{{ $app->appname }}</h3>
                            <p>{{ $app->description }}</p> 
                        </div> 
                    </div>
                </a>
            </li>  
            @endforeach
        </ul>
        
    </div>  

    <!-- Scripts -->
    {{ HTML::script('js/jquery-1.9.1.min.js') }}
    {{ HTML::script('bootstrap/js/bootstrap.js') }} 
</body>
</html>
