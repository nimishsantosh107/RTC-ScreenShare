const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const IP4 = "192.168.1.100";
const privateKey  = fs.readFileSync('./SSL_KEY/rtc.key', 'utf8');
const certificate = fs.readFileSync('./SSL_KEY/rtc.crt', 'utf8');
const credentials = {key: privateKey, cert: certificate};

var app = express();
var httpsServer = https.createServer(credentials, app);
var io = socketIO(httpsServer);

app.use('/',express.static(path.join(__dirname,"routes/root")));
app.use('/server',express.static(path.join(__dirname,"routes/server")));
app.use('/client',express.static(path.join(__dirname,"routes/client")));

io.on("connection",(socket)=>{
	console.log("+ CONNECTED: ",socket.id);

	socket.on("sendSignal",(data)=>{socket.broadcast.emit("receivedSignal",data);});

	socket.on("disconnect",()=>{console.log("- DISCONNECTED: ",socket.id);});
});

httpsServer.listen(PORT, IP4, ()=>{console.log(`HTTPS SERVER UP ON PORT: ${PORT}`);});