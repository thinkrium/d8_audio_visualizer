// this is the parent class the api that is called by interface.js

function _visualizer() {
    
    // private
    var p = new _parent();
    
    var local = this;
    
    var config  = {
        visualizer : '',
    };
    
    var dom     = {};
    
    // name      : set_visualization_container
    // param     : none
    // functions : finds the container to hold the visualized content and sets 
    // return    : none
    var set_visualization_container = function() {
        
        dom['audio_visualizer_block'] = document.getElementById('audio_visualizer_block');
        
        dom['audio_visualizer_test_page_container'] = document.getElementById('audio_visualizer_test_page_container');

        config['visualization_type'] = document.getElementById('visualization_type').innerText;

    }
    
    // name      : set_container_size 
    // param     : context which is either page or block
    // functions : takes advantage of the existing containers and 
    //                determines its size and sets it to the parent object
    // returns   : none
    var set_container_size = function(context) {

       if(context == "block") {
          
           let block_dimensions = {};
          
            // let keyword keeps scope
            let temp_block_dimensions = window.getComputedStyle(dom.audio_visualizer_block);
           
             block_dimensions['width']  = temp_block_dimensions.width;
             block_dimensions['height'] = temp_block_dimensions.height;

             p.set_setting('block_dimensions', block_dimensions);
        
       }
       else if (context == 'page') {

           let page_dimensions = {};

           let temp_page_dimensions = window.getComputedStyle(dom.audio_visualizer_test_page_container);
           
            page_dimensions['width']  = temp_page_dimensions.width;
            page_dimensions['height'] = temp_page_dimensions.height;
        
            p.set_setting('page_dimensions',  page_dimensions);
       }
    }
    
    // public

    // name      : init 
    // param     : none
    // functions : sets up the page for the markup 
    // returns   : none;
    local.init = function() {

        set_visualization_container();
        
        if(dom.audio_visualizer_test_page_container) {
            set_container_size('page');
        }
        if(dom.audio_visualizer_block) {
            set_container_size('block');
        }
        
        
    }
    
    
    // name      : draw_visualization
    // param     : data is the information sent by the file
    // functions : takes in the data and calls the correct function or class
    // returns   : none
    local.draw_visualization = function(data) {
        if(config.visualization_type == "lines") {
            config.visualizer['standard'] = new _standard();
            
            
           ///////////////////
           //// need to put this in a function
           ///////////////////
            config.visualizer.standard.create_markup(dom.audio_visualizer_block);
            ///////////////////
            ///////////////////
            ///////////////////
        }
    }
    
    // name      : debug
    // param     : none
    // function  : logs out each of local settings
    // returns   : none
    local.debug = function() {
         console.log("parent", p.get_settings());
         console.log('config', config);
         console.log('dom', dom);
    }
    
    
    
       
}