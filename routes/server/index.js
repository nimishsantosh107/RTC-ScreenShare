const socket = io();
const callBtn = document.querySelector("#callBtn");
const connectBtn = document.querySelector("#connectBtn");
const getStreamBtn = document.querySelector("#getStreamBtn");

//FIRST CONNECT TO TRANSFER DATA
connectBtn.addEventListener('click',function () {
	conn = peer.connect(remoteid);
	conn.on('open', function() {
		//RECV MESSAGE
		conn.on('data', function(data) {
			console.log('RECEIVED:', data);
		});
		//SEND MSG
	});
});
//SEND AUDIO/VIDEO STREAM IDS
getStreamBtn.addEventListener('click', async function(){
	var displayConfig = {}
	var mediaConfig = {
		audio: true,
	}
	await navigator.mediaDevices.getDisplayMedia(displayConfig).then(function(stream){
		window.displayStream = stream;
	},function(err){console.log("GET_DISPLAY_MEDIA_ERR: ",err);});

	await navigator.mediaDevices.getUserMedia(mediaConfig).then(function(stream){
		window.audioStream = stream;
	},function(err){console.log("GET_USER_MEDIA_ERR: ",err);});

	var streamIds = {
		display: displayStream.id,
		audio: audioStream.id
	}
	
	conn.send(JSON.stringify(streamIds));
});
//CALL AND SEND BOTH STREAMS
callBtn.addEventListener('click', function () {
	//call remote id
	call = peer.call(remoteid, displayStream);
	call = peer.call(remoteid, audioStream);
});



var peer = new Peer();
var peerid = null;
var remoteid = null;
var conn = null;
var call = null;

socket.on("connect", function () {console.log('CONNECTED TO SERVER');});

//ID OF REMOTE PEER
socket.on("receivedSignal", function (data) {
	console.log('RECEIVED SIGNAL: ',data);
	remoteid = data;
});

//INITIALISE LOCAL PEER
peer.on('open', function(id) {
  	console.log('PEER ID: ' + id);
  	peerid = id;
});