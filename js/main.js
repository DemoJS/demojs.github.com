/*********
 *
 * DEMO JS -- The web only demoparty -- June 28-30 2013 @ Paris/Isart Digital
 *
 *********/

jQuery( function($){

  function resizeSections(){
    var height  = window.innerHeight,
        width   = window.innerWidth;
    $("section").css({
        "height"  : height + "px", 
        "width"   : width + "px"
    });
    $("section .content").css({
        "height"  : (height - 100 ) + "px"
    })
  }


  // 1 - place sections correctly (as defined in the markup)

  function setupContainer( $container ){
    $container.css({
      position  : "absolute"
    });

    return $container;
  }

  function setElementPosition(i, elt){
    var $elt  = $(elt),
        x     = $elt.data("x"),
        y     = $elt.data("y");
    $elt.css({
      "position": "absolute",
      "top"     : y+"px",
      "left"    : x+"px"
    });
  }

  // 2 - Handler for moving around

  function setupMove($container, $links, $bg){

    $links.each(function(){
      var $link         = $(this),
          targetContent = $link.attr("href"),
          $targetContent= $(targetContent),
          offset        = $targetContent.position(),
          translateX    = offset.left?"-"+offset.left+"px":"0",
          translateY    = offset.top?"-"+offset.top+"px":"0",
          bgTranslateX  = offset.left?"-"+(offset.left/2)+"px":"0",
          bgTranslateY  = offset.top?"-"+(offset.top/2)+"px":"0",
          zTransform    = Zanimo.transitionf("transform", "translate("+translateX+", "+translateY+")", 1000, "ease-in-out"),
          bgTransform  = Zanimo.transitionf("transform", "translate("+bgTranslateX+", "+bgTranslateY+")", 1000, "ease-in-out");

      $link.click(function(e){
        e.preventDefault();
        Q.all( [
          Zanimo($container[0]).then(zTransform),
          Zanimo($bg[0]).then(bgTransform)
        ]).fail(function(e){console.log(e)})
      });
        
    });

  }

  function setupBackground(){
    var $bg = $(".background");

    $bg.css({
      "height"  : "1000%",
      "width"   : "1000%"
    });

    return $bg;
  }

  var $container  = $("#content"),
      $navLinks   = $("nav a"),
      $bg         = setupBackground();
  setupContainer( $container ).find("section").each(setElementPosition);
  setupMove($container, $navLinks, $bg);
  resizeSections();
  window.onresize = _.debounce( resizeSections , 200);

})
