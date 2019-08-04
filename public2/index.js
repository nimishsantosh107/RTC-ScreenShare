const socket = io();
const signalBtn = document.querySelector("#signalBtn");
//SEND SIGNAL TO SERVER
signalBtn.addEventListener('click', function () {
	socket.emit("sendSignal",peerid);
});

var peer = new Peer();
var peerid = null;
var connExt = null;
var displayId = null;
var audioId = null;

socket.on("connect", function () {console.log('CONNECTED TO SERVER');});

//INIT LOCAL PEER
peer.on('open', function(id) {
  	console.log('PEER ID: ' + id);
  	peerid = id;
});

//ACCEPT CONNECTION FROM SERVER
peer.on('connection', function(conn) {
    conn.on('open', function() {
	  	//RECV MESSAGE
        conn.on('data', function(data) {
            data = JSON.parse(data);
            console.log('RECEIVED:', data);
            displayId = data.display;
            audioId = data.audio;

		});
		//GLOBALISE VAR TOP ACCESS OUTSIDE
		connExt = conn;
		//SEND MSG
	});
});

//ACCEPT CALL FROM SERVER
peer.on('call', function(call){
    call.answer()
  	call.on('stream', function(stream) {
  	  	if(stream.id === displayId)
            video.srcObject = stream;
        else if(stream.id === audioId)
            audio.srcObject = stream;
    });
});