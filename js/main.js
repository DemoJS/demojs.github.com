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

document.addEventListener("DOMContentLoaded", function(){

  function createShaderFromScriptElement(doc, glCtx, scriptId){
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

  (function setupShaderStuff(container){
    var canvas  = document.createElement("canvas"),
        ctx     = canvas.getContext("experimental-webgl"),
        vShader = createShaderFromScriptElement(document, ctx, "2d-vertex-shader"),
        fShader = createShaderFromScriptElement(document, ctx, "2d-fragment-shader"),
        program = ctx.createProgram(),
        X       = window.innerWidth,
        Y       = window.innerHeight;

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
      requestAnimationFrame(update);
    });

    container.appendChild(canvas);
  })(document.getElementById("background"));

  (function setupNavBar( navElement ){
    var checkNavBar = function check(){
          var top = (document.documentElement && document.documentElement.scrollTop) ||
                    document.body.scrollTop,
              fullHeight = window.innerHeight;
          if(top > fullHeight) navElement.className = "topNav";
          else navElement.className = "flowNav";
        };
    checkNavBar();
    window.addEventListener("scroll", _.throttle(checkNavBar, 60))
  })(document.getElementById("mainNav"))
})
