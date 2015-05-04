$(document).ready(function(){

var playButton = $('.action-play');
var pauseButton = $('.action-pause');
var rewindButton = $('.action-rwd');
var forwardButton = $('.action-fwd');
var seekMain = $('.seek-holder');

var path = "music_storage/sw/hand/"
var audioSource = ["hand.m4a","3.m4a","9.m4a","routine.m4a"];
var playlistPos = 2; // Position in the current playlist
var minutes = 0; //Current song position minutes figure
var seconds = 0; // Current song position seconds figure
var duration; // Set up var for duration of current song
var timer; // Setup up for actually tracking the duration of the song 
var playbackPos; // Set up absolute position of playback

var music = new Howl({
	src: [path + audioSource[playlistPos]],
});

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
playButton.click(function(){
	id = music.play();
	playButton.hide();
	pauseButton.show();

});
pauseButton.click(function(){
	music.pause();
	pauseButton.hide();
	playButton.show();
});

// The actual stuff

var loadPercentage = setInterval(function(){
	console.log(Math.floor(loadPerc*100) + "%");
	$('.load_progress').css("width", Math.floor(loadPerc*100) + "%")
}, 100);

music.on('play', function(){
	timer = setInterval(function(){
		playbackPos = Math.floor(music.seek());
		minutes = Math.floor(playbackPos / 60);
		seconds = playbackPos % 60;
		if (seconds < 10){
			seconds = "0" + seconds;
		}
		$(".now_playing-elapsed").text(minutes + ":" + seconds);
		seekMain.slider("value", playbackPos);
	}, 200);
})
music.on('pause',function(){
	clearInterval(timer);
});

music.on('load', function(){
	duration = music.duration();
	seekMain.prop({'max':duration});
	$('.now_playing-total').text(convertToHumanTime(duration));
	clearInterval(loadPercentage);
	seekMain.slider({
		max: duration,
		min: 0,
		step:1,
		value:0
	});
});

function convertToHumanTime(time){
	Cminutes = Math.floor(time / 60);
	Cseconds = Math.floor(time % 60);
	if (Cseconds < 10){
			Cseconds = "0" + Cseconds;
		}
	return(Cminutes + ":" + Cseconds);
}

seekMain.on('slide', function(event, ui){
	music.seek(ui.value);
});


});


