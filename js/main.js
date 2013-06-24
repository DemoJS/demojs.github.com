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
  //
  function currentPosition(){
  
  }

  function setupMove($container, $links, $bg){
    var fForLinks = _.reduce($links, function(memo, link){
      var $link         = $(link),
          targetContent = $link.attr("href"),
          $targetContent= $(targetContent),
          offset        = $targetContent.position(),
          translateX    = offset.left?"-"+offset.left+"px":"0",
          translateY    = offset.top?"-"+offset.top+"px":"0",
          bgTranslateX  = offset.left?"-"+(offset.left/2)+"px":"0",
          bgTranslateY  = offset.top?"-"+(offset.top/2)+"px":"0",
          zTransform    = Zanimo.transitionf("transform", "translate("+translateX+", "+translateY+")", 1000, "ease-in-out"),
          bgTransform   = Zanimo.transitionf("transform", "translate("+bgTranslateX+", "+bgTranslateY+")", 1000, "ease-in-out");

      $targetContent.attr("id", targetContent + "_inactive");
        
      memo[targetContent] = [
        zTransform, 
        bgTransform,
        [translateX, translateY],
        $link
      ];
      return memo;
    }, {});

    window.onhashchange = function(e){
      window.moveToHash(location.hash);
    };

    window.moveToHash = function(hash){
      var f         = fForLinks[hash],
          functions = f?f:fForLinks["#index"];
      $links.removeClass("current");
      functions[3].addClass("current");
      Q.all( [
        Zanimo($container[0]).then(functions[0]),
        Zanimo($bg[0]).then(functions[1])
      ]).fail(function(e){
        console.log(e);
        //If we can't do a transition, let's show the page at least :P
        $container.css("transform", "translate("+functions[2][0]+", "+functions[2][1]+")");
      });
    };
  }


  function setupBackground(){
    var $bg = $(".background");

    $bg.css({
      "height"  : "1000%",
      "width"   : "1000%"
    });

    return $bg;
  }

  function sendLinksToOtherWindow($links){
    $links.attr("target", "_blank");
  }

  var $container  = $("#content"),
      $navLinks   = $("nav ul:first-child a"),
      $bg         = setupBackground(),
      $outLinks   = $("a[href^='http://'], a[href^='https://']");
  setupContainer( $container ).find("section").each(setElementPosition);
  setupMove($container, $navLinks, $bg);
  sendLinksToOtherWindow($outLinks);
  resizeSections();
  window.onresize = _.debounce( resizeSections , 200);

  setTimeout(function(){
      window.moveToHash(location.hash);
  }, 50);

})
