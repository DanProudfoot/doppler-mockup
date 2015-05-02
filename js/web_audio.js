window.AudioContext = window.AudioContext || window.webkitAudioContext;

audioContext = new AudioContext();

// test to see how many hardware channels we can output to
// if it's 6 or larger, we can play a 5.1 audio stream!
if (audioContext.destination.maxChannelCount >= 6) {
	audioContext.destination.channelCount = 6;
}
// otherwise, let's down-mix to 2.0
else {
	audioContext.destination.channelCount = 2;
}
audioContext.destination.channelCountMode = "explicit";
audioContext.destination.channelInterpretation = "discrete";

console.log(audioContext.destination.channelCount);

var sound;

/**
 * Example 1: Load a sound
 * @param {String} src Url of the sound to be loaded.
 */

function loadSound(url) {
	var request = new XMLHttpRequest();
	request.open('GET', url, true);
	request.responseType = 'arraybuffer';

	request.onload = function() {
		// request.response is encoded... so decode it now
		context.decodeAudioData(request.response, function(buffer) {
			sound = buffer;
		}, function(err) {
			throw new Error(err);
		});
	}

	request.send();
}
loadSound('music_storage/Steven Wilson/Hand Cannot Erase/hand.m4a');

/**
 * Example 2: Play a sound
 * @param {Object} buffer AudioBuffer object - a loaded sound.
 */

function playSound(buffer) {
  var source = context.createBufferSource();
  source.buffer = buffer;
  source.connect(context.destination);
  source.start(0);
}
playSound(sound);