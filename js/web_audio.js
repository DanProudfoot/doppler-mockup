$(document).ready(function(){

var playButton = $('.action-play');
var pauseButton = $('.action-pause');
var rewindButton = $('.action-rwd');
var forwardButton = $('.action-fwd');

var path = "music_storage/sw/hand/"
var audioSource = ["hand.m4a","3.m4a"];
var playlistPos = 1; // Position in the current playlist
var minutes = 0; //Current song position minutes figure
var seconds = 0; // Current song position seconds figure
var duration; // Set up var for duration of current song
var timer; // Setup up for actually tracking the duration of the song 

var music = new Howl({
	src: [path + audioSource[playlistPos]]
})


pauseButton.hide();
playButton.click(function(){
	music.play();
	playButton.hide();
	pauseButton.show();

});
pauseButton.click(function(){
	music.pause();
	pauseButton.hide();
	playButton.show();
});


music.on('play', function(){
	timer = setInterval(function(){
		var playbackPos = Math.floor(music.pos());
		minutes = Math.floor(playbackPos / 60);
		seconds = playbackPos % 60;
		if (seconds < 10){
			seconds = "0" + seconds;
		}
		$(".now_playing-elapsed").text(minutes + ":" + seconds);
	}, 200);
})
music.on('pause',function(){
	clearInterval(timer);
});

music.on('load', function(){
	duration = music._duration;
	$('.now_playing-total').text(convertToHumanTime(duration));

});

function convertToHumanTime(time){
	Cminutes = Math.floor(time / 60);
	Cseconds = Math.floor(time % 60);
	return(Cminutes + ":" + Cseconds);
}

function skipTrack(direction){

}


});


