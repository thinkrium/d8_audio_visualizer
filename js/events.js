var events = {
    add : function(element, event, funct, bubble = false) {
        if(element.addEventListener) {
            element.addEventListener(event, funct, bubble);
        }
        else if(element.attachEvent) {
            element.attachEvent("on" + event, funct, bubble);
        }
    },
    
    fire : function (element , event) {
        if(element.fireEvent) {
            element.fireEvent('on' + event);
        }  
        else {
            element.dispatchEvent(event);
        }
    }
}