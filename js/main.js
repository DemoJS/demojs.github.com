/*********
 *
 * DEMO JS -- The web only demoparty -- June 28-30 2013 @ Paris/Isart Digital
 *
 *********/

// Request animation frame polyfill by Paul Irish... 
window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            function( callback ){
                          window.setTimeout(callback, 1000 / 60);
            };
})();

jQuery( function($){
})
