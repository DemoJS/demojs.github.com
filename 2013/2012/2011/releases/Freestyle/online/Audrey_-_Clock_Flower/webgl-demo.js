var canvasCube;
var glCube;
var cubeVerticesBuffer;
var cubeVerticesColorBuffer;
var cubeVerticesIndexBuffer;
var cubeVerticesIndexBuffer;
var cubeRotation = 0.0;
var cubeXOffset = 0.0;
var cubeYOffset = 0.0;
var cubeZOffset = 0.0;
var lastCubeUpdateTime = 0;
var xIncValue = 0.2;
var yIncValue = -0.4;
var zIncValue = 0.3;

var mvMatrix;
var shaderProgram;
var vertexPositionAttribute;
var vertexColorAttribute;
var perspectiveMatrix;


// startCube
// Called when the canvasCube is created to get the ball rolling.
function startCube() 
{
	canvasCube = document.getElementById("canvasCube");
	initWebGLCube();      // Initialize the GL context
	canvasCube.width = window.innerWidth;
	canvasCube.height = window.innerHeight;
	glCube.viewport(0, 0, canvasCube.width, canvasCube.height);
  // Only continue if WebGL is available and working
  
  if (glCube) 
  {
    glCube.clearColor(0.0, 0.0, 0.0, 0.0);  // Clear to black, fully opaque
    glCube.clearDepth(1.0);                 // Clear everything
    glCube.enable(glCube.DEPTH_TEST);           // Enable depth testing
    glCube.depthFunc(glCube.LEQUAL);            // Near things obscure far things
    // Initialize the shaders; this is where all the lighting for the
    // vertices and so forth is established.
    initShadersCube();
    // Here's where we call the routine that builds all the objects
    // we'll be drawing.
    initBuffersCube();
    // Set up to draw the scene periodically.
	setInterval(drawScene, 15);
	}
}

function initWebGLCube() 
{
	
	glCube = null;
	var names = [ "webgl", "experimental-webgl", "moz-webgl", "webkit-3d" ];
    for (var i=0; names.length>i; i++) {
		try { 
            glCube = canvasCube.getContext(names[i]);
            if (glCube) { break; }
         } catch (e) { }
     }
	// If we don't have a GL context, give up now
  if (!glCube) {
    alert("Unable to initialize WebGL. Your browser may not support it.");
  }
}

