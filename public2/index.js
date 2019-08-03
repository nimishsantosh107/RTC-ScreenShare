const socket = io();
const signalBtn = document.querySelector("#signalBtn");

var simplePeerConfig = {
  initiator: false,
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
	p.signal(data);
});

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

signalBtn.addEventListener('click', function () {
	socket.emit("sendSignal",JSON.stringify(signalData));
});