// the interface is supposed to work cross project

function _interface() {
    
    //private

    var p = new _parent();
    
    var local = this;
    
    var config = {}
    
    var dom = {};
    
    var events;
    
    
    // TODO: NEED TO MAKE SURE THERE IS A FALLBACK FOR NON CURRENT BROWSERS
    //       FOR THE AUDIO TAG
    
    // set_dom
    // params : audio element from the visualization app                   
    // functions : takes the parameter and sets the dom  in a private function
    //              that can be called from init;
    // returns : nothing
    var set_dom = function(aud_element) {
        try {
            dom['audio_element'] = aud_element;
            
            

            if (document.getElementById('audio_visualizer_block')) {
                
                var audio_track_container = document.getElementById('audio_visualizer_block');
                    
//                audio_track_container.appendChild(dom.audio_element);
                dom['play_button'] = document.createElement('div');
                dom.play_button.id = "play_visualization";
                dom.play_button.innerText = "See Visualization";
                audio_track_container.appendChild(dom.play_button);                 
            }
            if (document.getElementById('            audio_visualizer_test_page_container')) {
                
                var audio_track_container = document.getElementById('audio_visualizer_test_page_container');
                    
                audio_track_container.appendChild(dom.audio_element);
                dom['play_button'] = document.createElement('div');
                dom.play_button.id = "play_visualization";
                dom.play_button.innerText = "See Visualization";
                audio_track_container.appendChild(dom.play_button);                 
            }
            else {
//                 document.body.appendChild(dom.audio_element);
//                 dom['play_button'] = document.createElement('div');
//                 dom.play_button.id = "play_visualization";
//                 dom.play_button.innerText = "See Visualization";
//                 document.body.appendChild(dom.play_button);
            }

//                dom.audio_element.autoplay = true;
//                dom.audio_element.muted = true;

           console.log("you can make the audio element visible by turning on controls again this is in set_dom() in interface.js");

//                  dom.audio_element.controls = true;
//                dom.audio_element.loop = true;
        }
        catch(Exception) {
            console.log("There was an error building the dom. See the interface app.");
        }

    }   
    
    // include_events
    // param : event object
    // functions allows the event creation to be built once and sent in
    //           for use as with crossbrowser reliability as import is not 
    //          standard yet ... this sets the param to a local object
    // returns : none
    var include_events = function(ev) {
        
        events = ev;
    }
    
    // public
    
    // make_friends 
    // params: visualzer is the visualizing drawing object object to call the
    //                data function
    // functions : takes in the object and sets the parent value of 
    //             visualizer to the injected object
    // returns : none
    local.make_friends = function(visualzer) {
        p.set_setting('visualizer', visualzer);
    }

    // init
    // param: none
    // functions calls all the necessary functionality to create an easier api
    // returns : local for chaining
    local.init = function(audio_element, events) {
        
        set_dom(audio_element);
        
        include_events(events);

        return local;
    }
    
    // get_settings
    // params : setting_name  defaults to all
    // functions returns the parents configuration settings for use later if the param utilizes default it returns the whole config settings otherwise returns the named setting
    // returns parent config
    local.get_setting = function (setting_name = "all") {
         return p.get_setting(setting_name);
    }

    // get_dom
    // params : setting_name  defaults to all
    // functions returns the parents configuration settings for use later if the param utilizes default it returns the whole config settings otherwise returns the named setting
    //  returns dom config
    local.get_dom = function (setting_name = "all") {
         return (setting_name == 'all') ? dom : dom[setting_name];
    }
    
    // get_song_title 
    // param: none
    // functions : it grabs the song title from the dom and then returns just the title
    // returns : song title
    local.get_song_title = function() {
        return (document.getElementById('audio_vis_track_title')) ?
         document.getElementById('audio_vis_track_title').innerText : '' ;
    }
    // Debug
    // parameter : all is a boolean for all settings or 1 specific setting
    // parameter : setting name is a string that takes a specific setting name 
    //             from the parent object and logs it to the console
    //             it is coded/designed to get all settings and should include 
    //             an intentional name for specific settings
    // returns the local object for chaining
    local.debug = function (all = true, setting_name = null ) {
        if(all) {
            console.log("Config settings", p.get_setting());
        }
        else {
            console.log("Config settings", p.get_setting(setting_name));
        }
        
        return local;
    }
    
    // TODO : USE AS A CALLBACK UNTIL WE FIND A BETTER SOLUTION
    //        GOAL - TAKE ADVANTAGE OF THE EXISTING RAF LOOP
    
    // visualize 
    // params : data contains the audio data to draw
    // functions : creates a callback to visualize the audio and called in 
    //              visulization.js
    // returns : none
    local.visualize = function(audio_data) {

    }
    
        
}