// initBuffers
// Initialize the buffers we'll need. For this demo, we just have
// one object -- a simple two-dimensional cube.
function initBuffersCube() 
{
  // Create a buffer for the cube's vertices.
  cubeVerticesBuffer = glCube.createBuffer();
  // Select the cubeVerticesBuffer as the one to apply vertex
  // operations to from here out.
  glCube.bindBuffer(glCube.ARRAY_BUFFER, cubeVerticesBuffer);
  // Now create an array of vertices for the cube.
  var vertices = [
    // Front face
    -1.0, -1.0,  1.0,
     1.0, -1.0,  1.0,
     1.0,  1.0,  1.0,
    -1.0,  1.0,  1.0,
    
    // Back face
    -1.0, -1.0, -1.0,
    -1.0,  1.0, -1.0,
     1.0,  1.0, -1.0,
     1.0, -1.0, -1.0,
    
    // Top face
    -1.0,  1.0, -1.0,
    -1.0,  1.0,  1.0,
     1.0,  1.0,  1.0,
     1.0,  1.0, -1.0,
    
    // Bottom face
    -1.0, -1.0, -1.0,
     1.0, -1.0, -1.0,
     1.0, -1.0,  1.0,
    -1.0, -1.0,  1.0,
    
    // Right face
     1.0, -1.0, -1.0,
     1.0,  1.0, -1.0,
     1.0,  1.0,  1.0,
     1.0, -1.0,  1.0,
    
    // Left face
    -1.0, -1.0, -1.0,
    -1.0, -1.0,  1.0,
    -1.0,  1.0,  1.0,
    -1.0,  1.0, -1.0
  ];
  
  // Now pass the list of vertices into WebGL to build the shape. We
  // do this by creating a Float32Array from the JavaScript array,
  // then use it to fill the current vertex buffer.
  glCube.bufferData(glCube.ARRAY_BUFFER, new Float32Array(vertices), glCube.STATIC_DRAW);
 
  // Now set up the colors for the faces. We'll use solid colors
  // for each face.
  var colors = [
    [Math.floor(Math.random()*10)/10,  Math.floor(Math.random()*10)/10,  Math.floor(Math.random()*10)/10,  0.5],    // Front face: white
    [Math.floor(Math.random()*10)/10,  Math.floor(Math.random()*10)/10,  Math.floor(Math.random()*10)/10,  0.6],    // Back face: red
    [Math.floor(Math.random()*10)/10,  Math.floor(Math.random()*10)/10,  Math.floor(Math.random()*10)/10,  0.7],    // Top face: green
    [Math.floor(Math.random()*10)/10,  Math.floor(Math.random()*10)/10,  Math.floor(Math.random()*10)/10,  0.8],    // Bottom face: blue
    [Math.floor(Math.random()*10)/10,  Math.floor(Math.random()*10)/10,  Math.floor(Math.random()*10)/10,  0.9],    // Right face: yellow
    [Math.floor(Math.random()*10)/10,  Math.floor(Math.random()*10)/10,  Math.floor(Math.random()*10)/10,  0.3]     // Left face: purple
  ];
  
  // Convert the array of colors into a table for all the vertices.
  var generatedColors = [];
  
  for (j=0; j<6; j++) {
    var c = colors[j];
    
    // Repeat each color four times for the four vertices of the face
    
    for (var i=0; i<4; i++) {
      generatedColors = generatedColors.concat(c);
    }
  }
  
  cubeVerticesColorBuffer = glCube.createBuffer();
  glCube.bindBuffer(glCube.ARRAY_BUFFER, cubeVerticesColorBuffer);
  glCube.bufferData(glCube.ARRAY_BUFFER, new Float32Array(generatedColors), glCube.STATIC_DRAW);

  // Build the element array buffer; this specifies the indices
  // into the vertex array for each face's vertices.
  cubeVerticesIndexBuffer = glCube.createBuffer();
  glCube.bindBuffer(glCube.ELEMENT_ARRAY_BUFFER, cubeVerticesIndexBuffer);
  
  // This array defines each face as two triangles, using the
  // indices into the vertex array to specify each triangle's
  // position.
  
  var cubeVertexIndices = [
    0,  1,  2,      0,  2,  3,    // front
    4,  5,  6,      4,  6,  7,    // back
    8,  9,  10,     8,  10, 11,   // top
    12, 13, 14,     12, 14, 15,   // bottom
    16, 17, 18,     16, 18, 19,   // right
    20, 21, 22,     20, 22, 23    // left
  ]
  
  // Now send the element array to GL
  
  glCube.bufferData(glCube.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(cubeVertexIndices), glCube.STATIC_DRAW);
}


// drawScene
// Draw the scene.
function drawScene() {
	
  // Clear the canvas before we start drawing on it.

  glCube.clear(glCube.COLOR_BUFFER_BIT | glCube.DEPTH_BUFFER_BIT);
  
  // Establish the perspective with which we want to view the
  // scene. Our field of view is 45 degrees, with a width/height
  // ratio of 640:480, and we only want to see objects between 0.1 units
  // and 100 units away from the camera.
  
  perspectiveMatrix = makePerspective(45, 640.0/480.0, 0.1, 100.0);
  
  // Set the drawing position to the "identity" point, which is
  // the center of the scene.
  
  loadIdentity();
  
  // Now move the drawing position a bit to where we want to start
  // drawing the cube.
  
  mvTranslate([-0.0, 0.0, -6.0]);
  
  // Save the current matrix, then rotate before we draw.
  
  mvPushMatrix();
  mvRotate(cubeRotation, [1, 0, 1]);
  mvTranslate([cubeXOffset, cubeYOffset, cubeZOffset]);
  
  // Draw the cube by binding the array buffer to the cube's vertices
  // array, setting attributes, and pushing it to GL.
  
  glCube.bindBuffer(glCube.ARRAY_BUFFER, cubeVerticesBuffer);
  glCube.vertexAttribPointer(vertexPositionAttribute, 3, glCube.FLOAT, false, 0, 0);
  
  // Set the colors attribute for the vertices.
  
  glCube.bindBuffer(glCube.ARRAY_BUFFER, cubeVerticesColorBuffer);
  glCube.vertexAttribPointer(vertexColorAttribute, 4, glCube.FLOAT, false, 0, 0);
  
  // Draw the cube.
  
  glCube.bindBuffer(glCube.ELEMENT_ARRAY_BUFFER, cubeVerticesIndexBuffer);
  setMatrixUniforms();
  glCube.drawElements(glCube.TRIANGLES, 36, glCube.UNSIGNED_SHORT, 0);
  
  // Restore the original matrix
  
  mvPopMatrix();
  
  // Update the rotation for the next draw, if it's time to do so.
  
  var currentTime = (new Date).getTime();
  if (lastCubeUpdateTime) {
    var delta = currentTime - lastCubeUpdateTime;
    
    cubeRotation += (30 * delta) / 1000.0;
    cubeXOffset += xIncValue * ((30 * delta) / 1000.0);
    cubeYOffset += yIncValue * ((30 * delta) / 1000.0);
    cubeZOffset += zIncValue * ((30 * delta) / 1000.0);
    
    if (Math.abs(cubeYOffset) > 2.5) {
      xIncValue = -xIncValue;
      yIncValue = -yIncValue;
      zIncValue = -zIncValue;
    }
  }
  
  lastCubeUpdateTime = currentTime;
}


