 // Ball animation
var radBall  = 15;
var curXBall = 8;
var curYBall = 100;
var spdXBall = 7;
var spdYBall = 7;
var colors = new Array("#004000","#00BFFF","#6B9BAA","#FFBB00","#E514AD","#14E579","#783FBA","#3387D6","#33D67C","#FFF249","#F93325","#82BA3F");
var colors2 = new Array("#98E2A3","#9E3A79","#F29513","#0EF2A2");
var vCtxBall;
var myCanvasBall;


function doDrawBall2()
{
	//var myCanvasBall = document.getElementById('canvasBall1');
	var radBallModif = Math.floor(Math.random()*(radBall-5));
	myCanvasBall = document.getElementById('canvasBall2');
	var vWidthBall   = myCanvasBall.width;
	var vHeightBall  = myCanvasBall.height;
	// Set the canvas background and border			
	myCanvasBall.style.background = 'transparent';
	myCanvasBall.style.border     = '1px solid '+colors[Math.floor(Math.random()*colors.length)] ;
	vCtxBall  = myCanvasBall.getContext('2d');
	// Clear the canvas
	vCtxBall.clearRect(0, 0, myCanvasBall.width, myCanvasBall.height);
	// Draw a ball (composed of some circles) at the current coordinate
	vCtxBall.fillStyle   = colors2[Math.floor(Math.random()*colors.length)];
	vCtxBall.beginPath();
	vCtxBall.arc(curXBall, curYBall, radBallModif, 2, Math.PI * 2, true);
	vCtxBall.fill();
	vCtxBall.fillStyle   = colors[Math.floor(Math.random()*colors.length)];
	vCtxBall.beginPath();
	vCtxBall.arc(curXBall, curYBall, radBallModif * 0.75, 0, Math.PI * 2, true);
	vCtxBall.fill();
	vCtxBall.fillStyle   = colors[Math.floor(Math.random()*colors.length)];
	vCtxBall.beginPath();
	vCtxBall.arc(curXBall, curYBall, radBallModif * 0.5, 0, Math.PI * 2, true);
	vCtxBall.fill();
	vCtxBall.fillStyle   = colors[Math.floor(Math.random()*colors.length)];
	vCtxBall.beginPath();
	vCtxBall.arc(curXBall, curYBall, radBallModif * 0.25, 0, Math.PI * 2, true);
	vCtxBall.fill();
	// Flag to indicate if a sound needs to be played
	var playSoundBall = false;
	// Update the coordinate
	curXBall += spdXBall;
	if(curXBall <= 0) {
		curXBall      = radBallModif;
		spdXBall      = -spdXBall;
		playSoundBall = true;
	}
	if(curXBall >= vWidthBall - radBallModif) {
		curXBall      = vWidthBall - radBallModif;
		spdXBall      = -spdXBall;
		playSoundBall = true;
	}
	curYBall += spdYBall;
	if(curYBall <= 0) {
		curYBall      = radBallModif;
		spdYBall      = -spdYBall;
		playSoundBall = true;
	}
	if(curYBall >= vHeightBall - radBallModif) {
		curYBall      = vHeightBall - radBallModif;
		spdYBall      = -spdYBall;
		playSoundBall = true;
	}
	// Play the sound (if needed)
	if(playSoundBall) playAudioBall();
	setTimeout(doDrawBall2, 150);
}
function doDrawBall()
{
			//var myCanvasBall = document.getElementById('canvasBall1');
			var radBallModif = Math.floor(Math.random()*radBall);
			myCanvasBall = document.getElementById('canvasBall1');
			var vWidthBall   = myCanvasBall.width;
			var vHeightBall  = myCanvasBall.height;
			// Set the canvas background and border			
			myCanvasBall.style.background = 'transparent';
			myCanvasBall.style.border     = '1px solid '+colors[Math.floor(Math.random()*colors.length)] ;
			vCtxBall  = myCanvasBall.getContext('2d');
			// Clear the canvas
			vCtxBall.clearRect(0, 0, myCanvasBall.width, myCanvasBall.height);
			// Draw a ball (composed of some circles) at the current coordinate
			vCtxBall.fillStyle   = colors[Math.floor(Math.random()*colors.length)];
			vCtxBall.beginPath();
			vCtxBall.arc(curXBall, curYBall, radBallModif, 0, Math.PI * 2, true);
			vCtxBall.fill();
			vCtxBall.fillStyle   = colors[Math.floor(Math.random()*colors.length)];
			vCtxBall.beginPath();
			vCtxBall.arc(curXBall, curYBall, radBallModif * 0.75, 0, Math.PI * 2, true);
			vCtxBall.fill();
			vCtxBall.fillStyle   = colors[Math.floor(Math.random()*colors.length)];
			vCtxBall.beginPath();
			vCtxBall.arc(curXBall, curYBall, radBallModif * 0.5, 0, Math.PI * 2, true);
			vCtxBall.fill();
			vCtxBall.fillStyle   = colors[Math.floor(Math.random()*colors.length)];
			vCtxBall.beginPath();
			vCtxBall.arc(curXBall, curYBall, radBallModif * 0.25, 0, Math.PI * 2, true);
			vCtxBall.fill();
			// Flag to indicate if a sound needs to be played
			var playSoundBall = false;
			// Update the coordinate
			curXBall += spdXBall;
			if(curXBall <= 0) {
				curXBall      = radBallModif;
				spdXBall      = -spdXBall;
				playSoundBall = true;
			}
			if(curXBall >= vWidthBall - radBallModif) {
				curXBall      = vWidthBall - radBallModif;
				spdXBall      = -spdXBall;
				playSoundBall = true;
			}
			curYBall += spdYBall;
			if(curYBall <= 0) {
				curYBall      = radBallModif;
				spdYBall      = -spdYBall;
				playSoundBall = true;
			}
			if(curYBall >= vHeightBall - radBallModif) {
				curYBall      = vHeightBall - radBallModif;
				spdYBall      = -spdYBall;
				playSoundBall = true;
			}
			// Play the sound (if needed)
			if(playSoundBall) playAudioBall();
			// Set timeout for the next frame
			setTimeout(doDrawBall, 50);
		
}

	
	function playAudioBall()
	{
		// The browser does not support the 'audio' tag, use the 'embed' tag
	
			document.getElementById('sonwavball').innerHTML = 
				"<embed src='Bounce.wav' hidden='true' autostart='true' loop='false'>";
 
	}