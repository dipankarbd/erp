<?php

class UserApp extends Eloquent
{
    public static $table = 'userapps';
    public static $timestamps = false;

    public function User()
    {
        return $this->has_one('User');
    }
    public function App()
    {
        return $this->has_one('App');
    }
}