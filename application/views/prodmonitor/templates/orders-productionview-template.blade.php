<script id="orders-productionview-template" type="text/html"> 
    <form class="form-horizontal">  
            <fieldset>  
              <legend>Today's Production</legend>  
              <div class="control-group">  
                <label class="control-label" for="quantity8amto12pm">08 AM - 12 PM</label>  
                <div class="controls">  
                  <input type="text" class="input-small" id="quantity8amto12pm" value="<%= quantity8amto12pm %>">   
                </div>  
              </div>  
               <div class="control-group">  
                <label class="control-label" for="quantity12pmto4pm">08 AM - 12 PM</label>  
                <div class="controls">  
                  <input type="text" class="input-small" id="quantity12pmto4pm" value="<%= quantity12pmto4pm %>">   
                </div>  
              </div> 
              <div class="control-group">  
                <label class="control-label" for="quantity4pmto8pm">08 AM - 12 PM</label>  
                <div class="controls">  
                  <input type="text" class="input-small" id="quantity4pmto8pm" value="<%= quantity4pmto8pm %>">   
                </div>  
              </div> 
              <div class="control-group">  
                <label class="control-label" for="quantity8pmto12am">08 AM - 12 PM</label>  
                <div class="controls">  
                  <input type="text" class="input-small" id="quantity8pmto12am" value="<%= quantity8pmto12am %>">   
                </div>  
              </div> 
              <div class="control-group">  
                <label class="control-label" for="quantity12amto4am">08 AM - 12 PM</label>  
                <div class="controls">  
                  <input type="text" class="input-small" id="quantity12amto4am" value="<%= quantity12amto4am %>">   
                </div>  
              </div> 
             <div class="control-group">  
                <label class="control-label" for="quantity4amto8am">08 AM - 12 PM</label>  
                <div class="controls">  
                  <input type="text" class="input-small" id="quantity4amto8am" value="<%= quantity4amto8am %>">   
                </div>  
              </div> 
            </fieldset> 
        <hr/>
        <div> 
            <button id="cancelsavingproduction" type="button" class="btn">Cancel</button>
            <button id="saveproduction" type="button" class="btn btn-primary">Save changes</button>
        </div>   
    </form>   
</script>