const socket = io();
const callBtn = document.querySelector("#callBtn");
const connectBtn = document.querySelector("#connectBtn");
const getStreamBtn = document.querySelector("#getStreamBtn");
//ONLY TESTING
callBtn.addEventListener('click', function () {
	//call remote id
	call = peer.call(remoteid, displayStream);
	call = peer.call(remoteid, audioStream);
});
//STREAMS
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
//OTHER DATA
connectBtn.addEventListener('click',function () {
	conn = peer.connect(remoteid);
	conn.on('open', function() {
		//RECV MESSAGE
		conn.on('data', function(data) {
			console.log('RECEIVED:', data);
		});
		//SEND MSG
		//conn.send("PEER MESSAGE");
	});
});

var peer = new Peer();
var peerid = null;
var remoteid = null;
var conn = null;
var call = null;

socket.on("connect", function () {console.log('CONNECTED TO SERVER');});

socket.on("receivedSignal", function (data) {
	console.log('RECEIVED SIGNAL: ',data);
	remoteid = data;
});

peer.on('open', function(id) {
  	console.log('PEER ID: ' + id);
  	peerid = id;
});


//SIMPLE_PEER
/*
var simplePeerConfig = {
  initiator: true,
  channelConfig: {},
  channelName: '<random string>',
  config: { iceServers: [
  	{
	    urls: 'turn:192.158.29.39:3478?transport=udp',
	    username: '28224511:1379330808',
	    credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA='
	},
	{
	    urls: 'turn:192.158.29.39:3478?transport=tcp',
	    username: '28224511:1379330808',
	    credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA='
	},
  	{
        urls: "stun:numb.viagenie.ca",
        username: "nimishsantosh107@gmail.com",
        credential: "messi107"
    },
    {
        urls: "turn:numb.viagenie.ca",
        username: "nimishsantosh107@gmail.com",
        credential: "messi107"
    }
  	] },
  offerOptions: {},
  answerOptions: {},
  sdpTransform: function (sdp) { return sdp },
  stream: false,
  streams: [],
  trickle: true,
  allowHalfTrickle: false,
  objectMode: false
}


var p = new SimplePeer(simplePeerConfig); 
var signalData = null;

p.on("error", function (err){console.log('P_ON_ERROR: ',err);});

p.on("signal", function (data){
	if(signalData === null){
		signalData = data;
		console.log(signalData);
	}
});

p.on("connect", function(){
  	console.log('PEER CONNECTED');
  	p.send("PEER CONNECTED");
});
 
p.on("data", function(data){
  	console.log('DATA: ',data);
});
*/