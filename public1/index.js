const socket = io();
const shareBtn = document.querySelector("#shareBtn");

shareBtn.addEventListener('click',function(){
	mediaConfig = {};
	navigator.mediaDevices.getDisplayMedia(mediaConfig).then(function(stream){
		window.stream = stream;
		// video.srcObject = stream;
	},function(err){console.log("GET_USR_MEDIA_ERR: ",err);});
});

socket.on("connect",function () {console.log('CONNECTED TO SERVER');});