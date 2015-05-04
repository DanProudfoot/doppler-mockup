$(document).ready(function(){

	window.AudioContext = window.AudioContext || window.webkitAudioContext;

	context = new AudioContext();

	// test to see how many hardware channels we can output to
	// if it's 6 or larger, we can play a 5.1 audio stream!
	if (context.destination.maxChannelCount >= 6) {
		context.destination.channelCount = 6;
	}
	// otherwise, let's down-mix to 2.0
	else {
		context.destination.channelCount = 2;
	}
	context.destination.channelCountMode = "explicit";
	context.destination.channelInterpretation = "discrete";

	console.log(context.destination.channelCount);

	var playButton = $('.action-play');
	var pauseButton = $('.action-pause');
	var rewindButton = $('.action-rwd');
	var forwardButton = $('.action-fwd');
	var path = "music_storage/sw/hand/"
	var audioSource = ["hand.m4a","3.m4a"];
	var currentSong; // Create the Sound 
	var nowPlaying = 1;


	function loadSong(){

		var getSound = new XMLHttpRequest(); // Load the Sound with XMLHttpRequest
		
		getSound.addEventListener("progress", updateProgress, false);
		getSound.addEventListener("load", transferComplete, false);
		getSound.addEventListener("error", transferFailed, false);
		getSound.addEventListener("abort", transferCanceled, false);

		getSound.open("GET", path + audioSource[nowPlaying], true); // Path to Audio File
		getSound.responseType = "arraybuffer"; // Read as Binary Data

		// progress on transfers from the server to the client (downloads)
		function updateProgress (oEvent) {
			if (oEvent.lengthComputable) {
				var percentComplete = oEvent.loaded / oEvent.total;
				console.log(percentComplete);
			} else {
				// Unable to compute progress information since the total size is unknown
			}
		}
		getSound.onload = function() {
			context.decodeAudioData(getSound.response, function(buffer){
				currentSong = buffer; // Decode the Audio Data and Store it in a Variable
			});
		}
		getSound.send(); // Send the Request and Load the File
		
		function transferComplete(evt) {
			console.log("The transfer is complete.");
		}

		function transferFailed(evt) {
			console.log("An error occurred while transferring the file.");
		}

		function transferCanceled(evt) {
			console.log("The transfer has been canceled by the user.");
		}
	}

	loadSong();

	function songSelector(){
		
	}


	playButton.on('click touchend', function(){
		var playSound = context.createBufferSource(); // Declare a New Sound
		playSound.buffer = currentSong; // Attatch our Audio Data as it's Buffer
		playSound.connect(context.destination);  // Link the Sound to the Output
		playSound.start(0); // Play the Sound Immediately
		console.log("EH?");
	});

	forwardButton.on('click touchend', function(){

		if (nowPlaying) {};

	})

});

//Stupid Fluff
// var playlist = [{
// 	item0: [{
// 		path: "str",
// 		file: "str",
// 		id: 4
// 	}],
// 	item1: [{
// 		path: "gre",
// 		file: "gre",
// 		id: 36554676
// 	}],
// }];


