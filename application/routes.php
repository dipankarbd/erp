<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Simply tell Laravel the HTTP verbs and URIs it should respond to. It is a
| breeze to setup your application using Laravel's RESTful routing and it
| is perfectly suited for building large applications and simple APIs.
|
| Let's respond to a simple GET request to http://example.com/hello:
|
|		Route::get('hello', function()
|		{
|			return 'Hello World!';
|		});
|
| You can even respond to more than one URI:
|
|		Route::post(array('hello', 'world'), function()
|		{
|			return 'Hello World!';
|		});
|
| It's easy to allow URI wildcards using (:num) or (:any):
|
|		Route::put('hello/(:any)', function($name)
|		{
|			return "Welcome, $name.";
|		});
|
*/

Route::get('/', array('before' => 'auth', 'do' => function() 
{ 
    return Redirect::to('apps');
})); 

Route::get('apps',array('before' => 'auth', 'do' => function() 
{   
    return View::make('apps.index')->with('apps', App::all());
}));
 
Route::get('sadmin',array('before' => 'auth', 'do' => function() 
{   
    return View::make('superadmin.index');
}));

Route::get('login', function() {
    return View::make('auth.login');
});

Route::post('login', function() {
    // get POST data
    $userdata = array(
        'username' => Input::get('username'),
        'password' => Input::get('password')
    );

    if ( Auth::attempt($userdata) )
    {
        // we are now logged in, go to home
        return Redirect::to('/');
    }
    else
    {
        // auth failure! lets go back to the login
        return Redirect::to('login')->with('login_errors', true);
        // pass any error notification you want
        // i like to do it this way :)
    }
});

Route::get('logout', function() {
    Auth::logout();
    return Redirect::to('login');
});



Route::get('api',function(){
    return 'api';
});

Route::get('api/common',function(){
    return 'api/common';
});
Route::get('api/common/countries',function(){ 
    return Response::eloquent(Country::all());
});
Route::post('api/common/countries',function(){
     $country = new Country();
     $country->code = Input::get('code');
     $country->name = Input::get('name');
     $country->save();
 
     return Response::eloquent($country); 
});
Route::put('api/common/countries',function(){
    $country = Country::where('code', '=', Input::get('code'))->first();
    $country->name = Input::get('name');
    $country->save();
    
    return Response::eloquent($country); 
});

Route::get('api/buyers',function(){
    $data = array();

    $buyers = Buyer::all();
    
    
    foreach ($buyers as $buyer)
    {
        $country = Country::where('code','=', $buyer->country)->first(); 
        $user =  User::where('id','=',$buyer->userid)->first();
        
        $data[] = array(
            'id'=>$buyer->id,
            'country'=> array(
                                'id'=>  $country->id,
                                'code'=>  $country->code,
                                'name'=>  $country->name 
                            ),
            'user'=>  array(
                                'id'=>  $user->id,
                                'username'=>  $user->username,
                                'firstname'=>  $user->firstname,
                                'lastname'=>  $user->lastname,
                                'email'=>  $user->email
                            )
        ); 
    }
    return  json_encode($data); 
});
Route::get('api/buyers/(:num)',function($id){
     
    $buyer = Buyer::find($id)->first();
    $country = Country::where('code','=', $buyer->country)->first(); 
        $user =  User::where('id','=',$buyer->userid)->first();
        
        $data = array(
            'id'=>$buyer->id,
            'country'=> array(
                                'id'=>  $country->id,
                                'code'=>  $country->code,
                                'name'=>  $country->name 
                            ),
            'user'=>  array(
                                'id'=>  $user->id,
                                'username'=>  $user->username,
                                'firstname'=>  $user->firstname,
                                'lastname'=>  $user->lastname,
                                'email'=>  $user->email
                            )
        ); 
    
    return  json_encode($data); 
});
Route::post('api/buyers',function(){
     $buyer = new Buyer();
     $buyer->country = Input::get('country');
     $buyer->userid = Input::get('userid');
     $buyer->save();
 
     $user =  User::where('id','=',$buyer->userid)->first();
     $country = Country::where('code','=', $buyer->country)->first(); 
     $data = array(
            'id'=>$buyer->id,
            'country'=> array(
                                'id'=>  $country->id,
                                'code'=>  $country->code,
                                'name'=>  $country->name 
                            ),
            'user'=>  array(
                                'id'=>  $user->id,
                                'username'=>  $user->username,
                                'firstname'=>  $user->firstname,
                                'lastname'=>  $user->lastname,
                                'email'=>  $user->email
                            )
        ); 
    
    return  json_encode($data);   
});
Route::put('api/buyers',function(){
    $buyer = Buyer::where('id', '=', Input::get('id'))->first();
    $buyer->country = Input::get('country'); 
    $buyer->save();
    
     $user =  User::where('id','=',$buyer->userid)->first();
     $country = Country::where('code','=', $buyer->country)->first(); 
     $data = array(
            'id'=>$buyer->id,
            'country'=> array(
                                'id'=>  $country->id,
                                'code'=>  $country->code,
                                'name'=>  $country->name 
                            ),
            'user'=>  array(
                                'id'=>  $user->id,
                                'username'=>  $user->username,
                                'firstname'=>  $user->firstname,
                                'lastname'=>  $user->lastname,
                                'email'=>  $user->email
                            )
        ); 
    
    return  json_encode($data);  
});
/*
|--------------------------------------------------------------------------
| Application 404 & 500 Error Handlers
|--------------------------------------------------------------------------
|
| To centralize and simplify 404 handling, Laravel uses an awesome event
| system to retrieve the response. Feel free to modify this function to
| your tastes and the needs of your application.
|
| Similarly, we use an event to handle the display of 500 level errors
| within the application. These errors are fired when there is an
| uncaught exception thrown in the application.
|
*/

Event::listen('404', function()
{
	return Response::error('404');
});

Event::listen('500', function()
{
	return Response::error('500');
});

/*
|--------------------------------------------------------------------------
| Route Filters
|--------------------------------------------------------------------------
|
| Filters provide a convenient method for attaching functionality to your
| routes. The built-in before and after filters are called before and
| after every request to your application, and you may even create
| other filters that can be attached to individual routes.
|
| Let's walk through an example...
|
| First, define a filter:
|
|		Route::filter('filter', function()
|		{
|			return 'Filtered!';
|		});
|
| Next, attach the filter to a route:
|
|		Route::get('/', array('before' => 'filter', function()
|		{
|			return 'Hello World!';
|		}));
|
*/

Route::filter('before', function()
{
	// Do stuff before every request to your application...
});

Route::filter('after', function($response)
{
	// Do stuff after every request to your application...
});

Route::filter('csrf', function()
{
	if (Request::forged()) return Response::error('500');
});

Route::filter('auth', function()
{
	if (Auth::guest()) return Redirect::to('login');
});