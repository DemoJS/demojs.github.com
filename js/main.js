/*********
 *
 * DEMO JS -- The web only demoparty -- October 10-11 2014
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

var isMobile = (function(a,b){return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);

document.addEventListener("DOMContentLoaded", function(){

  var contentSize = document.querySelector("#index .content").getBoundingClientRect(),
      indexDom = document.querySelector("#index .content");

  if(isMobile){
    indexDom.style.position = "inherit";
  }

  function createShaderFromScriptElement(doc, glCtx, scriptId){
    if(!glCtx) throw new Exception("Incorrect GL context");
    var shaderElt   = doc.getElementById(scriptId),
        shaderSrc   = shaderElt.text,
        shaderType  = (function(ctx, t){
          if(t === "x-shader/x-vertex")        return ctx.VERTEX_SHADER;
          else if(t === "x-shader/x-fragment") return ctx.FRAGMENT_SHADER;
          else throw new Error("Can't guess the type of the shader with id "+scriptId);
        })(glCtx, shaderElt.type),
        shader      = glCtx.createShader(shaderType);

    glCtx.shaderSource(shader, shaderSrc);
    glCtx.compileShader(shader);

    if(!glCtx.getShaderParameter(shader, glCtx.COMPILE_STATUS)){
      console.log("shader " + shader + " failed with error : " + glCtx.getShaderInfoLog(shader));
      throw new Error("fuckit!");
    }

    return shader;
  };

  if(!isMobile) {
    (function setupShaderStuff(container){
      var canvas  = document.createElement("canvas"),
          ctx     = canvas.getContext("experimental-webgl"),
          vShader = createShaderFromScriptElement(document, ctx, "2d-vertex-shader"),
          fShader = createShaderFromScriptElement(document, ctx, "2d-fragment-shader"),
          program = ctx.createProgram(),
          X       = contentSize.width,
          Y       = contentSize.height;

      canvas.width  = X;
      canvas.height = Y;

      ctx.viewport(0, 0, X, Y);

      ctx.attachShader(program, vShader);
      ctx.attachShader(program, fShader);

      ctx.linkProgram(program);

      ctx.useProgram(program);

      var posLoc    = ctx.getAttribLocation(program, "a_position"),
          buffer    = ctx.createBuffer(),
          centerLoc = ctx.getUniformLocation(program, "u_center"),
          centerLoc2 = ctx.getUniformLocation(program, "u_center2");

      ctx.bindBuffer(ctx.ARRAY_BUFFER, buffer);
      ctx.bufferData(
          ctx.ARRAY_BUFFER,
          new Float32Array([
            -1.0, -1.0,
            1.0, -1.0,
            -1.0,  1.0,
            -1.0,  1.0,
            1.0, -1.0,
            1.0,  1.0
            ]),
          ctx.STATIC_DRAW
          );

      ctx.enableVertexAttribArray(posLoc);
      ctx.vertexAttribPointer(posLoc, 2, ctx.FLOAT, false, 0, 0);

      requestAnimFrame(function update(){
        var x       =  Math.sin( (new Date()).getTime() / 5000 ) * X,
            y       =  Math.sin( (new Date()).getTime() / 5000 ) * Y,
            x2      =  Math.sin( (new Date()).getTime() / 4000 ) * X,
            y2      =  Math.sin( (new Date()).getTime() / 7000 ) * Y,
            center  = ctx.uniform2f( centerLoc, x, y),
            center2 = ctx.uniform2f( centerLoc2, x2, y2);
        ctx.drawArrays(ctx.TRIANGLES, 0, 6);
        requestAnimFrame(update);
      });

      container.appendChild(canvas);
    })(document.getElementById("background"));
  }

  (function setupNavBar( navElement ){
    var parent      = navElement.parentElement,
        src         = parent.innerHTML.replace("mainNav", "").replace("undef", "spacing"),
        contentSize = document.querySelector("#index .content").getBoundingClientRect(),
        checkNavBar = function check(){
          var top = (document.documentElement && document.documentElement.scrollTop) ||
                    document.body.scrollTop,
              fullHeight = contentSize.height;
          if(top > fullHeight) navElement.className = "topNav";
          else navElement.className = "flowNav";
        };
    parent.insertAdjacentHTML("beforeend", src);
    checkNavBar();
    window.addEventListener("scroll", requestAnimFrame.bind(window, checkNavBar))
  })(document.getElementById("mainNav"))

  //Smooth scrooll
  // FIXME : this jQuery animate, and we do not like that
  // Script originally found on http://css-tricks.com/snippets/jquery/smooth-scrolling/
  $('a[href*=#]:not([href=#])').click(function(e) {
    e.preventDefault();
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var hash = this.hash,
          target = $(hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000, function(){
          window.location.hash=hash;
        });
      }
    }
  });
});
