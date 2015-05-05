$(document).ready(function(){

var playButton = $('.action-play');
var pauseButton = $('.action-pause');
var rewindButton = $('.action-rwd');
var forwardButton = $('.action-fwd');
var seekMain = $('.seek-holder');

var path = "music_storage/sw/hand/"
var audioSource = ["hand.m4a","3.m4a","9.m4a","routine.m4a"];
//var playlistPos = 2; // Position in the current playlist


// test to see how many hardware channels we can output to
// if it's 6 or larger, we can play a 5.1 audio stream!
if (Howler.ctx.destination.maxChannelCount >= 6) {
	Howler.ctx.destination.channelCount = 6;
}
// otherwise, let's down-mix to 2.0
else {
	Howler.ctx.destination.channelCount = 2;
}
Howler.ctx.destination.channelCountMode = "explicit";
Howler.ctx.destination.channelInterpretation = "discrete";

//console.log(Howler.ctx.destination.maxChannelCount); // Log available output channels. Firefox just doesn't heed this.

pauseButton.hide();

// var music0 = new Howl({
// 	src: [path + audioSource[3]],
// 	preload: true,
// });

// var music1 = new Howl({
// 	src: [path + audioSource[0]],
// 	preload: false,
// });


// The actual stuff


var Song = function(playlistIndex){
	var setSong = new Howl({
		src: [path + audioSource[playlistIndex]],
		preload:true
	})
	var stopSong = function(){
		setSong.stop();
	}
	return {
		setSong: setSong,
		stopSong: stopSong
	}
}

var currentSong = Song(2).setSong;

$('header').click(function(){
	var currentSong = Song(2).stopSong;
	console.log("HEader");
})


var loadPercentage = setInterval(function(){
	console.log(Math.floor(loadPerc*100) + "%");
	$('.load_progress').css("width", Math.floor(loadPerc*100) + "%")
}, 100);

function convertToHumanTime(time){
	Cminutes = Math.floor(time / 60);
	Cseconds = Math.floor(time % 60);
	if (Cseconds < 10){
			Cseconds = "0" + Cseconds;
		}
	return(Cminutes + ":" + Cseconds);
}

currentSong.on('load', function(){

	var minutes = 0; //Current song position minutes figure
	var seconds = 0; // Current song position seconds figure
	var duration; // Set up var for duration of current song
	var timer; // Setup up for actually tracking the duration of the song 
	var playbackPos; // Set up absolute position of playback

	playButton.click(function(){
		id = currentSong.play();
		playButton.hide();
		pauseButton.show();

	});
	pauseButton.click(function(){
		currentSong.pause();
		pauseButton.hide();
		playButton.show();
	});
	rewindButton.click(function(){

	});
	forwardButton.click(function(){

	});

	duration = currentSong.duration();

	$('.now_playing-total').text(convertToHumanTime(duration));
	
	clearInterval(loadPercentage);
	
	seekMain.slider({
		max: duration,
		min: 0,
		step:1,
		value:0
	});

	seekMain.on('slide', function(event, ui){
		currentSong.seek(ui.value);
	});

	currentSong.on('play', function(){
		timer = setInterval(function(){
			playbackPos = Math.floor(currentSong.seek());
			minutes = Math.floor(playbackPos / 60);
			seconds = playbackPos % 60;
			if (seconds < 10){
				seconds = "0" + seconds;
			}
			$(".now_playing-elapsed").text(minutes + ":" + seconds);
			seekMain.slider("value", playbackPos);
		}, 200);
	});

});






});


