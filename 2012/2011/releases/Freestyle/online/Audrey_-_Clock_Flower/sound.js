
var numLevels = 16;
var eqLevels = [];
var eqAvgLevels = [];
var eqNormLevels = [];

for (var i=0;i<numLevels;i++) {
	eqAvgLevels[i] = eqNormLevels[i] = 0;
}

var music;

soundData = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];

function prepareSoundData() {

	for (var i=0;i<16;i++) {
		soundData[i] = data;
	}
}

function analyzeSound() {
	var maxSearch = 500;

	var time = (music.currentTime * 1000)>>0;
	while (maxSearch-- && !soundData[time]) {
		time--;
	}
	if (!soundData[time])
		return;

	eqAvgLevels = eqNormLevels = soundData[time];

	var peakMax = 0;
	var peakSum = 0;
	for (var i=0;i<eqNormLevels.length;i++) {
		if (eqNormLevels[i] > peakMax) peakMax = eqNormLevels[i];
		peakSum += Math.sqrt(eqNormLevels[i]);
	}
	peakSum += peakMax*peakMax;
	peakSum = Math.sqrt(peakSum / 17 * 0.5);
	music.peakData.left = music.peakData.right = peakSum;

	updateTitle();
}


function updateTitle() {
	for (var i=0,l=titleLetters.length;i<l;i++) {
		var $letter = titleLetters[i];
		var ln = (numLevels / l * i)>>0;

		level = Math.pow(eqNormLevels[ln], 1.5);

		var sizeAdd = 8 * level * scale;
		$letter.css({
			fontSize : 20 * scale + sizeAdd + "px",
			marginLeft : -sizeAdd*0.5 + "px",
			marginTop : -sizeAdd*0.3 + "px"
		});
	}
}
