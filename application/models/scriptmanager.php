<?php
    
    class ScriptManager
    {
        public static function getScriptsForProductionManagerApp()
        {
            $scriptsString = '';
            $scriptsForAdmin = array( 'production/js/PMonitor.js',
                                      'production/js/PMonitor.Navbar.Models.js',
                                      'production/js/PMonitor.Alert.Models.js',
                                      'production/js/PMonitor.Users.Models.js',
                                      'production/js/PMonitor.Layout.js',
                                      'production/js/PMonitor.Navbar.Views.js',
                                      'production/js/PMonitor.Alert.Views.js',
                                      'production/js/PMonitor.Users.Views.js',
                                      'production/js/PMonitor.Controllers.Alert.js',
                                      'production/js/PMonitor.Controllers.Dashboard.js',
                                      'production/js/PMonitor.Controllers.Orders.js',
                                      'production/js/PMonitor.Controllers.Buyers.js',
                                      'production/js/PMonitor.Controllers.Users.js',
                                      'production/js/PMonitor.Controllers.Navbar.js',
                                      'production/js/PMonitor.Main.js'
                                );
 
 
            $scriptsForUser = array();
            $scriptsForBuyer = array();
 
 
            $user = Auth::user();
            if($user)
            {
                $roles = UserApp::join('apps', 'apps.id', '=', 'userapps.appid')
                   ->join('approles', 'approles.id', '=', 'userapps.roleid')
                   ->where('userapps.userid', '=', $user->id)
                   ->where('userapps.clientid', '=', Session::get('clientid'))
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
 
                if($isAdmin)
                {
                    foreach($scriptsForAdmin as $script)
                    {
                        $scriptsString.= HTML::script($script);
                    }
                }
                else if($isUser)
                {
                    foreach($scriptsForUser as $script)
                    {
                        $scriptsString.= HTML::script($script);
                    }
                }
                else if($isBuyer)
                {
                    foreach($scriptsForBuyer as $script)
                    {
                        $scriptsString.= HTML::script($script);
                    }
                }
            } 
            return $scriptsString;
        }
    }
