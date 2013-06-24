<?php

class Order extends Eloquent
{
    public static $table = 'orders';
    public static $timestamps = false;
     

    public function productions()
    {
        return $this->has_many('Production');
    }
 
}