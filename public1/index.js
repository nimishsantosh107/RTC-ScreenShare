const socket = io();
const shareBtn = document.querySelector("#shareBtn");
const signalBtn = document.querySelector("#signalBtn");

shareBtn.addEventListener('click', function(){
	mediaConfig = {};
	navigator.mediaDevices.getDisplayMedia(mediaConfig).then(function(stream){
		window.stream = stream;
		// video.srcObject = stream;
	},function(err){console.log("GET_USR_MEDIA_ERR: ",err);});
});

signalBtn.addEventListener('click', function () {
	socket.emit("sendSignal",peerid);
});

socket.on("connect", function () {console.log('CONNECTED TO SERVER');});

socket.on("receivedSignal", function (data) {
	console.log('RECEIVED SIGNAL: ',data);

	conn = peer.connect(data);

	conn.on('open', function() {
		// Receive messages
		conn.on('data', function(data) {
			console.log('RECEIVED:', data);
		});

		//SEND MSG
		conn.send("HIII");
	});
});

var peer = new Peer();
var peerid = null;

peer.on('open', function(id) {
  console.log('PEER ID: ' + id);
  peerid = id;
});

peer.on('connection', function(conn) {
	console.log(conn);

	conn.on('open', function() {
	  	// Receive messages
		conn.on('data', function(data) {
		    console.log('RECEIVED:', data);
		});

		//SEND MSG
	});
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