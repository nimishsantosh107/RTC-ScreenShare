
//SERVER
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

//------------------------------------------------------------------------------------------

//CLIENT
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