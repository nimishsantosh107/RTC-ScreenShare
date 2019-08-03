const socket = io();
const signalBtn = document.querySelector("#signalBtn");
signalBtn.addEventListener('click', function () {
	socket.emit("sendSignal",peerid);
});

var peer = new Peer();
var peerid = null;
var connExt = null;

socket.on("connect", function () {console.log('CONNECTED TO SERVER');});

peer.on('open', function(id) {
  	console.log('PEER ID: ' + id);
  	peerid = id;
});

peer.on('connection', function(conn) {
	conn.on('open', function() {
	  	//RECV MESSAGE
		conn.on('data', function(data) {
		    console.log('RECEIVED:', data);
		});

		//GLOBALISE VAR TOP ACCESS OUTSIDE
		connExt = conn;
		//SEND MSG
	});
});

peer.on('call', function(call){
	call.answer()
	call.on('stream', function(stream) {
	  	video.srcObject = stream;
	});
});

//SIMPLE_PEER
/*
var simplePeerConfig = {
  initiator: false,
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

p.on("data", function(data){
  	console.log('DATA: ',data);
  	p.send("RECEIVED MESSAGE");
});
*/