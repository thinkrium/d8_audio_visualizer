// create a parent class to keep DRY principles
// inherit from the parent class when beneficial

// might change the chaining concept based on benefits and syntactical
// comfort and ease

function _parent() {
    
    // private
    var local = this;
    
    var config = {};
    
    // public
    
    // set_setting
    // param : setting name to set the config settings
    // params : setting value to set the value of the setting name to.    
    // functions : sets the setting based on the setting name
    // returns : none
    local.set_setting = function(setting_name, setting_value) {
        
        config[setting_name] = setting_value;
    }
    
    // get_setting
    // param : setting name to get the config settings which defaults to all  
    // functions : gets the setting based on the setting name if the param is set to 'all' which is the default than it grabs all settings
    // returns : none
    local.get_setting = function(setting_name = 'all') {
        
        return (setting_name == "all") ? config : config[setting_name];
    }
    
}