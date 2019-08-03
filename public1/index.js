const socket = io();
const signalBtn = document.querySelector("#signalBtn");
const connectBtn = document.querySelector("#connectBtn");
const callBtn = document.querySelector("#callBtn");
//ONLY TESTING
signalBtn.addEventListener('click', function () {
	socket.emit("sendSignal",peerid);
});
//STREAMS
callBtn.addEventListener('click', async function(){
	mediaConfig = {};
	await navigator.mediaDevices.getDisplayMedia(mediaConfig).then(function(stream){
		window.stream = stream;
	},function(err){console.log("GET_USR_MEDIA_ERR: ",err);});
	//call remote id
	call = peer.call(remoteid, stream);
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
		conn.send("PEER MESSAGE");
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