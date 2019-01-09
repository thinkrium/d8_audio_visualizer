// building an audio visualizer to use for a musicians website and/or other app

// objective -- visually represent the audio signal with a html element

function _visualizer_set_up() {
    
    //private

    // create parent
    var p = new _parent();
    // get object
    var local = this;

    var config = {
        playable : false,
    };    
    
    
    // build a list of defaults
    // calls the main thread like c++ or java

    const all_settings = true;
    const specific_setting = false;
    const debug_on = true;
    const debug_off = false;


    
    
    // Debug
    // parameter : all is a boolean for all settings or 1 specific setting
    // parameter : setting name is a string that takes a specific setting name 
    //             from the parent object and logs it to the console
    //             it is coded/designed to get all settings and should include 
    //             an intentional name for specific settings
    // returns the local object for chaining
    var debug = function (all = true, setting_name = null ) {
        if(all) {
            console.log("Config settings", p.get_setting());
        }
        else {
            console.log("Config settings", p.get_setting(setting_name));
        }
        
        return local;
    }
    
    // set_analized_audio_data 
    // params : none
    // functions : fills the audio_buffer array with the data from the audio
    //             track
    // return : nothing
    var set_analized_audio_data = function() {
     
        p.get_setting('audio_analyzer').getByteFrequencyData
        (p.get_setting('analized_audio_buffer'));  

        return local;    
    }
    
    // get_analized_audio_data
    // params : none
    // functions : gets the analyzed audio data from the buffer
    // returns audio buffer
    var get_analized_audio_data = function() {
        return p.get_setting('analized_audio_buffer');
    }
    

    // start_render 
    // params: none
    // functions : creates a rAF Loop to perform the playback and also draw
    //             draw the data
    // returns : none
    var start_render = function () {
        
        // according to Mozilla most  of the browsers support the basic 
        // requestAnimationFrame but samsung internet so this polyfill might
        // be an overkill but whatever
            
            window.requestAnimationFrame(start_render);

        
            if(config.playable) {

                // the analized data is set and returned live during run time
                // so both functions are called here during playback
                set_analized_audio_data();
                p.get_setting('visual_interface').visualize(get_analized_audio_data());
            }
            else {
            }
    }
        
    
    // public
    
    
    // init
    // param : nothing
    // functions : initiates cleans up the code base for use as an api
    // returns : local object for chaining
    local.init = function(path_object) {
         local.set_path(path_object); 
         local.parse_path();
         local.create_raf_polyfill();
         local.build_context();
         local.set_analyzer();
         local.create_audio_output();
         local.create_audio_source();
         local.connect_io();
         
    } 
    
    // get_path
    // param : path is the path information
    // functions  sets the path information for the audio track
    // returns the local object for chaining
    local.set_path = function(path) {
        
        p.set_setting('audio_path', path);

        return local;
    }

    // parse_path
    // param: none
    // functions : parses the path and then ensures its correctly set
    // return local object for chaining
    local.parse_path = function() {
        
        try {
            if(p.get_setting('audio_path') != 'undefined') {
                fetch(p.get_setting('audio_path')).then(function(data) {
                    if(!data.ok) {
                        throw "That path does not exist";
                    }
                    else {
                        config.playable = true;
                    }
                });
            }
        }
        catch(Exception) {
            console.log((Exception || 'The audio path has not been set yet!'));
        }
        return local;
    }

    // build_context
    // params : none 
    // function: sets the context to the local config settings
    // returns local object for chaining
    local.build_context = function() {
  
       try {
            p.set_setting('audio_context', new (window.AudioContext || window.webkitAudioContext)());   
       }
       catch(Exception)  {
            console.log("Audio context could not be created!");
       }
       
       return local;
    }
    

    // set_analyzer 
    // params :  none
    // functions : takes advantage of existing settings to create an analyzer
    //             out of the audio context for later use
    // returns local object for chaining
    local.set_analyzer = function() {
        
        try {
            if(p.get_setting('audio_context') != "undefined") {

                p.set_setting('audio_analyzer', p.get_setting('audio_context').createAnalyser() );

                let buffer_length = p.get_setting('audio_analyzer').frequencyBinCount;
                 
                p.set_setting('analized_audio_buffer', new Uint8Array(buffer_length) );

            }
        }
        catch(Exception) {
            console.log("Could not create an audio analyzer please find the bug! ");
        }
        return local;
    }

    // create_audio_output
    // param : none;
    // functions attempts to create the audio out put
    // returns : local object for chaining;
    local.create_audio_output = function() {
        try{
            p.set_setting('gain_node', p.get_setting("audio_context").createGain());
            p.get_setting('gain_node').gain.setValueAtTime(.4, p.get_setting("audio_context").currentTime);
        }
        catch(Exception) {
            console.log("Could not connect the gain node for the audio visualizer.");
        }
        
        return local;
    }
    
    // create_audio_source
    // param : none
    // functions : creates an audio element for the playback and analyzing
    //             if one doesn't exist; If one does exist than it takes
    //             advantage of the existing audio
    //  returns local for chaining
    local.create_audio_source = function() {
        
        try {
            
            var audio_element = document.getElementsByTagName("audio");
            
            if (audio_element.length == 0 ) {        


                 p.set_setting('audio_element', document.createElement('audio'));
             
                 p.get_setting("audio_element").id = "audio_visualized_elem";

                 p.get_setting('audio_element').src = p.get_setting('audio_path');
             }
             else {
                p.set_setting('audio_element', audio_element[0]);

             }
             try {
                  p.set_setting('audio_source', p.get_setting('audio_context').createMediaElementSource(p.get_setting('audio_element')));
             }
             catch(Exception) {
                  console.log("Could not create audio source in the audio visualizer create audio source module.")   
             }

        }
        catch(Exception) {
            console.log('Something is wrong check the path of the audio track!', Exception);
        }
        
        return local;
    }

    // play 
    // param: none
    // functions : initiates the audio file playback
    // returns : none
    local.play = function() {
        
      start_render();
    }
    
    // make_friends 
    // params: interf is the interface drawing object object to call the data function
    // functions : takes in the object and sets the parent value of 
    //             visual_interface to the injected object
    // returns : returns the object
    local.make_friends = function(interf) {
        p.set_setting('visual_interface', interf);
    }
    
    // create_raf_polyfill
    // param : none
    // functions : creates a poly fill for the request animation frame
    // returns : nothin
    local.create_raf_polyfill = function() {

        // according to Mozilla most  of the browsers support the basic 
        // requestAnimationFrame but samsung internet so this polyfill might
        // be an overkill but whatever
            
        config['rAF'] = window.requestAnimationFrame ||
                               window.webkitRequestAnimationFrame ||
                               window.mozRequestAnimationFrame    ||
                               function( callback ){
                                return window.setTimeout(callback, 1000 / 60);
                        };
                        
        return local;
    }
    
    // connect_io 
    // params : none
    // functions : connect the source, context, analyzer 
    // returns    : local for chaining
    local.connect_io = function () {
        
        try  {
            p.get_setting('audio_source').connect(p.get_setting('gain_node'));
        }
        catch(Exception) {
            console.log("Could not connect the audio gain in the CONNECT_IO FUNCTION module.");     
        }

        
        try {

              p.get_setting('gain_node').connect(p.get_setting('audio_context').destination);
              
            // automatically play the track
            //////////////////////////////////////
              p.get_setting('audio_source').connect(p.get_setting('audio_analyzer'));


        }
        catch(e) {
            console.log ("Could not connect the inputs or outputs!");
        }
        return local;
    } 
    
    // get_settings
    // params : setting_name  defaults to all
    // functions returns the parents configuration settings for use later if the param utilizes default it returns the whole config settings otherwise returns the named setting
    // returns parent config
    local.get_setting = function (setting_name = "all") {
         return p.get_setting(setting_name);
    }
    
}
