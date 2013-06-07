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
        $user = Auth::user();
        if($user->superadmin){
            return Redirect::to('sadmin');
        }
        else{
            return Redirect::to('apps');
        } 
    })); 
    Route::get('apps',array('before' => 'auth', 'do' => function() 
    {   
        return View::make('apps.index')->with('apps', App::all());
    }));
    
    Route::get('sadmin',array('before' => 'auth', 'do' => function() 
    {   
        $user = Auth::user();
        if($user->superadmin){
            return View::make('superadmin.index');
        }
        else{
            return Response::json('Unauthorised Access', 401); 
        }
    }));
    
    Route::get('prodmonitor',array('before' => 'auth', 'do' => function() 
    {   
        return View::make('prodmonitor.index');
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
    // Users
    Route::get('api/users',function(){
        return Response::eloquent(User::get(array('id', 'username','firstname','lastname','email')));
    });
    Route::get('api/users/(:num)',function($id){ 
        return Response::eloquent(User::where('id','=',$id)->first(array('id', 'username','firstname','lastname','email')));
    });
    Route::post('api/users',function(){    
        $input = Input::json();
    
        $rules = array(
            'firstname'  => 'required|min:3|max:32|alpha',
            'lastname'  => 'required|min:3|max:32|alpha' ,
            'email' => 'required|min:3|max:64|email',
            'username' => 'required|min:3|max:32|alpha_num',
            'password'  =>'required|min:4|max:32|alpha_num|confirmed',
            'password_confirmation'=>'required|alpha_num|between:4,32'
        );
        $v = Validator::make($input, $rules);
        if( $v->fails() ){ 
            return Response::json($v->errors->all(),500);
        }
    
        $user =  User::where('username','=',$input->username)->first();
        if($user){
            return Response::json('Username already exists',500);
        }
        else{
             $user = User::create(array(
                'username' => $input->username,
                'password' => Hash::make($input->password),
                'firstname' => $input->firstname,
                'lastname' => $input->lastname,
                'email' => $input->email,
            ));  
    
            $user->password = "";
            return Response::eloquent($user);
        } 
    });
    Route::put('api/users/(:num)', function($id)
    {
        $input = Input::json();
    
        $rules = array(
            'firstname'  => 'required|min:3|max:32|alpha',
            'lastname'  => 'required|min:3|max:32|alpha' ,
            'email' => 'required|min:3|max:64|email'
        );
        $v = Validator::make($input, $rules);
        if( $v->fails() ){ 
            return Response::json($v->errors->all(),500);
        }
    
        $user =  User::where('id','=',$id)->first();
        if($user){
            $user->firstname = $input->firstname;
            $user->lastname = $input->lastname;
            $user->email = $input->email;
            $user->save();
            $user->password = '';
            return Response::eloquent($user); 
        }
        else{
            return Response::json('User not exists',500);  
        } 
    });
    Route::delete('api/users/(:num)', function($id)
    { 
        $user =  User::where('id','=',$id)->first();
        if($user){
             $res = $user->delete();
             if($res){
                  return Response::json($res ,204); 
             }
             else
             {
                  return Response::json('Error occured',500);  
             }   
        }
        else{
            return Response::json('User not exists',500);  
        } 
    });
    // User Apps
    Route::get('api/users/(:num)/apps',function($userid){ 
        $userapps = UserApp::join('apps', 'apps.id', '=', 'userapps.appid')
                 ->join('approles', 'approles.id', '=', 'userapps.roleid')
                 ->join('clients', 'clients.id', '=', 'userapps.clientid')
                 ->where('userapps.userid', '=', $userid)
                 ->get(array('userapps.id','userapps.userid','userapps.appid','userapps.roleid','userapps.clientid','apps.appname','approles.rolename','clients.clientname'));
        return Response::eloquent($userapps); 
    });
    Route::get('api/users/(:num)/apps/(:num)',function($userid,$id){ 
        $userapps = UserApp::join('apps', 'apps.id', '=', 'userapps.appid')
                 ->join('approles', 'approles.id', '=', 'userapps.roleid')
                 ->join('clients', 'clients.id', '=', 'userapps.clientid')
                 ->where('userapps.userid', '=', $userid)
                 ->where('userapps.id', '=', $id)
                 ->first(array('userapps.id','userapps.userid','userapps.appid','userapps.roleid','userapps.clientid','apps.appname','approles.rolename','clients.clientname'));
        if($userapps)
            return Response::eloquent($userapps); 
        else return Response::json('Apps not found',404);
    });
    Route::post('api/users/(:num)/apps',function($userid){ 
        $input = Input::json();
    
        $rules = array(
            'userid'  => 'required|min:1|max:500|numeric',
            'appid'  => 'required|min:1|max:500|numeric' ,
            'roleid' => 'required|min:1|max:500|numeric' ,
            'clientid' => 'required|min:1|max:500|numeric' 
        );
        $v = Validator::make($input, $rules);
        if( $v->fails() ){ 
            return Response::json($v->errors->all(),500);
        }
    
        $userapp =  UserApp::where('userid','=',$input->userid)->where('appid','=',$input->appid)->where('roleid','=',$input->roleid)->where('clientid','=',$input->clientid)->first();
    
        if($userapp){
            return Response::json('app with selected role already exists',500);
        }
        else{
             $newuserapp = UserApp::create(array(
                'userid' => $input->userid,
                'appid' =>  $input->appid,
                'roleid' => $input->roleid,
                'clientid' => $input->clientid
            ));  
    
            $userapps = UserApp::join('apps', 'apps.id', '=', 'userapps.appid')
                 ->join('approles', 'approles.id', '=', 'userapps.roleid')
                 ->join('clients', 'clients.id', '=', 'userapps.clientid')
                 ->where('userapps.userid', '=', $userid)
                 ->where('userapps.id', '=', $newuserapp->id)
                 ->first(array('userapps.id','userapps.userid','userapps.appid','userapps.roleid','userapps.clientid','apps.appname','approles.rolename','clients.clientname'));
    
            return Response::eloquent($userapps);
        }  
    });
    Route::put('api/users/(:num)/apps/(:num)',function($userid,$id){  
        $input = Input::json();
    
        $rules = array(
            'userid'  => 'required|min:1|max:500|numeric',
            'appid'  => 'required|min:1|max:500|numeric' ,
            'roleid' => 'required|min:1|max:500|numeric' ,
            'clientid' => 'required|min:1|max:500|numeric' 
        );
        $v = Validator::make($input, $rules);
        if( $v->fails() ){ 
            return Response::json($v->errors->all(),500);
        }
    
        $userapp =  UserApp::where('id','=',$id)->first();
    
        if($userapp){  
            $duplicateuserapp =  UserApp::where('userid','=',$input->userid)
                                    ->where('appid','=',$input->appid)
                                    ->where('roleid','=',$input->roleid)
                                    ->where('clientid','=',$input->clientid)
                                    ->where('id','!=',$id)->first();
            if($duplicateuserapp){
                 return Response::json('app with selected role already exists',500);
            }
            else{
                $userapp->appid = $input->appid;
                $userapp->roleid = $input->roleid;
                $userapp->clientid = $input->clientid;
                $userapp->save();
    
                $userapps = UserApp::join('apps', 'apps.id', '=', 'userapps.appid')
                     ->join('approles', 'approles.id', '=', 'userapps.roleid')
                     ->join('clients', 'clients.id', '=', 'userapps.clientid')
                     ->where('userapps.userid', '=', $userid)
                     ->where('userapps.id', '=', $userapp->id)
                     ->first(array('userapps.id','userapps.userid','userapps.appid','userapps.roleid','userapps.clientid','apps.appname','approles.rolename','clients.clientname'));
    
                return Response::eloquent($userapps);
            } 
        }
        else{
             return Response::json('User App not exists',500);  
        }
    });
    Route::delete('api/users/(:num)/apps/(:num)',function($userid,$id){  
        $userapp =  UserApp::where('id','=',$id)->first();
        if($userapp){
             $res = $userapp->delete();
             if($res){
                  return Response::json($res ,204); 
             }
             else
             {
                  return Response::json('Error occured',500);  
             }   
        }
        else{
            return Response::json('User App not exists',500);  
        } 
    });
    // buyers
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
    
    //apps
    Route::get('api/apps',function(){ 
        $data = array();
        $apps = App::where('id','<>',1)->get();
        foreach ($apps as $app)
        {
            $roles = AppRole::where('appid','=',$app->id)->get(); 
    
            foreach($roles as $r){
                $role[] = $r->to_array();
            }
    
            $data[] = array(
                'id'=>$app->id,
                'appname'=>$app->appname,
                'description'=> $app->description,
                'urlseg'=> $app->urlseg,
                'roles' =>  $role,
            );   
        }
        return  json_encode($data); 
    });
    Route::get('api/apps/(:num)',function($id){  
        $app =App::where('id','=',$id)->first();
        $roles = AppRole::where('appid','=',$app->id)->get(); 
    
        foreach($roles as $r){
            $role[] = $r->to_array();
        }
    
        $data = array(
            'id'=>$app->id,
            'appname'=>$app->appname,
            'description'=> $app->description,
            'urlseg'=> $app->urlseg,
            'roles' =>  $role
        );   
    
        return  json_encode($data); 
    });
    Route::get('api/apps/(:num)/roles',function($appid){ 
         return Response::eloquent(AppRole::where('appid','=',$appid)->get());
    });
    
    //app users
    Route::get('api/appusers/(:num)',function($appid){
        $appusers = UserApp::where('appid', '=', $appid)->distinct()->get(array('userid'));
        return Response::eloquent($appusers); 
    });
    
    //clients
    Route::get('api/clients',function(){ 
          return Response::eloquent(Client::all()); 
    });

    
    //prodmonitor nav
    Route::get('api/prodmonitor/nav',function(){
       $user = Auth::user();
       if($user){
           $roles = UserApp::join('apps', 'apps.id', '=', 'userapps.appid')
                 ->join('approles', 'approles.id', '=', 'userapps.roleid')
                 ->where('userapps.userid', '=', $user->id)
                 ->where('apps.appname', '=', 'Production Monitor')
                 ->get(array('userapps.roleid','approles.rolename'));
    
          $isAdmin = false;
          $isUser = false;
          $isBuyer = false; 
    
          foreach ($roles as $role)
          {
              if($role->rolename === 'Admin'){
                $isAdmin = true;
              }
              else if ($role->rolename === 'User'){
                $isUser = true;
              }
              else if($role->rolename === 'Buyer'){
                $isBuyer = true;
              }
          }
    
          $data = array(
                'firstname' =>  $user->firstname,
                'lastname' =>  $user->lastname,
                'userid'=>   $user->id,
                'username'=>   $user->username,
                'brand' => 'production'
          );
    
          if( $isAdmin ){
              $data['navselected'] = 'Dashboard';
              $data['navitems'] = array('Dashboard','Orders','Users');
          }
          else if ( $isUser ){
              $data['navselected'] = 'Dashboard';
              $data['navitems'] = array('Dashboard','Orders');
          }
          else if ( $isBuyer ){
              $data['navselected'] = 'Orders';
              $data['navitems'] = array('Orders');
          }
          return Response::json( $data  ,200);   
       } 
    
       return Response::json( 'user is not authenticated'  ,401);   
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
