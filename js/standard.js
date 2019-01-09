// this is the standard bar functionality
// it inherits visualized_ancestor
function _standard() {
    
    
    // private
   var local = this;
   
   var p = _parent();
   
   var config = {};
   
   var dom = {};

   // public
   
   // name     : determine_bar_count
   // param    : container_size is the container width 
   // param    : bar_width is the width of the bars 
   // function : creates the appropriate amount of bars;
   // returns  : none
   local.determine_bar_count = function(container_size, bar_width) {
       config["bar_count"] = container_size / bar_width;
   }
   
   // name      :  create_markup
   // param     :  correct_container is the id of the chosen container
   // functions :  creates markup and appends the appropriate container 
   // returns   : none
   local.create_markup = function(correct_container) {
       
      let overall_container = document.createElement('div');
      
      overall_container.class = "overall_container";

      for(var i = 0; i < config.bar_count; i++) {
          
          let bar_container = document.create_element('div');
          
          bar_container.class = "audio_levels " + (i + 1);
          
          bar_container.appendChild(bar_container);    
      }
      
   }
   
   
   
}