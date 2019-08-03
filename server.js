const express = require('express');
const http = require('http');
const https = require('https');
const bodyParser = require('body-parser')
const path = require('path');

const PORT = 80;
const IP = "192.168.1.4";
const privateKey  = fs.readFileSync('/rtc.key', 'utf8');
const certificate = fs.readFileSync('/rtc.csr', 'utf8');
const credentials = {key: privateKey, cert: certificate};

var app = express();
app.use(bodyParser.json());
var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

app.use('/',express.static(path.join(__dirname,"public")));

app.listen(PORT, IP, ()=>{console.log(`SERVER UP ON PORT: ${PORT}`);});