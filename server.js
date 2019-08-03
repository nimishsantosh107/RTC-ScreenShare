const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const https = require('https');
const fs = require('fs');
const bodyParser = require('body-parser')
const path = require('path');

const PORT = 2000;
const IP = "192.168.1.4";
const privateKey  = fs.readFileSync('./SSL_KEY/rtc.key', 'utf8');
const certificate = fs.readFileSync('./SSL_KEY/rtc.crt', 'utf8');
const credentials = {key: privateKey, cert: certificate};

var app = express();
app.use(bodyParser.json());
var httpsServer = https.createServer(credentials, app);
var io = socketIO(httpsServer);

app.use('/1',express.static(path.join(__dirname,"public1")));
app.use('/2',express.static(path.join(__dirname,"public2")));

io.on("connection",(socket)=>{
	console.log("CONNECTED: ",socket.id);

	

	socket.on("disconnect",()=>{console.log("DISCONNECTED: ",socket.id);});
});

httpsServer.listen(PORT, IP, ()=>{console.log(`HTTPS SERVER UP ON PORT: ${PORT}`);});