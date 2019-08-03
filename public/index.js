const vbideo = document.querySelector("#video");

mediaConfig = {};
navigator.mediaDevices.getDisplayMedia(mediaConfig).then(function(stream){
	window.stream = stream;
	video.srcObject = stream;
},function(err){console.log("GET_USR_MEDIA_ERR: ",err);});