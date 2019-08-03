const socket = io();
const shareBtn = document.querySelector("#shareBtn");
const signalBtn = document.querySelector("#signalBtn");

var simplePeerConfig = {
  initiator: true,
  channelConfig: {},
  channelName: '<random string>',
  config: { iceServers: [
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

socket.on("connect", function () {console.log('CONNECTED TO SERVER');});

socket.on("receivedSignal", function (data) {
	console.log('RECEIVED SIGNAL: ',data);
	//NOT SETING P.SIGNAL
});

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

signalBtn.addEventListener('click', function () {
	socket.emit("sendSignal",JSON.stringify(signalData));
});

shareBtn.addEventListener('click', function(){
	mediaConfig = {};
	navigator.mediaDevices.getDisplayMedia(mediaConfig).then(function(stream){
		window.stream = stream;
		// video.srcObject = stream;
	},function(err){console.log("GET_USR_MEDIA_ERR: ",err);});
});