mediaConfig = {audio: true, video: true};
navigator.mediaDevices.getUserMedia(mediaConfig).then(function(stream){
	window.stream = stream;
},function(err){console.log("GET_USR_MEDIA_ERR: ",err);});