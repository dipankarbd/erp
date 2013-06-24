<?php
    
    class TemplateManager
    {
        public static function getTemplatesForProductionManagerApp()
        {
            $templatesString = ''; 
    
            $templatesForAdmin = array( 'prodmonitor.templates.navbar-template',
                                        'prodmonitor.templates.container-layout', 
                                        'prodmonitor.templates.alert-template',
                                        'prodmonitor.templates.users-commandview-createnewuser-template',
                                        'prodmonitor.templates.users-commandview-edituser-template',
                                        'prodmonitor.templates.users-commandview-usernotselected-template',
                                        'prodmonitor.templates.users-commandview-userselected-template',
                                        'prodmonitor.templates.users-createnewuser-template',
                                        'prodmonitor.templates.users-editwuser-template',
                                        'prodmonitor.templates.users-filterview-template',
                                        'prodmonitor.templates.users-useritemview-template',
                                        'prodmonitor.templates.users-usersview-template' ,
                                        'prodmonitor.templates.buyers-buyeritemview-template',
                                        'prodmonitor.templates.buyers-buyersview-template',
                                        'prodmonitor.templates.buyers-commandview-buyernotselected-template',
                                        'prodmonitor.templates.buyers-commandview-buyerselected-template',
                                        'prodmonitor.templates.buyers-filterview-template',
                                        'prodmonitor.templates.buyers-createnewbuyer-template',
                                        'prodmonitor.templates.buyers-editbuyer-template', 
                                        'prodmonitor.templates.orders-orderitemview-template',
                                        'prodmonitor.templates.orders-ordersview-template', 
                                        'prodmonitor.templates.orders-commandview-ordernotselected-template',
                                        'prodmonitor.templates.orders-createneworder-template',
                                        'prodmonitor.templates.orders-commandview-orderselected-template'
                                      );
    
            $templatesForUser = array();
            $templatesForBuyer = array();
    
    
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
                    foreach($templatesForAdmin as $template)
                    { 
                       $templatesString.= View::make($template) ; 
                    }
                }
                else if($isUser)
                {
                    foreach($templatesForUser as $template)
                    {
                         $templatesString.= View::make($template) ;
                    }
                }
                else if($isBuyer)
                {
                    foreach($templatesForBuyer as $template)
                    {
                         $templatesString.= View::make($template) ;
                    }
                }
            } 
            return $templatesString;
        }
    }
