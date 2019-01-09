"use strict"

function main() {
    
    // create the objects
    var visualizer_set_up = new _visualizer_set_up();
    
    var intfce = new _interface();
    
    var visualizer = new _visualizer();
    
    // initiate the objects
    visualizer_set_up.init(intfce.get_song_title());
    
    intfce.init(visualizer_set_up.get_setting('audio_element'), events);
    
    visualizer.init();

    // handshake
    visualizer_set_up.make_friends(intfce);
    
    intfce.make_friends(visualizer);
    
    visualizer.draw_visualization();
    
    // add events
    visualizer_set_up.get_setting('audio_element').onplay = function() {

         // this line is the player pressing audio        
          visualizer_set_up.get_setting("audio_context").resume();
          visualizer_set_up.get_setting('audio_element').play();

          // i think this line is what grabs the interface        
          visualizer_set_up.play();
          
    }

    events.add(intfce.get_dom('play_button'), 'click', function() {

         // this line is the player pressing audio        
          visualizer_set_up.get_setting("audio_context").resume();
          visualizer_set_up.get_setting('audio_element').play();

          // i think this line is what grabs the interface        
          visualizer_set_up.play();

    })
    

}

events.add(window, "load", main());