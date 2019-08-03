const socket = io();

socket.on("connect",function () {console.log('CONNECTED TO SERVER');});