// initShaders
// Initialize the shaders, so WebGL knows how to light our scene.
function initShadersCube() 
{
  var fragmentShader = getShaderCube(glCube, "shader-fs");
  var vertexShader = getShaderCube(glCube, "shader-vs");
  // Create the shader program
  shaderProgram = glCube.createProgram();
  glCube.attachShader(shaderProgram, vertexShader);
  glCube.attachShader(shaderProgram, fragmentShader);
  glCube.linkProgram(shaderProgram);
  // If creating the shader program failed, alert
  if (!glCube.getProgramParameter(shaderProgram, glCube.LINK_STATUS)) {
    alert("Unable to initialize the shader program.");
  }
  glCube.useProgram(shaderProgram);
  vertexPositionAttribute = glCube.getAttribLocation(shaderProgram, "aVertexPosition");
  glCube.enableVertexAttribArray(vertexPositionAttribute);
  vertexColorAttribute = glCube.getAttribLocation(shaderProgram, "aVertexColor");
  glCube.enableVertexAttribArray(vertexColorAttribute);
}

// getShader
// Loads a shader program by scouring the current document,
// looking for a script with the specified ID.
//
function getShaderCube(glCube, id) {
  var shaderScript = document.getElementById(id);
  
  // Didn't find an element with the specified ID; abort.
  
  if (!shaderScript) {
    return null;
  }
  
  // Walk through the source element's children, building the
  // shader source string.
  
  var theSource = "";
  var currentChild = shaderScript.firstChild;
  
  while(currentChild) {
    if (currentChild.nodeType == 3) {
      theSource += currentChild.textContent;
    }
    
    currentChild = currentChild.nextSibling;
  }
  
  // Now figure out what type of shader script we have,
  // based on its MIME type.
  
  var shader;
  
  if (shaderScript.type == "x-shader/x-fragment") 
  {
    shader = glCube.createShader(glCube.FRAGMENT_SHADER);
  } else if (shaderScript.type == "x-shader/x-vertex") {
    shader = glCube.createShader(glCube.VERTEX_SHADER);
  } else {
    return null;  // Unknown shader type
  }
  
  // Send the source to the shader object
  
  glCube.shaderSource(shader, theSource);
  
  // Compile the shader program
  
  glCube.compileShader(shader);
  
  // See if it compiled successfully
  
  if (!glCube.getShaderParameter(shader, glCube.COMPILE_STATUS)) {
    alert("An error occurred compiling the shaders: " + glCube.getShaderInfoLog(shader));
    return null;
  }
  
  return shader;
}

//
// Matrix utility functions
//

function loadIdentity() {
  mvMatrix = Matrix.I(4);
}

function multMatrix(m) {
  mvMatrix = mvMatrix.x(m);
}

function mvTranslate(v) {
  multMatrix(Matrix.Translation($V([v[0], v[1], v[2]])).ensure4x4());
}

function setMatrixUniforms() {
  var pUniform = glCube.getUniformLocation(shaderProgram, "uPMatrix");
  glCube.uniformMatrix4fv(pUniform, false, new Float32Array(perspectiveMatrix.flatten()));

  var mvUniform = glCube.getUniformLocation(shaderProgram, "uMVMatrix");
  glCube.uniformMatrix4fv(mvUniform, false, new Float32Array(mvMatrix.flatten()));
}

var mvMatrixStack = [];

function mvPushMatrix(m) {
  if (m) {
    mvMatrixStack.push(m.dup());
    mvMatrix = m.dup();
  } else {
    mvMatrixStack.push(mvMatrix.dup());
  }
}

function mvPopMatrix() {
  if (!mvMatrixStack.length) {
    throw("Can't pop from an empty matrix stack.");
  }
  
  mvMatrix = mvMatrixStack.pop();
  return mvMatrix;
}

function mvRotate(angle, v) {
  var inRadians = angle * Math.PI / 180.0;
  
  var m = Matrix.Rotation(inRadians, $V([v[0], v[1], v[2]])).ensure4x4();
  multMatrix(m);
}
