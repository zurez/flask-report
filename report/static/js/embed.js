(function() {

// Localize jQuery variable
var jQuery;

/******** Load jQuery if not present *********/
if (window.jQuery === undefined || window.jQuery.fn.jquery !== '1.4.2') {
    var script_tag = document.createElement('script');
    script_tag.setAttribute("type","text/javascript");
    script_tag.setAttribute("src",
        "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
    if (script_tag.readyState) {
      script_tag.onreadystatechange = function () { // For old versions of IE
          if (this.readyState == 'complete' || this.readyState == 'loaded') {
              scriptLoadHandler();
          }
      };
    } else {
      script_tag.onload = scriptLoadHandler;
    }
    // Try to find the head, otherwise default to the documentElement
    (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
} else {
    // The jQuery version on the window is the one we want to use
    jQuery = window.jQuery;
    main();
}

/******** Called once jQuery has loaded ******/
function scriptLoadHandler() {
    // Restore $ and window.jQuery to their previous values and store the
    // new jQuery in our local jQuery variable
    jQuery = window.jQuery.noConflict(true);
    // Call our main function
    main(); 
}
// **************Callback
function test(data){
    alert(data.title);
}

/******** Our main function ********/
function main() { 
    jQuery(document).ready(function($) { 
        /******* Load CSS *******/
        
        

        /******* Load HTML *******/
        var jsonp_url = "http://al.smeuh.org/cgi-bin/webwidget_tutorial.py?callback=?";


        $.getJSON(jsonp_url, function(data) {
            
          $('#survaider_survey').html("This data comes from another server: " + data.html);
             var css_link = $("<link>", { 
            rel: "stylesheet", 
            type: "text/css", 
            href: "data.css" 
                     });
             css_link.appendTo('head');          //Appens to Body  //Do tvhis for as many asset
             vas js_link= $("<script>", { 
             
            type: "text/javascript", 
            src: "data.jss" 
                     });
             js_link.appendTo('head');
        });
    });
}

})(); // We call our anonymous function immediately